import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';
import { useState } from 'react';

const CustomSearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
    <path d="M13 13L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['medium', 'large'],
      description: 'SearchInput size (only medium and large)',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show the clear button when input has value',
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
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    size: 'large',
    clearable: true,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <SearchInput {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Medium (32px)</div>
        <SearchInput size="large" placeholder="Search large..." />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
          ExtraLarge (40px)
        </div>
        <SearchInput size="extraLarge" placeholder="Search extra large..." />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Default</div>
        <SearchInput placeholder="Default state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
          Hover (hover over input)
        </div>
        <SearchInput placeholder="Hover state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
          Active (click to focus)
        </div>
        <SearchInput placeholder="Active state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
          With value (clearable)
        </div>
        <SearchInput defaultValue="Search content" placeholder="With value" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Error</div>
        <SearchInput error placeholder="Error state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Disabled</div>
        <SearchInput disabled placeholder="Disabled state" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>ReadOnly</div>
        <SearchInput readOnly value="ReadOnly value" />
      </div>
    </div>
  ),
};

const ControlledComponent = () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: '300px' }}>
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        placeholder="Controlled search input..."
      />
      <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
        Current value: {value || '(empty)'}
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledComponent />,
};

export const WithoutClearButton: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <SearchInput
        clearable={false}
        defaultValue="Cannot be cleared"
        placeholder="Search without clear..."
      />
    </div>
  ),
};

export const CustomSearchIconExample: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <SearchInput searchIcon={<CustomSearchIcon />} placeholder="Custom search icon..." />
    </div>
  ),
};

const WithCallbackComponent = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      setSearchHistory([...searchHistory, value]);
      setValue('');
    }
  };

  const handleClear = () => {
    setValue('');
    console.log('Search cleared');
  };

  return (
    <div style={{ width: '300px' }}>
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={handleClear}
        onKeyDown={handleSearch}
        placeholder="Press Enter to search..."
      />
      {searchHistory.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
            Search History:
          </div>
          <ul style={{ fontSize: '12px', color: '#333', paddingLeft: '20px', margin: 0 }}>
            {searchHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const WithCallback: Story = {
  render: () => <WithCallbackComponent />,
};

export const AllSizesWithStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Large (32px)</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <SearchInput size="large" placeholder="Default" style={{ width: '180px' }} />
          <SearchInput size="large" defaultValue="Active" style={{ width: '180px' }} />
          <SearchInput size="large" error placeholder="Error" style={{ width: '180px' }} />
          <SearchInput size="large" disabled placeholder="Disabled" style={{ width: '180px' }} />
          <SearchInput size="large" readOnly value="ReadOnly" style={{ width: '180px' }} />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          ExtraLarge (40px)
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <SearchInput size="extraLarge" placeholder="Default" style={{ width: '180px' }} />
          <SearchInput size="extraLarge" defaultValue="Active" style={{ width: '180px' }} />
          <SearchInput size="extraLarge" error placeholder="Error" style={{ width: '180px' }} />
          <SearchInput
            size="extraLarge"
            disabled
            placeholder="Disabled"
            style={{ width: '180px' }}
          />
          <SearchInput size="extraLarge" readOnly value="ReadOnly" style={{ width: '180px' }} />
        </div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    placeholder: 'Search playground...',
    size: 'large',
    clearable: true,
    error: false,
    disabled: false,
    readOnly: false,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <SearchInput {...args} />
    </div>
  ),
};
