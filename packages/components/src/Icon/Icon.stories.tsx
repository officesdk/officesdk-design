import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconProvider } from './index';

// Import icon components for demonstration
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 3V4M10 16V17M17 10H16M4 10H3M15.5 4.5L14.8 5.2M5.2 14.8L4.5 15.5M15.5 15.5L14.8 14.8M5.2 5.2L4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Mock registry for stories
const mockRegistry = {
  'close': CloseIcon,
  'search': SearchIcon,
  'check': CheckIcon,
  'settings': SettingsIcon,
};

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
      description: 'Size of the icon in pixels',
    },
    color: {
      control: 'color',
      description: 'Color of the icon',
    },
    name: {
      control: 'text',
      description: 'Icon name from registry (requires IconProvider)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Using custom icon element
export const WithCustomIcon: Story = {
  args: {
    size: 24,
    color: '#41464b',
  },
  render: (args) => (
    <Icon {...args}>
      <CloseIcon />
    </Icon>
  ),
};

// Using icon registry
export const WithIconRegistry: Story = {
  args: {
    name: 'close',
    size: 24,
    color: '#41464b',
  },
  render: (args) => (
    <IconProvider icons={mockRegistry}>
      <Icon {...args} />
    </IconProvider>
  ),
};

// Using image URL
export const WithImageUrl: Story = {
  args: {
    src: 'https://api.iconify.design/mdi/heart.svg',
    size: 24,
  },
  render: (args) => (
    <Icon {...args} />
  ),
};

// Different sizes
export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon size={12}><CloseIcon /></Icon>
      <Icon size={16}><CloseIcon /></Icon>
      <Icon size={20}><CloseIcon /></Icon>
      <Icon size={24}><CloseIcon /></Icon>
      <Icon size={32}><CloseIcon /></Icon>
      <Icon size={48}><CloseIcon /></Icon>
    </div>
  ),
};

// Different colors
export const DifferentColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon color="#41464b"><CloseIcon /></Icon>
      <Icon color="#5BA0E7"><SearchIcon /></Icon>
      <Icon color="#52C41A"><CheckIcon /></Icon>
      <Icon color="#FAAD14"><SettingsIcon /></Icon>
      <Icon color="#E95555"><CloseIcon /></Icon>
    </div>
  ),
};

// With click handler
export const Clickable: Story = {
  render: () => (
    <Icon
      size={24}
      onClick={() => alert('Icon clicked!')}
      style={{ cursor: 'pointer' }}
    >
      <CloseIcon />
    </Icon>
  ),
};

// All icons showcase by category
export const AllIconsShowcase: Story = {
  render: () => (
    <IconProvider icons={mockRegistry}>
      <div style={{ padding: '20px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 600 }}>
          Icon System - Categorized by Figma Design
        </h2>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
            Usage Method 1: Direct Import
          </h3>
          <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
            Import icon components directly from @officesdk/design/icons
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <Icon size={24}><CloseIcon /></Icon>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>CloseIcon</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Icon size={24}><SearchIcon /></Icon>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>SearchIcon</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Icon size={24}><CheckIcon /></Icon>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>CheckIcon</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Icon size={24}><SettingsIcon /></Icon>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>SettingsIcon</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
            Usage Method 1.5: Using Image URL (src)
          </h3>
          <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
            Use src prop to load icons from URLs (PNG, JPG, SVG, etc.)
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <Icon src="https://api.iconify.design/mdi/heart.svg" size={24} alt="Heart" />
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>External SVG</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Icon src="https://api.iconify.design/mdi/star.svg" size={24} alt="Star" />
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>External SVG</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
            Usage Method 2: Icon Registry
          </h3>
          <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
            Use Icon component with name prop (requires IconProvider)
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {Object.keys(mockRegistry).map((iconName) => (
              <div key={iconName} style={{ textAlign: 'center' }}>
                <Icon name={iconName} size={24} />
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>{iconName}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
            Icon Categories (Based on Figma Design)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
                General Icons
              </h4>
              <p style={{ fontSize: '12px', color: '#999' }}>
                workbench, format-brush, copy, paste, cut, delete, undo, redo, save, check, etc.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
                Main Site Icons
              </h4>
              <p style={{ fontSize: '12px', color: '#999' }}>
                filter, sort, settings, close, menu, back, list, grid, search, edit, share, etc.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
                Text Icons
              </h4>
              <p style={{ fontSize: '12px', color: '#999' }}>
                indent, align-left/center/right, list-bullet/number, bold, italic, underline, etc.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
                Image Icons
              </h4>
              <p style={{ fontSize: '12px', color: '#999' }}>
                image, rotate-left/right, flip-horizontal/vertical, etc.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
                Table Icons
              </h4>
              <p style={{ fontSize: '12px', color: '#999' }}>
                table, freeze, merge-cells, split-cells, etc.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
                Status Icons
              </h4>
              <p style={{ fontSize: '12px', color: '#999' }}>
                success, error, warning, info, loading
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
            Size & Color Customization
          </h3>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Sizes</div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Icon name="close" size={12} />
                <Icon name="close" size={16} />
                <Icon name="close" size={20} />
                <Icon name="close" size={24} />
                <Icon name="close" size={32} />
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Colors</div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Icon name="check" size={24} color="#52C41A" />
                <Icon name="close" size={24} color="#E95555" />
                <Icon name="search" size={24} color="#5BA0E7" />
                <Icon name="settings" size={24} color="#FAAD14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </IconProvider>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
