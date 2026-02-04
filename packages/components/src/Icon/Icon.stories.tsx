import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconProvider } from './index';
import {
  iconRegistry,
  createIconRegistry,
  ARROWS_ICONS,
  GENERAL_ICONS,
  IMAGE_ICONS,
  MAIN_SITE_ICONS,
  STATUS_ICONS,
  TABLE_ICONS,
  TEXT_ICONS,
  UTILITY_ICONS,
  ICON_NAMES,
  CheckIcon,
  CloseIcon,
  SearchIcon,
  allIconRegistry,
} from '@officesdk/design/icons';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 12, max: 48, step: 2 },
      description: 'Size of the icon in pixels. When not set, SVG keeps its original size.',
    },
    color: {
      control: 'color',
      description: 'Color of the icon. When not set, SVG keeps its original colors.',
    },
    name: {
      control: 'text',
      description: 'Icon name from registry (requires IconProvider)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const Section: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <div style={{ marginBottom: '24px' }}>
    <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600, color: '#333' }}>
      {title}
    </h3>
    {description && (
      <p style={{ marginBottom: '12px', fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
        {description}
      </p>
    )}
    {children}
  </div>
);

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
);

const CATALOG_TABS = [
  { id: 'all', label: 'All', names: ICON_NAMES },
  { id: 'arrows', label: 'Arrows', names: ARROWS_ICONS },
  { id: 'general', label: 'General', names: GENERAL_ICONS },
  { id: 'image', label: 'Image', names: IMAGE_ICONS },
  { id: 'main', label: 'Main Site', names: MAIN_SITE_ICONS },
  { id: 'status', label: 'Status', names: STATUS_ICONS },
  { id: 'table', label: 'Table', names: TABLE_ICONS },
  { id: 'text', label: 'Text', names: TEXT_ICONS },
  { id: 'utility', label: 'Utility', names: UTILITY_ICONS },
] as const;

type CatalogTabId = typeof CATALOG_TABS[number]['id'];

// Default: SVG keeps original size and color
export const Default: Story = {
  render: () => (
    <Icon>
      <CheckIcon />
    </Icon>
  ),
};

export const Usage: Story = {
  name: 'Usage Overview',
  render: () => (
    <IconProvider icons={iconRegistry}>
      <div style={{ padding: '24px', maxWidth: '900px' }}>
        <Section
          title="Direct Import"
          description="Use the icon component directly (no registry required)."
        >
          <Row>
            <CheckIcon />
            <SearchIcon />
            <CloseIcon />
          </Row>
        </Section>

        <Section
          title="Registry by Name"
          description="Use IconProvider + name for dynamic rendering."
        >
          <Row>
            <Icon name="check" size={20} />
            <Icon name="search" size={20} />
            <Icon name="close" size={20} />
          </Row>
        </Section>

        <Section title="External Image" description="Use src for external images (PNG/JPG/SVG).">
          <Row>
            <Icon src="https://api.iconify.design/mdi/heart.svg" size={24} />
            <Icon src="https://api.iconify.design/mdi/star.svg" size={24} />
          </Row>
        </Section>
      </div>
    </IconProvider>
  ),
  parameters: { layout: 'fullscreen' },
};

export const Sizes: Story = {
  name: 'Size Behavior',
  render: () => (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <Section
        title="Original SVG Size"
        description="When no size prop is passed, icons render at their original SVG dimensions."
      >
        <Row>
          <Icon>
            <CheckIcon />
          </Icon>
          <Icon>
            <SearchIcon />
          </Icon>
          <Icon>
            <CloseIcon />
          </Icon>
        </Row>
      </Section>

      <Section
        title="Override Size"
        description="Use size to enforce a consistent layout across icons."
      >
        <Row>
          {[12, 16, 20, 24, 32, 48].map((s) => (
            <div key={s} style={{ textAlign: 'center' }}>
              <Icon size={s}>
                <SearchIcon />
              </Icon>
              <div style={{ marginTop: '4px', fontSize: '11px', color: '#888' }}>{s}px</div>
            </div>
          ))}
        </Row>
      </Section>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

export const Colors: Story = {
  name: 'Color Behavior',
  render: () => (
    <IconProvider icons={allIconRegistry}>
      <div style={{ padding: '24px', maxWidth: '900px' }}>
        <Section
          title="Stroke-based Icons"
          description="Most icons use currentColor for stroke. Set color via Icon or parent styles."
        >
          <Row>
            <Icon color="#41464b" size={20}>
              <SearchIcon />
            </Icon>
            <Icon color="#E95555" size={20}>
              <SearchIcon />
            </Icon>
            <Icon color="#5BA0E7" size={20}>
              <SearchIcon />
            </Icon>
          </Row>
        </Section>

        <Section
          title="Fill-based Icons (Status)"
          description="Status icons keep their default fill colors unless color is provided."
        >
          <Row>
            <Icon name="success" size={24} />
            <Icon name="error" size={24} />
            <Icon name="warning" size={24} />
            <Icon name="success" size={24} color="#8B5CF6" />
            <Icon name="error" size={24} color="#8B5CF6" />
            <Icon name="warning" size={24} color="#8B5CF6" />
          </Row>
          <div
            style={{
              marginTop: '12px',
              padding: '8px 10px',
              background: '#f5f5f5',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '12px',
            }}
          >
            {`<Icon name="success" />  // default`}
            <br />
            {`<Icon name="success" color="#8B5CF6" />  // override`}
          </div>
        </Section>

        <div
          style={{
            padding: '12px',
            background: '#e6f7ff',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#1890ff',
          }}
        >
          <strong>Tip:</strong> The <code>color</code> prop works for both icon types.
        </div>
      </div>
    </IconProvider>
  ),
  parameters: { layout: 'fullscreen' },
};

// All icons showcase grouped by category
const IconCatalog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [activeTab, setActiveTab] = useState<CatalogTabId>('all');

  const active = CATALOG_TABS.find((t) => t.id === activeTab) || CATALOG_TABS[0];

  const filteredIcons = useMemo(
    () => active.names.filter((name) => name.toLowerCase().includes(search.toLowerCase())),
    [active.names, search]
  );

  const getImportText = (name: string) =>
    `import { ${name
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('')}Icon } from '@officesdk/design/icons';`;

  const handleSelect = async (name: string) => {
    setSelected(name);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(getImportText(name));
        setCopyState('copied');
      } else {
        setCopyState('failed');
      }
    } catch {
      setCopyState('failed');
    }
    setTimeout(() => setCopyState('idle'), 1500);
  };

  return (
    <IconProvider icons={allIconRegistry}>
      <div style={{ padding: '24px', maxWidth: '1000px' }}>
        <Section
          title="Icon Catalog"
          description="Browse by category tab, search by name, and click to copy import."
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {CATALOG_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: activeTab === tab.id ? '1px solid #5BA0E7' : '1px solid #e8e8e8',
                  background: activeTab === tab.id ? '#f0f7ff' : '#fff',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                {tab.label} ({tab.names.length})
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              outline: 'none',
              marginBottom: '16px',
            }}
          />

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filteredIcons.map((name) => (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                type="button"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  padding: '8px',
                  border: selected === name ? '2px solid #5BA0E7' : '1px solid #e8e8e8',
                  borderRadius: '8px',
                  background: selected === name ? '#f0f7ff' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Icon name={name} size={24} />
                <span
                  style={{
                    marginTop: '6px',
                    fontSize: '10px',
                    color: '#666',
                    textAlign: 'center',
                    wordBreak: 'break-all',
                  }}
                >
                  {name}
                </span>
              </button>
            ))}
          </div>

          {selected && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              <div style={{ marginBottom: '6px', color: '#666' }}>
                {copyState === 'copied'
                  ? 'Copied!'
                  : copyState === 'failed'
                  ? 'Copy failed — please copy manually'
                  : 'Click icon to copy import:'}
              </div>
              <code>{getImportText(selected)}</code>
            </div>
          )}

          <div style={{ marginTop: '12px', fontSize: '12px', color: '#888' }}>
            Showing {filteredIcons.length} of {active.names.length} icons
          </div>
        </Section>
      </div>
    </IconProvider>
  );
};

export const AllIcons: Story = {
  name: 'Icon Catalog (Tabs)',
  render: () => <IconCatalog />,
  parameters: { layout: 'fullscreen' },
};

// Tree-shakeable custom registry example
const myIcons = createIconRegistry({
  check: CheckIcon,
  close: CloseIcon,
  search: SearchIcon,
});

export const TreeShakeable: Story = {
  name: 'Tree-Shakeable Registry',
  render: () => (
    <IconProvider icons={myIcons}>
      <div style={{ padding: '24px', maxWidth: '900px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Tree-Shakeable Custom Registry
        </h3>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666', lineHeight: 1.6 }}>
          Use <code>createIconRegistry</code> to build a custom registry with only the icons you
          need. This enables tree-shaking — only imported icons will be included in your bundle.
        </p>

        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            background: '#f5f5f5',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        >
          <pre
            style={{ margin: 0, whiteSpace: 'pre-wrap' }}
          >{`import { createIconRegistry, CheckIcon, CloseIcon, SearchIcon } from '@officesdk/design/icons';

const myIcons = createIconRegistry({
  check: CheckIcon,
  close: CloseIcon,
  search: SearchIcon,
});

<IconProvider icons={myIcons}>
  <Icon name="check" size={20} />
</IconProvider>`}</pre>
        </div>

        <Row>
          {(['check', 'close', 'search'] as const).map((name) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <Icon name={name} size={24} />
              <div style={{ marginTop: '6px', fontSize: '11px', color: '#888' }}>{name}</div>
            </div>
          ))}
        </Row>

        <div
          style={{
            marginTop: '24px',
            padding: '12px',
            background: '#e6f7ff',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#1890ff',
          }}
        >
          <strong>Tip:</strong> For full catalog demos, use <code>allIconRegistry</code>. For
          production, prefer a minimal registry.
        </div>
      </div>
    </IconProvider>
  ),
  parameters: { layout: 'fullscreen' },
};
