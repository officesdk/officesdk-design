/**
 * Auto-generate icon registry from SVG files
 * Run: yarn generate:registry
 *
 * This script generates/updates:
 * - icons.ts: All icon component exports
 * - allIconRegistry.ts: Complete registry with all icons (for Storybook/prototyping)
 * - types.generated.ts: TypeScript types for icon names
 * - index.ts: Updates category exports
 * - Icon.stories.tsx: Updates category imports and renders
 *
 * It also normalizes SVG files (all categories):
 * - Merges fill-opacity into fill using RGBA format
 * - Wraps hardcoded fill colors in CSS variables (except white/currentColor/none)
 *
 * Note: registry.ts iconRegistry is manually maintained and contains only internal component icons.
 */
import * as fs from 'fs';
import * as path from 'path';

const SVG_DIR = path.join(__dirname, '../src/svg');
const ICONS_FILE = path.join(__dirname, '../src/icons.ts');
const ALL_REGISTRY_FILE = path.join(__dirname, '../src/allIconRegistry.ts');
const TYPES_FILE = path.join(__dirname, '../src/types.generated.ts');
const REGISTRY_FILE = path.join(__dirname, '../src/registry.ts');
const INDEX_FILE = path.join(__dirname, '../src/index.ts');
const STORYBOOK_FILE = path.join(
  __dirname,
  '../../../packages/components/src/Icon/Icon.stories.tsx'
);

interface IconInfo {
  name: string; // kebab-case name for registry (e.g., 'arrow-down')
  componentName: string; // PascalCase component name (e.g., 'ArrowDownIcon')
  category: string; // category folder name (e.g., 'arrows')
  svgPath: string; // relative path to SVG file (e.g., './svg/arrows/arrow-down.svg')
}

/**
 * Colors that should NOT be converted to CSS variables (inner elements like checkmarks)
 */
const PRESERVED_COLORS = ['white', '#fff', '#ffffff', '#FFF', '#FFFFFF'];

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * SVG normalization (applies to ALL icons)
 * - Merges fill-opacity into fill using RGBA
 * - Wraps hardcoded fill colors (not none/currentColor/white) in CSS variables
 */
function normalizeSvg(content: string): string {
  let result = content;

  // Step 1: Merge fill-opacity into fill using RGBA
  // Pattern: fill="<color>" fill-opacity="<value>"
  const fillOpacityPattern = /fill="(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})"\s+fill-opacity="([0-9.]+)"/g;
  result = result.replace(fillOpacityPattern, (_match, color, opacity) => {
    const rgb = hexToRgb(color);
    if (rgb) {
      return `fill="rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})"`;
    }
    return _match;
  });

  // Step 2: Wrap hardcoded hex fill colors in CSS variable
  const hexFillPattern = /fill="(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})"(?!\s+fill-opacity)/g;
  result = result.replace(hexFillPattern, (match, color) => {
    if (PRESERVED_COLORS.includes(color.toLowerCase())) {
      return match;
    }
    return `fill="var(--icon-fill, ${color})"`;
  });

  // Step 3: Wrap rgba fill colors in CSS variable
  const rgbaFillPattern = /fill="(rgba\([^)]+\))"/g;
  result = result.replace(rgbaFillPattern, (match, rgba) => {
    if (match.includes('var(')) {
      return match;
    }
    return `fill="var(--icon-fill, ${rgba})"`;
  });

  return result;
}

/**
 * Normalize SVG files across all categories
 */
function normalizeSvgFiles(): void {
  const categories = fs
    .readdirSync(SVG_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  let totalNormalized = 0;

  for (const category of categories) {
    const categoryPath = path.join(SVG_DIR, category);
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.svg'));

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const normalizedContent = normalizeSvg(content);

      if (content !== normalizedContent) {
        fs.writeFileSync(filePath, normalizedContent, 'utf-8');
        totalNormalized++;
        console.log(`  Normalized: ${category}/${file}`);
      }
    }
  }

  if (totalNormalized > 0) {
    console.log(`Normalized ${totalNormalized} SVG file(s)`);
  }
}

/**
 * Convert kebab-case to PascalCase and add Icon suffix
 */
function toComponentName(str: string): string {
  return (
    str
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Icon'
  );
}

/**
 * Scan SVG directory and collect icon info
 */
function scanIcons(): IconInfo[] {
  const icons: IconInfo[] = [];
  const categories = fs
    .readdirSync(SVG_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const category of categories) {
    const categoryPath = path.join(SVG_DIR, category);
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.svg'));

    for (const file of files) {
      const name = file.replace('.svg', '');
      icons.push({
        name,
        componentName: toComponentName(name),
        category,
        svgPath: `./svg/${category}/${file}`,
      });
    }
  }

  return icons.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Generate icons.ts - exports all icon components
 */
function generateIcons(icons: IconInfo[]): void {
  const imports = icons
    .map((icon) => `import { ReactComponent as ${icon.componentName} } from '${icon.svgPath}';`)
    .join('\n');

  const exports = icons.map((icon) => `  ${icon.componentName},`).join('\n');

  const content = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Generated by: scripts/generate-registry.ts
 *
 * This file exports all icon components directly from SVG files.
 */
${imports}

export {
${exports}
};
`;

  fs.writeFileSync(ICONS_FILE, content, 'utf-8');
  console.log(`Generated: ${ICONS_FILE}`);
}

/**
 * Generate allIconRegistry.ts - complete icon registry for Storybook/prototyping
 */
function generateAllRegistry(icons: IconInfo[]): void {
  const imports = icons.map((icon) => `  ${icon.componentName},`).join('\n');

  const registryEntries = icons
    .map((icon) => `  '${icon.name}': ${icon.componentName},`)
    .join('\n');

  const content = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Generated by: scripts/generate-registry.ts
 *
 * Complete icon registry containing ALL available icons.
 *
 * This is provided for convenience (e.g., Storybook, prototyping).
 * For production use, prefer createIconRegistry with only the icons you need.
 *
 * @example
 * import { allIconRegistry } from '@officesdk/design/icons';
 * import { IconProvider } from '@officesdk/design';
 *
 * <IconProvider icons={allIconRegistry}>
 *   <App />
 * </IconProvider>
 */
import {
${imports}
} from './icons';

import type { IconRegistry } from './types';

export const allIconRegistry: IconRegistry = {
${registryEntries}
};
`;

  fs.writeFileSync(ALL_REGISTRY_FILE, content, 'utf-8');
  console.log(`Generated: ${ALL_REGISTRY_FILE}`);
}

/**
 * Update registry.ts - only update category exports, preserve manual iconRegistry
 */
function updateRegistryCategories(icons: IconInfo[]): void {
  // Read existing registry.ts
  const existingContent = fs.readFileSync(REGISTRY_FILE, 'utf-8');

  // Group icons by category
  const categories = [...new Set(icons.map((i) => i.category))].sort();

  // Generate category arrays
  const categoryArrays = categories
    .map((cat) => {
      const catIcons = icons.filter((i) => i.category === cat);
      const iconNames = catIcons.map((i) => `  '${i.name}',`).join('\n');
      const constName = cat.replace(/-/g, '_').toUpperCase() + '_ICONS';
      const count = catIcons.length;
      return `// ${cat.charAt(0).toUpperCase() + cat.slice(1)} (${count})
export const ${constName} = [
${iconNames}
] as const;`;
    })
    .join('\n\n');

  // Generate ICON_NAMES
  const categoryConstNames = categories.map(
    (cat) => `  ...${cat.replace(/-/g, '_').toUpperCase()}_ICONS,`
  );
  const iconNamesExport = `/**
 * All available icon names (for documentation and reference)
 */
export const ICON_NAMES = [
${categoryConstNames.join('\n')}
] as const;`;

  // Find the marker where categories start (after iconRegistry definition)
  const markerPattern = /\/\*\*\s*\n\s*\*\s*Icon categories/;
  const markerMatch = existingContent.match(markerPattern);

  if (markerMatch && markerMatch.index !== undefined) {
    // Preserve everything before the categories section
    const beforeCategories = existingContent.substring(0, markerMatch.index);

    // Generate new categories section
    const newContent = `${beforeCategories}/**
 * Icon categories - for documentation and reference
 */

${categoryArrays}

${iconNamesExport}

/**
 * Get icon component by name from the internal registry
 */
export const getIcon = (name: string) => iconRegistry[name];
`;

    fs.writeFileSync(REGISTRY_FILE, newContent, 'utf-8');
    console.log(`Updated categories in: ${REGISTRY_FILE}`);
  } else {
    console.log(`Warning: Could not find category marker in ${REGISTRY_FILE}, skipping update`);
  }
}

/**
 * Generate types.generated.ts - TypeScript types for icon names
 */
function generateTypes(icons: IconInfo[]): void {
  const categories = [...new Set(icons.map((i) => i.category))].sort();

  const categoryTypes = categories.map((cat) => {
    const catIcons = icons.filter((i) => i.category === cat);
    const typeName =
      cat
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('') + 'IconName';
    const iconNames = catIcons.map((i) => `  | '${i.name}'`).join('\n');
    return `export type ${typeName} =\n${iconNames};`;
  });

  const allTypeNames = categories.map((cat) => {
    return (
      cat
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('') + 'IconName'
    );
  });

  const content = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Generated by: scripts/generate-registry.ts
 */

${categoryTypes.join('\n\n')}

/**
 * All icon names union type
 */
export type IconName =
${allTypeNames.map((t) => `  | ${t}`).join('\n')};
`;

  fs.writeFileSync(TYPES_FILE, content, 'utf-8');
  console.log(`Generated: ${TYPES_FILE}`);
}

/**
 * Update index.ts - update category exports
 */
function updateIndexExports(categories: string[]): void {
  const categoryConstNames = categories.map(
    (cat) => cat.replace(/-/g, '_').toUpperCase() + '_ICONS'
  );
  const categoryTypeNames = categories.map(
    (cat) =>
      cat
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('') + 'IconName'
  );

  const content = `// Export all icon components
export * from './icons';

// Export registry (minimal - only internal icons)
export { iconRegistry, getIcon, ICON_NAMES } from './registry';

// Export full registry for documentation/prototyping (tree-shakeable)
export { allIconRegistry } from './allIconRegistry';

// Export createIconRegistry for tree-shakeable custom registries
export { createIconRegistry } from './createIconRegistry';

// Export category arrays
export {
${categoryConstNames.map((name) => `  ${name},`).join('\n')}
} from './registry';

// Export types
export type { IconComponent, IconRegistry } from './types';
export type {
  IconName,
${categoryTypeNames.map((name) => `  ${name},`).join('\n')}
} from './types.generated';

// Backward compatibility alias
export type { ArrowsIconName as ArrowIconName } from './types.generated';
`;

  fs.writeFileSync(INDEX_FILE, content, 'utf-8');
  console.log(`Updated: ${INDEX_FILE}`);
}

/**
 * Update Icon.stories.tsx - update category imports and renders
 */
function updateStorybook(categories: string[]): void {
  const existingContent = fs.readFileSync(STORYBOOK_FILE, 'utf-8');

  const categoryConstNames = categories.map(
    (cat) => cat.replace(/-/g, '_').toUpperCase() + '_ICONS'
  );

  // Update imports from @officesdk/design/icons only
  // More specific pattern to match only the design/icons import block
  const importPattern = /import \{\n( {2}2}[^\n]+\n)+\} from '@officesdk\/design\/icons';/;
  const newImports = `import {
  iconRegistry,
  createIconRegistry,
${categoryConstNames.map((name) => `  ${name},`).join('\n')}
  ICON_NAMES,
  CheckIcon,
  CloseIcon,
  SearchIcon,
  allIconRegistry,
} from '@officesdk/design/icons';`;

  let updatedContent = existingContent.replace(importPattern, newImports);

  // Build new IconGrids
  const newIconGrids = categories
    .map((cat) => {
      const constName = cat.replace(/-/g, '_').toUpperCase() + '_ICONS';
      const displayName = cat
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      return `<IconGrid title={\`${displayName} (\${${constName}.length})\`} names={${constName}} size={20} />`;
    })
    .join('\n        ');

  // Find and replace the IconGrid section within AllIcons story
  const allIconsPattern =
    /(<IconProvider icons=\{allIconRegistry\}>\s*<div[^>]*>[\s\S]*?<h2[^>]*>[\s\S]*?<\/h2>\s*)(<IconGrid[\s\S]*?)(\s*<\/div>\s*<\/IconProvider>)/;

  const match = updatedContent.match(allIconsPattern);
  if (match) {
    updatedContent = updatedContent.replace(allIconsPattern, `$1${newIconGrids}$3`);
  }

  fs.writeFileSync(STORYBOOK_FILE, updatedContent, 'utf-8');
  console.log(`Updated: ${STORYBOOK_FILE}`);
}

// Main
function main() {
  console.log('Normalizing SVG files...');
  normalizeSvgFiles();

  console.log('Scanning SVG files...');
  const icons = scanIcons();
  const categories = [...new Set(icons.map((i) => i.category))].sort();
  console.log(`Found ${icons.length} icons in ${categories.length} categories`);

  generateIcons(icons);
  generateAllRegistry(icons);
  updateRegistryCategories(icons);
  generateTypes(icons);
  updateIndexExports(categories);
  updateStorybook(categories);

  console.log('Done!');
}

main();
