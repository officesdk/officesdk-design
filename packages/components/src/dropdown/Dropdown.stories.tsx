import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { DropdownButton } from './DropdownButton';
import { Menu } from './Menu';
import { Button } from '../Button';
import { useState } from 'react';

const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      control: 'multi-select',
      options: ['click', 'hover', 'contextMenu'],
      description: 'Trigger action',
    },
    placement: {
      control: 'select',
      options: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'],
      description: 'Dropdown placement',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

/**
 * Basic dropdown with DropdownButton + Menu
 */
export const Basic: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);

    const menuItems = [
      { key: '1', label: 'Option 1', icon: <CardIcon /> },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4', disabled: true },
    ];

    return (
      <Dropdown
        overlay={
          <Menu
            items={menuItems}
            selectedKeys={selectedKeys}
            onSelect={(key) => setSelectedKeys([key])}
          />
        }
        trigger={['click']}
      >
        <DropdownButton variant="framed" value={`Option ${selectedKeys[0]}`} />
      </Dropdown>
    );
  },
};

/**
 * Frameless dropdown button
 */
export const Frameless: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['2']);

    const menuItems = [
      { key: '1', label: 'Small' },
      { key: '2', label: 'Medium' },
      { key: '3', label: 'Large' },
    ];

    return (
      <Dropdown
        overlay={
          <Menu
            size="medium"
            items={menuItems}
            selectedKeys={selectedKeys}
            onSelect={(key) => setSelectedKeys([key])}
          />
        }
        trigger={['click']}
      >
        <DropdownButton
          variant="frameless"
          value={menuItems.find(item => item.key === selectedKeys[0])?.label}
        />
      </Dropdown>
    );
  },
};

/**
 * Dropdown with groups and dividers
 */
export const WithGroups: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1-1']);

    return (
      <Dropdown
        overlay={
          <Menu
            items={[
              {
                type: 'group',
                key: 'g1',
                label: 'File operations',
                children: [
                  { key: '1-1', label: 'New', description: 'Cmd+N' },
                  { key: '1-2', label: 'Open', description: 'Cmd+O' },
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
                ],
              },
            ]}
            selectedKeys={selectedKeys}
            onSelect={(key) => setSelectedKeys([key])}
          />
        }
        trigger={['click']}
      >
        <DropdownButton variant="framed" value="File operations" icon={<CardIcon />} />
      </Dropdown>
    );
  },
};

/**
 * Dropdown with submenu
 */
export const WithSubmenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const handleSelect = (key: string) => {
      setSelectedKeys([key]);
      setOpen(false); // Close dropdown after selection
      setOpenKeys([]); // Close all submenus
    };

    const handleVisibleChange = (visible: boolean) => {
      setOpen(visible);
      if (!visible) {
        setOpenKeys([]); // Close all submenus when dropdown closes
      }
    };

    const getDisplayValue = () => {
      if (!selectedKeys[0]) return 'Select option';
      if (selectedKeys[0] === '1') return 'Option 1';
      if (selectedKeys[0] === '3') return 'Option 3';
      if (selectedKeys[0].startsWith('2-')) {
        const subIndex = selectedKeys[0].split('-')[1];
        return `Sub option ${subIndex}`;
      }
      return 'Select option';
    };

    return (
      <Dropdown
        visible={open}
        onVisibleChange={handleVisibleChange}
        overlay={
          <Menu
            items={[
              { key: '1', label: 'Option 1' },
              {
                key: '2',
                label: 'More options',
                children: [
                  { key: '2-1', label: 'Sub option 1' },
                  { key: '2-2', label: 'Sub option 2' },
                  { key: '2-3', label: 'Sub option 3' },
                ],
              },
              { key: '3', label: 'Option 3' },
            ]}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={setOpenKeys}
            onSelect={handleSelect}
          />
        }
        trigger={['click']}
      >
        <DropdownButton variant="framed" value={getDisplayValue()} open={open} />
      </Dropdown>
    );
  },
};

/**
 * Dropdown with search
 */
export const WithSearch: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);

    const menuItems = Array.from({ length: 20 }, (_, i) => ({
      key: `${i + 1}`,
      label: `Option ${i + 1}`,
      description: i % 5 === 0 ? `Cmd+${i}` : undefined,
    }));

    return (
      <Dropdown
        overlay={
          <Menu
            searchable
            items={menuItems}
            selectedKeys={selectedKeys}
            onSelect={(key) => setSelectedKeys([key])}
            maxHeight={300}
          />
        }
        trigger={['click']}
      >
        <DropdownButton
          variant="framed"
          value={`Option ${selectedKeys[0]}`}
        />
      </Dropdown>
    );
  },
};

/**
 * Hover trigger
 */
export const HoverTrigger: Story = {
  render: () => (
    <Dropdown
      overlay={
        <Menu
          items={[
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
            { key: '3', label: 'Option 3' },
          ]}
        />
      }
      trigger={['hover']}
    >
      <DropdownButton variant="frameless" value="Hover me" />
    </Dropdown>
  ),
};

/**
 * Different placements
 */
export const Placements: Story = {
  render: () => {
    const menu = (
      <Menu
        items={[
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
          { key: '3', label: 'Option 3' },
        ]}
      />
    );

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', padding: '100px' }}>
        <Dropdown overlay={menu} placement="topLeft">
          <DropdownButton variant="frameless" value="Top Left" />
        </Dropdown>

        <Dropdown overlay={menu} placement="topCenter">
          <DropdownButton variant="frameless" value="Top Center" />
        </Dropdown>

        <Dropdown overlay={menu} placement="topRight">
          <DropdownButton variant="frameless" value="Top Right" />
        </Dropdown>

        <Dropdown overlay={menu} placement="bottomLeft">
          <DropdownButton variant="frameless" value="Bottom Left" />
        </Dropdown>

        <Dropdown overlay={menu} placement="bottomCenter">
          <DropdownButton variant="frameless" value="Bottom Center" />
        </Dropdown>

        <Dropdown overlay={menu} placement="bottomRight">
          <DropdownButton variant="frameless" value="Bottom Right" />
        </Dropdown>
      </div>
    );
  },
};

/**
 * Dropdown with custom trigger (Button)
 */
export const WithButton: Story = {
  render: () => (
    <Dropdown
      overlay={
        <Menu
          items={[
            { key: '1', label: 'Edit', description: 'Cmd+E' },
            { key: '2', label: 'Copy', description: 'Cmd+C' },
            { key: '3', label: 'Delete', description: 'Del' },
          ]}
        />
      }
      trigger={['click']}
    >
      <Button variant="outlined">Actions</Button>
    </Dropdown>
  ),
};

/**
 * Controlled dropdown
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <Dropdown
          visible={open}
          onVisibleChange={setOpen}
          overlay={
            <Menu
              items={[
                { key: '1', label: 'Option 1' },
                { key: '2', label: 'Option 2' },
                { key: '3', label: 'Option 3' },
              ]}
              selectedKeys={selectedKeys}
              onSelect={(key) => {
                setSelectedKeys([key]);
                setOpen(false); // Close dropdown after selection
              }}
            />
          }
          trigger={['click']}
        >
          <DropdownButton
            variant="framed"
            value={`Option ${selectedKeys[0]}`}
            open={open}
          />
        </Dropdown>

        <div style={{ fontSize: '12px', color: '#666' }}>
          <div>Dropdown open: {open ? 'Yes' : 'No'}</div>
          <div>Selected: Option {selectedKeys[0]}</div>
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
    const [open, setOpen] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1-2']);

    const handleSelect = (key: string) => {
      setSelectedKeys([key]);
      setOpen(false);
    };

    const selectedLabel = (() => {
      if (selectedKeys[0] === '1-1') return 'New';
      if (selectedKeys[0] === '1-2') return 'Open';
      if (selectedKeys[0] === '1-3') return 'Save';
      if (selectedKeys[0] === '2-1') return 'Copy';
      if (selectedKeys[0] === '2-2') return 'Paste';
      if (selectedKeys[0] === '2-3-1') return 'Cut';
      if (selectedKeys[0] === '2-3-2') return 'Undo';
      return 'Select';
    })();

    return (
      <div style={{ padding: '50px' }}>
        <Dropdown
          visible={open}
          onVisibleChange={setOpen}
          overlay={
            <Menu
              size="large"
              searchable
              searchPlaceholder="Search actions..."
              selectedKeys={selectedKeys}
              onSelect={handleSelect}
              maxHeight={400}
              items={[
                {
                  type: 'group',
                  key: 'g1',
                  label: 'File operations',
                  children: [
                    { key: '1-1', label: 'New', icon: <CardIcon />, description: 'Cmd+N' },
                    { key: '1-2', label: 'Open', description: 'Cmd+O' },
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
            />
          }
          trigger={['click']}
        >
          <DropdownButton
            variant="framed"
            icon={<CardIcon />}
            value={selectedLabel}
            open={open}
          />
        </Dropdown>

        <div style={{ marginTop: '24px', padding: '16px', background: '#f9f9f9', borderRadius: '4px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
            Features:
          </h3>
          <ul style={{ fontSize: '12px', margin: 0, paddingLeft: '20px' }}>
            <li>✅ DropdownButton (framed with icon)</li>
            <li>✅ Menu with groups and dividers</li>
            <li>✅ SubMenu support (hover "More")</li>
            <li>✅ Search functionality</li>
            <li>✅ Keyboard shortcuts display</li>
            <li>✅ Controlled open/close state</li>
            <li>✅ Auto-close on selection</li>
          </ul>
        </div>
      </div>
    );
  },
};

/**
 * Action menu (no selection state)
 */
export const ActionMenu: Story = {
  render: () => {
    return (
      <Dropdown
        overlay={
          <Menu
            reserveActiveIconSpace={false}
            items={[
              { key: '1', label: 'New file', description: 'Cmd+N', selectable: false },
              { key: '2', label: 'Open file', description: 'Cmd+O', selectable: false },
              { type: 'divider', key: 'd1' },
              { key: '3', label: 'Save', description: 'Cmd+S', selectable: false },
              { key: '4', label: 'Save as', description: 'Cmd+Shift+S', selectable: false },
            ]}
            onSelect={(key) => {
              console.log('Action:', key);
              alert(`Executed action: ${key}`);
            }}
          />
        }
        trigger={['click']}
      >
        <DropdownButton variant="framed" value="File actions" />
      </Dropdown>
    );
  },
};

/**
 * Dropdown with virtual scrolling (1000 items)
 */
export const VirtualScrolling: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['500']);

    const menuItems = Array.from({ length: 1000 }, (_, i) => ({
      key: `${i + 1}`,
      label: `Option ${i + 1}`,
      description: i % 10 === 0 ? `Cmd+${i}` : undefined,
      icon: i % 5 === 0 ? <CardIcon /> : undefined,
    }));

    return (
      <Dropdown
        overlay={
          <Menu
            virtual
            maxHeight={300}
            items={menuItems}
            selectedKeys={selectedKeys}
            onSelect={(key) => setSelectedKeys([key])}
          />
        }
        trigger={['click']}
      >
        <DropdownButton variant="framed" value={`Option ${selectedKeys[0]}`} />
      </Dropdown>
    );
  },
};

/**
 * Multiple dropdowns
 */
export const MultipleDropdowns: Story = {
  render: () => {
    const [selected1, setSelected1] = useState<string[]>(['1']);
    const [selected2, setSelected2] = useState<string[]>(['a']);

    return (
      <div style={{ display: 'flex', gap: '24px' }}>
        <Dropdown
          overlay={
            <Menu
              items={[
                { key: '1', label: 'Option 1' },
                { key: '2', label: 'Option 2' },
                { key: '3', label: 'Option 3' },
              ]}
              selectedKeys={selected1}
              onSelect={(key) => setSelected1([key])}
            />
          }
          trigger={['click']}
        >
          <DropdownButton variant="framed" value={`Option ${selected1[0]}`} />
        </Dropdown>

        <Dropdown
          overlay={
            <Menu
              size="medium"
              items={[
                { key: 'a', label: 'Item A' },
                { key: 'b', label: 'Item B' },
                { key: 'c', label: 'Item C' },
              ]}
              selectedKeys={selected2}
              onSelect={(key) => setSelected2([key])}
            />
          }
          trigger={['click']}
        >
          <DropdownButton variant="frameless" value={`Item ${selected2[0].toUpperCase()}`} />
        </Dropdown>
      </div>
    );
  },
};

/**
 * Dropdown with custom trigger element
 */
export const CustomTrigger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Dropdown
        overlay={
          <Menu
            items={[
              { key: '1', label: 'Profile' },
              { key: '2', label: 'Settings' },
              { type: 'divider', key: 'd1' },
              { key: '3', label: 'Logout' },
            ]}
          />
        }
        trigger={['click']}
      >
        <Button variant="solid">User Menu</Button>
      </Dropdown>

      <Dropdown
        overlay={
          <Menu
            items={[
              { key: '1', label: 'Edit' },
              { key: '2', label: 'Copy' },
              { key: '3', label: 'Delete' },
            ]}
          />
        }
        trigger={['click']}
      >
        <Button variant="outlined">Actions</Button>
      </Dropdown>

      <Dropdown
        overlay={
          <Menu
            size="medium"
            items={[
              { key: '1', label: 'Share' },
              { key: '2', label: 'Download' },
            ]}
          />
        }
        trigger={['click']}
      >
        <div style={{
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          userSelect: 'none',
        }}>
          Custom Trigger
        </div>
      </Dropdown>
    </div>
  ),
};

