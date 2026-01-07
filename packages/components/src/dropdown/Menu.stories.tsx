import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { useState } from 'react';

const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 5C2 3.89543 2.89543 3 4 3H6L8 5H14C15.1046 5 16 5.89543 16 7V13C16 14.1046 15.1046 15 14 15H4C2.89543 15 2 14.1046 2 13V5Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['medium', 'large'],
      description: 'Menu size',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether to show search box',
    },
    virtual: {
      control: 'boolean',
      description: 'Enable virtual scrolling',
    },
    maxHeight: {
      control: 'number',
      description: 'Max height for scrolling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

/**
 * Basic menu
 */
export const Basic: Story = {
  args: {
    size: 'large',
    items: [
      { key: '1', label: 'Option content', icon: <CardIcon /> },
      { key: '2', label: 'Option content' },
      { key: '3', label: 'Option content', selected: true },
      { key: '4', label: 'Option content', disabled: true },
    ],
  },
};

/**
 * Menu with descriptions (shortcuts)
 * Note: Active icon space is reserved to keep descriptions aligned
 */
export const WithDescriptions: Story = {
  args: {
    size: 'large',
    reserveActiveIconSpace: true,
    items: [
      { key: '1', label: 'Option content', description: 'Cmd+C' },
      { key: '2', label: 'Option content', description: 'Cmd+V' },
      { key: '3', label: 'Option content', description: 'Cmd+X', selected: true, selectable: true },
      { key: '4', label: 'Option content', description: 'Cmd+Z' },
    ],
  },
};

/**
 * Menu with action mode (no selection state)
 */
export const ActionMode: Story = {
  args: {
    size: 'large',
    reserveActiveIconSpace: false,
    items: [
      { key: '1', label: 'New file', description: 'Cmd+N', selectable: false },
      { key: '2', label: 'Open file', description: 'Cmd+O', selectable: false },
      { key: '3', label: 'Save', description: 'Cmd+S', selectable: false },
      { key: '4', label: 'Save as', description: 'Cmd+Shift+S', selectable: false },
    ],
  },
};

/**
 * Menu with groups
 */
export const WithGroups: Story = {
  args: {
    size: 'large',
    items: [
      {
        type: 'group',
        key: 'g1',
        label: 'Title A',
        children: [
          { key: '1', label: 'Option content', icon: <CardIcon /> },
          { key: '2', label: 'Option content', description: 'Cmd+C' },
        ],
      },
      { type: 'divider', key: 'd1' },
      {
        type: 'group',
        key: 'g2',
        label: 'Title B',
        children: [
          { key: '3', label: 'Option content', icon: <FolderIcon /> },
          { key: '4', label: 'Option content', description: 'Cmd+V' },
        ],
      },
    ],
  },
};

/**
 * Menu with submenu
 */
export const WithSubmenu: Story = {
  args: {
    size: 'large',
    items: [
      { key: '1', label: 'Option content' },
      {
        key: '2',
        label: 'Option content',
        children: [
          { key: '2-1', label: 'Sub option 1' },
          { key: '2-2', label: 'Sub option 2' },
          { key: '2-3', label: 'Sub option 3' },
        ],
      },
      { key: '3', label: 'Option content' },
    ],
  },
};

/**
 * Menu with search (supports searching in submenu and descriptions)
 */
export const WithSearch: Story = {
  args: {
    size: 'large',
    searchable: true,
    searchPlaceholder: 'Enter search content',
    items: [
      { key: '1', label: 'New file', icon: <CardIcon />, description: 'Cmd+N' },
      { key: '2', label: 'Open file', description: 'Cmd+O' },
      {
        key: '3',
        label: 'Recent files',
        children: [
          { key: '3-1', label: 'Document.docx' },
          { key: '3-2', label: 'Spreadsheet.xlsx' },
          { key: '3-3', label: 'Presentation.pptx' },
        ],
      },
      { type: 'divider', key: 'd1' },
      { key: '4', label: 'Save', description: 'Cmd+S' },
      { key: '5', label: 'Save as', description: 'Cmd+Shift+S' },
    ],
  },
};

/**
 * Large menu with virtual scrolling
 */
export const VirtualScrolling: Story = {
  args: {
    size: 'large',
    virtual: true,
    maxHeight: 300,
    selectedKeys: ['1', '2', '20', '50'],
    items: Array.from({ length: 1000 }, (_, i) => ({
      key: `${i + 1}`,
      label: `Option ${i + 1}`,
      description: i % 5 === 0 ? `Cmd+${i}` : undefined,
      icon: i % 3 === 0 ? <CardIcon /> : undefined,
      selectable: true, // Make items selectable
    })),
  },
};

/**
 * Medium size menu
 */
export const MediumSize: Story = {
  args: {
    size: 'medium',
    items: [
      { key: '1', label: 'Option content', icon: <CardIcon /> },
      { key: '2', label: 'Option content', description: 'Cmd+C' },
      { key: '3', label: 'Option content', selected: true },
      { type: 'divider', key: 'd1' },
      { key: '4', label: 'Option content', disabled: true },
    ],
  },
};

/**
 * Size comparison
 */
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div>
        <div style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
          Medium (28px)
        </div>
        <Menu
          size="medium"
          items={[
            { key: '1', label: 'Option content', icon: <CardIcon /> },
            { key: '2', label: 'Option content', description: 'Cmd+C' },
            { key: '3', label: 'Option content', selected: true },
            { key: '4', label: 'Option content', disabled: true },
          ]}
        />
      </div>

      <div>
        <div style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
          Large (36px)
        </div>
        <Menu
          size="large"
          items={[
            { key: '1', label: 'Option content', icon: <FolderIcon /> },
            { key: '2', label: 'Option content', description: 'Cmd+V' },
            { key: '3', label: 'Option content', selected: true },
            { key: '4', label: 'Option content', disabled: true },
          ]}
        />
      </div>
    </div>
  ),
};

/**
 * Interactive example
 */
export const Interactive: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['2']);

    return (
      <div style={{ width: '300px' }}>
        <Menu
          size="large"
          selectedKeys={selectedKeys}
          items={[
            { key: '1', label: 'Option 1', icon: <CardIcon />, description: 'Cmd+1' },
            { key: '2', label: 'Option 2', icon: <FolderIcon />, description: 'Cmd+2' },
            { key: '3', label: 'Option 3', description: 'Cmd+3' },
            { type: 'divider', key: 'd1' },
            { key: '4', label: 'Option 4', disabled: true },
          ]}
          onSelect={(key) => {
            console.log('Selected:', key);
            setSelectedKeys([key]);
          }}
        />
        <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
          Selected: {selectedKeys.join(', ')}
        </div>
      </div>
    );
  },
};

/**
 * Complete example with all features
 */
export const CompleteExample: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1-2']);

    return (
      <div style={{ width: '320px' }}>
        <Menu
          size="large"
          searchable
          searchPlaceholder="Search menu items..."
          selectedKeys={selectedKeys}
          maxHeight={400}
          items={[
            {
              type: 'group',
              key: 'g1',
              label: 'File operations',
              children: [
                { key: '1-1', label: 'New', icon: <CardIcon />, description: 'Cmd+N' },
                { key: '1-2', label: 'Open', icon: <FolderIcon />, description: 'Cmd+O' },
                { key: '1-3', label: 'Save', description: 'Cmd+S' },
              ],
            },
            { type: 'divider', key: 'd1' },
            {
              type: 'group',
              key: 'g2',
              label: 'Edit operations',
              children: [
                { key: '2-1', label: 'Copy', description: 'Cmd+C' },
                { key: '2-2', label: 'Paste', description: 'Cmd+V' },
                {
                  key: '2-3',
                  label: 'More',
                  children: [
                    { key: '2-3-1', label: 'Cut', description: 'Cmd+X' },
                    { key: '2-3-2', label: 'Undo', description: 'Cmd+Z' },
                  ],
                },
              ],
            },
            { type: 'divider', key: 'd2' },
            { key: '3', label: 'Disabled option', disabled: true },
          ]}
          onSelect={(key) => setSelectedKeys([key])}
          onSearch={(value) => console.log('Search:', value)}
        />
      </div>
    );
  },
};

