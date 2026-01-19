import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the loading indicator',
    },
    spinning: {
      control: 'boolean',
      description: 'Whether the loading indicator is visible',
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the indicator',
    },
    tip: {
      control: 'text',
      description: 'Tip text displayed below the indicator',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Whether to use fullscreen overlay mode',
    },
    indicator: {
      control: 'text',
      description: 'Custom loading indicator (image URL or React element)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

// ========== Basic Loading ==========
export const Default: Story = {
  args: {
    size: 'medium',
    spinning: true,
  },
};

// ========== Size Variants ==========
export const Small: Story = {
  args: {
    size: 'small',
    spinning: true,
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    spinning: true,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    spinning: true,
  },
};

// ========== All Sizes ==========
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <Loading size="small" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>16x16</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loading size="medium" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>24x24</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loading size="large" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>32x32</p>
      </div>
    </div>
  ),
};

// ========== With Tip ==========
export const WithTip: Story = {
  args: {
    size: 'large',
    tip: 'Loading...',
    spinning: true,
  },
};

// ========== Wrapper Mode ==========
export const WrapperMode: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(true);

    return (
      <div style={{ width: '300px' }}>
        <div style={{ marginBottom: '16px' }}>
          <button onClick={() => setLoading(!loading)}>Toggle Loading</button>
        </div>
        <Loading spinning={loading}>
          <div
            style={{
              padding: '20px',
              border: '1px solid #eee',
              borderRadius: '4px',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0' }}>Content Title</h3>
            <p style={{ margin: 0, color: '#666' }}>
              This is some content that is being loaded. The loading overlay will appear over this
              content when spinning is true.
            </p>
          </div>
        </Loading>
      </div>
    );
  },
};

// ========== Wrapper Mode with Tip ==========
export const WrapperModeWithTip: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Loading spinning={true} tip="Loading content...">
        <div
          style={{
            padding: '20px',
            border: '1px solid #eee',
            borderRadius: '4px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>Content Title</h3>
          <p style={{ margin: 0, color: '#666' }}>
            This is some content that is being loaded. The loading overlay will appear over this
            content.
          </p>
        </div>
      </Loading>
    </div>
  ),
};

// ========== Delay ==========
export const WithDelay: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <button onClick={() => setLoading(!loading)}>
            {loading ? 'Stop Loading' : 'Start Loading (500ms delay)'}
          </button>
        </div>
        <Loading spinning={loading} delay={500} size="large" tip="Loading with delay..." />
      </div>
    );
  },
};

// ========== Custom Indicator ==========
const SpinningIcon = () => (
  <>
    <style>
      {`
        @keyframes loading-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
    </style>
    <span
      style={{
        display: 'inline-block',
        fontSize: '24px',
        animation: 'loading-spin 1s linear infinite',
      }}
    >
      ⏳
    </span>
  </>
);

export const CustomIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <Loading size="large" indicator={<SpinningIcon />} />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Custom Element</p>
      </div>
    </div>
  ),
};

// ========== Showcase ==========
export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>All Sizes</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            padding: '24px',
            background: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          <Loading size="small" />
          <Loading size="medium" />
          <Loading size="large" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Usage Guidelines</h3>
        <div
          style={{
            padding: '24px',
            background: '#f9f9f9',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.8',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>
              <strong>32x32 (large)</strong>: Use for full page refresh (e.g., admin panel page
              refresh)
            </li>
            <li>
              <strong>24x24 (medium)</strong>: Use for list/table refresh (e.g., file list refresh)
            </li>
            <li>
              <strong>16x16 (small)</strong>: Use for dropdown menu refresh (e.g., search people
              refresh)
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
