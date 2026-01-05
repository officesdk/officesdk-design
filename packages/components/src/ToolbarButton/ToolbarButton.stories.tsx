import type { Meta, StoryObj } from '@storybook/react';
import { ToolbarButton } from './ToolbarButton';

const FormatPaintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M14.2099 5.37879V4H5V7.84089L14.2099 7.84091V6.46212H14.9051V9.12121L9.43182 9.1212V11.3864H8.47594V17H11.2567V11.3864H10.4167V10.2045L16 10.2045V5.37879H14.2099Z"
      fill="#41464B"
    />
  </svg>
);

const meta: Meta<typeof ToolbarButton> = {
  title: 'Components/ToolbarButton',
  component: ToolbarButton,
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    active: {
      control: 'boolean',
      description: 'Whether the button is in active state',
    },
    hasDropdown: {
      control: 'boolean',
      description: 'Whether to show dropdown arrow',
    },
    splitDropdown: {
      control: 'boolean',
      description: 'Whether the dropdown section is clickable separately',
    },
    onClick: {
      action: 'clicked',
    },
    onDropdownClick: {
      action: 'dropdown clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToolbarButton>;

export const Default: Story = {
  args: {
    icon: <FormatPaintIcon />,
  },
};

export const DoubleClickArea: Story = {
  name: 'Double Click Area (Icon + Label + Dropdown)',
  render: (args) => (
    <div style={{ display: 'flex', gap: '24px', padding: '20px', background: '#f9f9f9' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Default</div>
          <ToolbarButton
            icon={<FormatPaintIcon />}
            label="Dropdown"
            hasDropdown
            splitDropdown
            onClick={args.onClick}
            onDropdownClick={args.onDropdownClick}
          />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Hover</div>
          <ToolbarButton
            icon={<FormatPaintIcon />}
            label="Dropdown"
            hasDropdown
            splitDropdown
            onClick={args.onClick}
            onDropdownClick={args.onDropdownClick}
          />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Active</div>
        <ToolbarButton
          icon={<FormatPaintIcon />}
          label="Dropdown"
          hasDropdown
          splitDropdown
          active
          onClick={args.onClick}
          onDropdownClick={args.onDropdownClick}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Click</div>
          <ToolbarButton
            icon={<FormatPaintIcon />}
            label="Dropdown"
            hasDropdown
            splitDropdown
            onClick={args.onClick}
            onDropdownClick={args.onDropdownClick}
          />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Disabled</div>
        <ToolbarButton
          icon={<FormatPaintIcon />}
          label="Dropdown"
          hasDropdown
          splitDropdown
          disabled
          onClick={args.onClick}
          onDropdownClick={args.onDropdownClick}
        />
      </div>
    </div>
  ),
};

export const SingleClickArea: Story = {
  name: 'Single Click Area (Icon Only + Dropdown)',
  render: (args) => (
    <div style={{ display: 'flex', gap: '24px', padding: '20px', background: '#f9f9f9' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Default</div>
        <ToolbarButton icon={<FormatPaintIcon />} hasDropdown onClick={args.onClick} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Hover</div>
        <ToolbarButton icon={<FormatPaintIcon />} hasDropdown onClick={args.onClick} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Active</div>
        <ToolbarButton icon={<FormatPaintIcon />} hasDropdown active onClick={args.onClick} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Click</div>
        <ToolbarButton icon={<FormatPaintIcon />} hasDropdown onClick={args.onClick} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Disabled</div>
        <ToolbarButton icon={<FormatPaintIcon />} hasDropdown disabled onClick={args.onClick} />
      </div>
    </div>
  ),
};


export const IconOnly: Story = {
  args: {
    icon: <FormatPaintIcon />,
  },
};

export const WithLabel: Story = {
  args: {
    icon: <FormatPaintIcon />,
    label: 'Format',
  },
};

export const WithDropdown: Story = {
  args: {
    icon: <FormatPaintIcon />,
    label: 'Format',
    hasDropdown: true,
  },
};

export const Playground: Story = {
  args: {
    icon: <FormatPaintIcon />,
    label: 'Format',
    hasDropdown: true,
    splitDropdown: false,
    disabled: false,
    active: false,
  },
};
