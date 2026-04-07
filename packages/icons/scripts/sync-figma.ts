import * as fs from 'fs';
import * as path from 'path';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const PACKAGE_ROOT = path.join(__dirname, '..');
const MANIFEST_FILE = path.join(PACKAGE_ROOT, 'src/svg-manifest.json');
const DEFAULT_TIMEOUT_MS = 30000;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EXPORT_NODE_TYPES = new Set(['COMPONENT', 'COMPONENT_SET', 'FRAME', 'VECTOR']);

type Command = 'discover' | 'sync' | 'check';
type IconStatus = 'approved' | 'needs_review' | 'deprecated' | 'ignored';

interface FigmaConfig {
  fileKey: string;
  exportFormat: 'svg';
}

interface ManifestDefaults {
  outputDir: string;
  nameSource: 'manifest-slug';
}

interface IconManifestEntry {
  nodeId: string;
  figmaName: string;
  slug?: string;
  suggestedSlug?: string;
  category?: string;
  status: IconStatus;
  aliases?: string[];
  notes?: string;
}

interface IconManifest {
  version: number;
  figma: FigmaConfig;
  defaults: ManifestDefaults;
  categoryMap?: Record<string, string>;
  icons: IconManifestEntry[];
}

interface FigmaFileResponse {
  document: FigmaNode;
}

interface FigmaImagesResponse {
  err?: string;
  images: Record<string, string>;
}

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

interface DiscoveredIcon {
  nodeId: string;
  figmaName: string;
  type: string;
  path: string[];
  category?: string;
  suggestedSlug: string;
}

interface ParsedArgs {
  command: Command;
  write?: boolean;
}

function parseArgs(argv: string[]): ParsedArgs {
  const [commandArg, ...rest] = argv;
  const command = (commandArg ?? 'discover') as Command;

  if (!['discover', 'sync', 'check'].includes(command)) {
    throw new Error(`Unsupported command: ${commandArg}`);
  }

  return {
    command,
    write: rest.includes('--write'),
  };
}

function readManifest(): IconManifest {
  const raw = fs.readFileSync(MANIFEST_FILE, 'utf-8');
  return JSON.parse(raw) as IconManifest;
}

function writeManifest(manifest: IconManifest): void {
  fs.writeFileSync(MANIFEST_FILE, `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');
}

function getFigmaToken(): string {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    throw new Error('Missing FIGMA_TOKEN environment variable');
  }
  return token;
}

function getFileKey(manifest: IconManifest): string {
  const fileKey = process.env.FIGMA_FILE_KEY || manifest.figma.fileKey;
  if (!fileKey) {
    throw new Error(
      'Missing Figma file key. Set packages/icons/src/svg-manifest.json figma.fileKey or FIGMA_FILE_KEY'
    );
  }
  return fileKey;
}

async function figmaGet<T>(pathname: string): Promise<T> {
  const token = getFigmaToken();
  const response = await fetch(`${FIGMA_API_BASE}${pathname}`, {
    headers: {
      'X-Figma-Token': token,
    },
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Figma API request failed (${response.status}): ${text}`);
  }

  return (await response.json()) as T;
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_/]+/g, '-')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const CHINESE_NAME_MAP: Record<string, string> = {};

function suggestSlug(figmaName: string): string {
  const mapped = CHINESE_NAME_MAP[figmaName];
  if (mapped) {
    return mapped;
  }

  const ascii = slugify(figmaName);
  if (ascii) {
    return ascii;
  }

  return 'needs-slug';
}

function validateManifest(manifest: IconManifest): void {
  if (manifest.version !== 1) {
    throw new Error(`Unsupported manifest version: ${manifest.version}`);
  }

  const nodeIds = new Set<string>();
  const slugs = new Map<string, string>();

  for (const icon of manifest.icons) {
    if (!icon.nodeId) {
      throw new Error('Manifest entry is missing nodeId');
    }

    if (nodeIds.has(icon.nodeId)) {
      throw new Error(`Duplicate nodeId found in manifest: ${icon.nodeId}`);
    }
    nodeIds.add(icon.nodeId);

    if (icon.status === 'approved') {
      if (!icon.slug) {
        throw new Error(`Approved icon ${icon.nodeId} is missing slug`);
      }
      if (!icon.category) {
        throw new Error(`Approved icon ${icon.nodeId} (${icon.slug}) is missing category`);
      }
      if (!SLUG_PATTERN.test(icon.slug)) {
        throw new Error(`Invalid slug "${icon.slug}" for node ${icon.nodeId}`);
      }

      const existing = slugs.get(icon.slug);
      if (existing) {
        throw new Error(`Duplicate slug "${icon.slug}" for node ${icon.nodeId} and ${existing}`);
      }
      slugs.set(icon.slug, icon.nodeId);
    }
  }
}

function walkFigmaTree(
  node: FigmaNode,
  parents: FigmaNode[],
  categoryMap: Record<string, string>
): DiscoveredIcon[] {
  const currentPath = [...parents.map((parent) => parent.name), node.name];
  const categorySource = parents.find((parent) => categoryMap[parent.name])?.name ?? node.name;
  const category = categoryMap[categorySource];
  const children = node.children ?? [];
  const discovered: DiscoveredIcon[] = [];

  if (EXPORT_NODE_TYPES.has(node.type) && category && children.length > 0) {
    const hasDrawableChild = children.some(
      (child) => EXPORT_NODE_TYPES.has(child.type) || (child.children?.length ?? 0) > 0
    );
    if (hasDrawableChild) {
      discovered.push({
        nodeId: node.id,
        figmaName: node.name,
        type: node.type,
        path: currentPath,
        category,
        suggestedSlug: suggestSlug(node.name),
      });
    }
  }

  for (const child of children) {
    discovered.push(...walkFigmaTree(child, [...parents, node], categoryMap));
  }

  return discovered;
}

async function discoverIcons(manifest: IconManifest): Promise<DiscoveredIcon[]> {
  const fileKey = getFileKey(manifest);
  const response = await figmaGet<FigmaFileResponse>(`/files/${fileKey}`);
  return walkFigmaTree(response.document, [], manifest.categoryMap ?? {});
}

function mergeDiscoveredIcons(manifest: IconManifest, discovered: DiscoveredIcon[]): IconManifest {
  const existingByNodeId = new Map(manifest.icons.map((icon) => [icon.nodeId, icon]));
  const nextIcons = [...manifest.icons];

  for (const icon of discovered) {
    const existing = existingByNodeId.get(icon.nodeId);
    if (existing) {
      existing.figmaName = icon.figmaName;
      existing.suggestedSlug = icon.suggestedSlug;
      if (!existing.category && icon.category) {
        existing.category = icon.category;
      }
      continue;
    }

    nextIcons.push({
      nodeId: icon.nodeId,
      figmaName: icon.figmaName,
      suggestedSlug: icon.suggestedSlug,
      category: icon.category,
      status: 'needs_review',
    });
  }

  nextIcons.sort((a, b) => {
    const categoryA = a.category ?? 'zzz';
    const categoryB = b.category ?? 'zzz';
    if (categoryA !== categoryB) {
      return categoryA.localeCompare(categoryB);
    }
    return a.figmaName.localeCompare(b.figmaName);
  });

  return {
    ...manifest,
    icons: nextIcons,
  };
}

function printDiscoveredSummary(manifest: IconManifest, discovered: DiscoveredIcon[]): void {
  const existingIds = new Set(manifest.icons.map((icon) => icon.nodeId));
  const added = discovered.filter((icon) => !existingIds.has(icon.nodeId));

  console.log(`Discovered ${discovered.length} candidate icon nodes`);
  if (added.length === 0) {
    console.log('No new icon nodes found');
    return;
  }

  console.log(`Found ${added.length} new candidate icon(s):`);
  for (const icon of added.slice(0, 30)) {
    console.log(
      `- [${icon.category ?? 'unmapped'}] ${icon.figmaName} (${icon.nodeId}) -> ${
        icon.suggestedSlug
      }`
    );
  }
  if (added.length > 30) {
    console.log(`...and ${added.length - 30} more`);
  }
}

async function getExportUrls(fileKey: string, nodeIds: string[]): Promise<Record<string, string>> {
  const params = new URLSearchParams({
    ids: nodeIds.join(','),
    format: 'svg',
  });
  const response = await figmaGet<FigmaImagesResponse>(`/images/${fileKey}?${params.toString()}`);

  if (response.err) {
    throw new Error(`Figma export failed: ${response.err}`);
  }

  return response.images;
}

async function downloadText(url: string): Promise<string> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Failed to download SVG (${response.status}) from ${url}`);
  }

  return response.text();
}

function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

async function syncApprovedIcons(manifest: IconManifest): Promise<void> {
  validateManifest(manifest);

  const fileKey = getFileKey(manifest);
  const outputRoot = path.join(PACKAGE_ROOT, manifest.defaults.outputDir);
  const approvedIcons = manifest.icons.filter((icon) => icon.status === 'approved');

  if (approvedIcons.length === 0) {
    console.log('No approved icons to sync');
    return;
  }

  const exportUrls = await getExportUrls(
    fileKey,
    approvedIcons.map((icon) => icon.nodeId)
  );

  for (const icon of approvedIcons) {
    const exportUrl = exportUrls[icon.nodeId];
    if (!exportUrl) {
      throw new Error(`Missing export URL for node ${icon.nodeId} (${icon.slug})`);
    }

    const categoryDir = path.join(outputRoot, icon.category as string);
    ensureDir(categoryDir);

    const targetPath = path.join(categoryDir, `${icon.slug}.svg`);
    const svgContent = await downloadText(exportUrl);
    fs.writeFileSync(targetPath, svgContent, 'utf-8');
    console.log(`Synced ${icon.slug} -> ${path.relative(PACKAGE_ROOT, targetPath)}`);
  }
}

function checkManifestHealth(manifest: IconManifest): void {
  validateManifest(manifest);

  const needsReview = manifest.icons.filter((icon) => icon.status === 'needs_review');
  if (needsReview.length > 0) {
    console.log(`Manifest has ${needsReview.length} icon(s) waiting for review:`);
    for (const icon of needsReview.slice(0, 30)) {
      console.log(
        `- ${icon.figmaName} (${icon.nodeId}) suggested slug: ${icon.suggestedSlug ?? 'n/a'}`
      );
    }
    if (needsReview.length > 30) {
      console.log(`...and ${needsReview.length - 30} more`);
    }
  } else {
    console.log('Manifest validation passed and no review items are pending');
  }
}

async function main(): Promise<void> {
  const { command, write } = parseArgs(process.argv.slice(2));
  const manifest = readManifest();

  if (command === 'discover') {
    const discovered = await discoverIcons(manifest);
    printDiscoveredSummary(manifest, discovered);

    if (write) {
      const nextManifest = mergeDiscoveredIcons(manifest, discovered);
      writeManifest(nextManifest);
      console.log(`Updated manifest: ${path.relative(PACKAGE_ROOT, MANIFEST_FILE)}`);
    } else {
      console.log('Run with --write to merge new nodes into the manifest');
    }
    return;
  }

  if (command === 'sync') {
    await syncApprovedIcons(manifest);
    return;
  }

  checkManifestHealth(manifest);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
