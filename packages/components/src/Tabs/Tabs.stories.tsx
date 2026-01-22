import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { useState } from 'react';

// Icon components for demonstration
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6L8 2L14 6V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 14V9H10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 2V3M8 13V14M14 8H13M3 8H2M12.5 3.5L11.8 4.2M4.2 11.8L3.5 12.5M12.5 12.5L11.8 11.8M4.2 4.2L3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['line', 'card'],
      description: 'Tab variant style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const defaultItems = [
  { key: '1', label: 'Tab 1' },
  { key: '2', label: 'Tab 2' },
  { key: '3', label: 'Tab 3' },
];

// Line variant
export const Line: Story = {
  args: {
    items: defaultItems,
    variant: 'line',
    defaultActiveKey: '1',
  },
};

// Long label line
export const LongLabelLine: Story = {
  args: {
    items: [
      { key: '1', label: 'Enabled Tab with a long label should be truncated' },
      { key: '2', label: 'Another Tab' },
      { key: '3', label: 'Another Tab' },
    ],
    variant: 'line',
    defaultActiveKey: '1',
  },
};

export const LongLabelCard: Story = {
  args: {
    items: [
      { key: '1', label: 'Enabled Tab with a long label should be truncated' },
      { key: '2', label: 'Another Tab' },
      { key: '3', label: 'Another Tab' },
    ],
    variant: 'card',
    defaultActiveKey: '1',
  },
};

// Card variant
export const Card: Story = {
  args: {
    items: defaultItems,
    variant: 'card',
    defaultActiveKey: '1',
  },
};

// With disabled tab
export const WithDisabled: Story = {
  args: {
    items: [
      { key: '1', label: 'Enabled Tab ' },
      { key: '2', label: 'Disabled Tab', disabled: true },
      { key: '3', label: 'Another Tab' },
    ],
    variant: 'line',
    defaultActiveKey: '1',
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    items: [
      { key: '1', label: 'Home', icon: <HomeIcon /> },
      { key: '2', label: 'Profile', icon: <UserIcon /> },
      { key: '3', label: 'Settings', icon: <SettingsIcon /> },
    ],
    variant: 'line',
    defaultActiveKey: '1',
  },
};

// With icons (Card variant)
export const WithIconsCard: Story = {
  args: {
    items: [
      { key: '1', label: 'Home', icon: <HomeIcon /> },
      { key: '2', label: 'Profile', icon: <UserIcon /> },
      { key: '3', label: 'Settings', icon: <SettingsIcon /> },
    ],
    variant: 'card',
    defaultActiveKey: '1',
  },
};

// With icons and long labels
export const WithIconsLongLabel: Story = {
  args: {
    items: [
      { key: '1', label: 'Home Dashboard with very long label', icon: <HomeIcon /> },
      { key: '2', label: 'User Profile Settings', icon: <UserIcon /> },
      { key: '3', label: 'Settings', icon: <SettingsIcon /> },
    ],
    variant: 'line',
    defaultActiveKey: '1',
  },
};

// Controlled mode
export const Controlled: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState('1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Tabs
          items={defaultItems}
          variant="line"
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
        />
        <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '4px' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
            Current Active: <strong>{activeKey}</strong>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {defaultItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveKey(item.key)}
                style={{
                  padding: '4px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: activeKey === item.key ? '#5ba0e7' : 'white',
                  color: activeKey === item.key ? 'white' : '#333',
                }}
              >
                Set to {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// Many tabs
export const ManyTabs: Story = {
  args: {
    items: Array.from({ length: 8 }, (_, i) => ({
      key: `${i + 1}`,
      label: `Tab ${i + 1}`,
    })),
    variant: 'line',
    defaultActiveKey: '1',
  },
};

// All variants showcase
export const AllVariantsShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
          Line Variant
        </h3>
        <Tabs
          items={defaultItems}
          variant="line"
          defaultActiveKey="1"
        />
        <div style={{ marginTop: '16px', padding: '16px', background: '#f9f9f9', borderRadius: '4px' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Line variant with bottom border indicator
          </p>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
          Card Variant
        </h3>
        <Tabs
          items={defaultItems}
          variant="card"
          defaultActiveKey="1"
        />
        <div style={{ marginTop: '16px', padding: '16px', background: '#f9f9f9', borderRadius: '4px' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Card variant with background and border
          </p>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
          With Disabled Tabs
        </h3>
        <Tabs
          items={[
            { key: '1', label: 'Active Tab' },
            { key: '2', label: 'Disabled Tab', disabled: true },
            { key: '3', label: 'Normal Tab' },
            { key: '4', label: 'Another Disabled', disabled: true },
          ]}
          variant="line"
          defaultActiveKey="1"
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
          Line vs Card Comparison
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>Line</h4>
            <Tabs items={defaultItems} variant="line" defaultActiveKey="2" />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>Card</h4>
            <Tabs items={defaultItems} variant="card" defaultActiveKey="2" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

