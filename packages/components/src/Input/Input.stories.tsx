import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14L11.1 11.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4L4 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 4L12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large', 'extraLarge'],
      description: 'Input size',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Default placeholder',
    size: 'medium',
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Input {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Small (24px)</div>
        <Input size="small" placeholder="Small input" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Medium (32px)</div>
        <Input size="medium" placeholder="Medium input" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Large (32px)</div>
        <Input size="large" placeholder="Large input" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
          ExtraLarge (40px)
        </div>
        <Input size="extraLarge" placeholder="ExtraLarge input" />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Default</div>
        <Input placeholder="Default state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
          Hover (hover over input)
        </div>
        <Input placeholder="Hover state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
          Active (click to focus)
        </div>
        <Input placeholder="Active state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Error</div>
        <Input error placeholder="Error state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Disabled</div>
        <Input disabled placeholder="Disabled state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>ReadOnly</div>
        <Input readOnly value="ReadOnly value" />
      </div>
    </div>
  ),
};

const WithValueComponent = () => {
  const [value, setValue] = useState('Input content');
  return (
    <div style={{ width: '300px' }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
};

export const WithValue: Story = {
  render: () => <WithValueComponent />,
};

export const WithPrefixNode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>With search icon</div>
        <Input prefixNode={<SearchIcon />} placeholder="Search..." />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>With text prefix</div>
        <Input prefixNode={<span style={{ color: '#999' }}>Type:</span>} placeholder="Enter type" />
      </div>
    </div>
  ),
};

const WithSuffixNodeComponent = () => {
  const [value, setValue] = useState('Some content');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
          With clear button
        </div>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          suffixNode={
            value ? (
              <button
                onClick={() => setValue('')}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CloseIcon />
              </button>
            ) : null
          }
          placeholder="Type something..."
        />
      </div>
    </div>
  );
};

export const WithSuffixNode: Story = {
  render: () => <WithSuffixNodeComponent />,
};

const WithBothNodesComponent = () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: '300px' }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        prefixNode={<SearchIcon />}
        suffixNode={
          value ? (
            <button
              onClick={() => setValue('')}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CloseIcon />
            </button>
          ) : null
        }
        placeholder="Search with clear..."
      />
    </div>
  );
};

export const WithBothNodes: Story = {
  render: () => <WithBothNodesComponent />,
};

export const AllSizesWithStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>small (20px)</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Input size="small" placeholder="Default" style={{ width: '180px' }} />
          <Input size="small" placeholder="Active" style={{ width: '180px' }} />
          <Input size="small" error placeholder="Error" style={{ width: '180px' }} />
          <Input size="small" disabled placeholder="Disabled" style={{ width: '180px' }} />
          <Input size="small" readOnly value="ReadOnly" style={{ width: '180px' }} />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>medium (24px)</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Input size="medium" placeholder="Default" style={{ width: '180px' }} />
          <Input size="medium" placeholder="Active" style={{ width: '180px' }} />
          <Input size="medium" error placeholder="Error" style={{ width: '180px' }} />
          <Input size="medium" disabled placeholder="Disabled" style={{ width: '180px' }} />
          <Input size="medium" readOnly value="ReadOnly" style={{ width: '180px' }} />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>large (32px)</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Input size="large" placeholder="Default" style={{ width: '180px' }} />
          <Input size="large" placeholder="Active" style={{ width: '180px' }} />
          <Input size="large" error placeholder="Error" style={{ width: '180px' }} />
          <Input size="large" disabled placeholder="Disabled" style={{ width: '180px' }} />
          <Input size="large" readOnly value="ReadOnly" style={{ width: '180px' }} />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          extraLarge (40px)
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Input size="extraLarge" placeholder="Default" style={{ width: '180px' }} />
          <Input size="extraLarge" placeholder="Active" style={{ width: '180px' }} />
          <Input size="extraLarge" error placeholder="Error" style={{ width: '180px' }} />
          <Input size="extraLarge" disabled placeholder="Disabled" style={{ width: '180px' }} />
          <Input size="extraLarge" readOnly value="ReadOnly" style={{ width: '180px' }} />
        </div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    placeholder: 'Playground input',
    size: 'medium',
    error: false,
    disabled: false,
    readOnly: false,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Input {...args} />
    </div>
  ),
};
