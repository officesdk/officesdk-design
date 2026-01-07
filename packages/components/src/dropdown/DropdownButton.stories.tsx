import type { Meta, StoryObj } from '@storybook/react';
import { DropdownButton } from './DropdownButton';
import { useState } from 'react';

const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const meta: Meta<typeof DropdownButton> = {
  title: 'Components/DropdownButton',
  component: DropdownButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['framed', 'frameless'],
      description: 'Button variant (framed: with border 40px, frameless: no border 28px)',
    },
    size: {
      control: 'radio',
      options: ['large', 'medium'],
      description: 'Button size',
    },
    value: {
      control: 'text',
      description: 'Display value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder when no value',
    },
    open: {
      control: 'boolean',
      description: 'Whether dropdown is open (arrow rotation)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether button is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownButton>;

/**
 * Framed variant (default, with border, 40px)
 */
export const Framed: Story = {
  args: {
    variant: 'framed',
    value: 'Option 1',
  },
};

/**
 * Frameless variant (no border, 28px)
 */
export const Frameless: Story = {
  args: {
    variant: 'frameless',
    value: 'Option 1',
  },
};

/**
 * With placeholder
 */
export const WithPlaceholder: Story = {
  args: {
    variant: 'framed',
    placeholder: 'Please select...',
  },
};

/**
 * With icon
 */
export const WithIcon: Story = {
  args: {
    variant: 'framed',
    icon: <CardIcon />,
    value: 'Option 1',
  },
};

/**
 * Open state
 */
export const OpenState: Story = {
  args: {
    variant: 'framed',
    value: 'Option 1',
    open: true,
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    variant: 'framed',
    value: 'Option 1',
    disabled: true,
  },
};

/**
 * Error state
 */
export const Error: Story = {
  args: {
    variant: 'framed',
    value: 'Option 1',
    error: true,
  },
};

/**
 * All states comparison - Framed
 */
export const FramedStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '240px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Default</div>
        <DropdownButton variant="framed" value="Option 1" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Hover (hover over button)</div>
        <DropdownButton variant="framed" value="Option 1" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Open (Active)</div>
        <DropdownButton variant="framed" value="Option 1" open />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Error</div>
        <DropdownButton variant="framed" value="Option 1" error />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Disabled</div>
        <DropdownButton variant="framed" value="Option 1" disabled />
      </div>
    </div>
  ),
};

/**
 * All states comparison - Frameless
 */
export const FramelessStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Default</div>
        <DropdownButton variant="frameless" value="Option 1" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Hover</div>
        <DropdownButton variant="frameless" value="Option 1" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Open</div>
        <DropdownButton variant="frameless" value="Option 1" open />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Disabled</div>
        <DropdownButton variant="frameless" value="Option 1" disabled />
      </div>
    </div>
  ),
};

/**
 * With icon examples
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '240px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Framed with Icon</div>
        <DropdownButton variant="framed" icon={<CardIcon />} value="Option 1" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Frameless with Icon</div>
        <DropdownButton variant="frameless" icon={<CardIcon />} value="Option 1" />
      </div>
    </div>
  ),
};

/**
 * Interactive example
 */
export const Interactive: Story = {
  render: () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '240px' }}>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Framed (Large 40px)
          </div>
          <DropdownButton
            variant="framed"
            value="Option 1"
            open={open1}
            onClick={() => setOpen1(!open1)}
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
            Click to toggle arrow: {open1 ? 'Open' : 'Closed'}
          </div>
        </div>

        <div>
          <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Frameless (Medium 28px)
          </div>
          <DropdownButton
            variant="frameless"
            icon={<CardIcon />}
            value="Option 2"
            open={open2}
            onClick={() => setOpen2(!open2)}
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
            Click to toggle arrow: {open2 ? 'Open' : 'Closed'}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Comparison of framed vs frameless
 */
export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div>
        <div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Framed (Large 40px)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '240px' }}>
          <DropdownButton variant="framed" placeholder="Select option..." />
          <DropdownButton variant="framed" value="Selected" />
          <DropdownButton variant="framed" icon={<CardIcon />} value="With Icon" />
          <DropdownButton variant="framed" value="Open" open />
          <DropdownButton variant="framed" value="Disabled" disabled />
          <DropdownButton variant="framed" value="Error" error />
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Frameless (Medium 28px)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '200px' }}>
          <DropdownButton variant="frameless" placeholder="Select..." />
          <DropdownButton variant="frameless" value="Selected" />
          <DropdownButton variant="frameless" icon={<CardIcon />} value="With Icon" />
          <DropdownButton variant="frameless" value="Open" open />
          <DropdownButton variant="frameless" value="Disabled" disabled />
        </div>
      </div>
    </div>
  ),
};

