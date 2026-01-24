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
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

// ==================== Basic Examples (with Controls) ====================

export const Default: Story = {
  args: {
    size: 'medium',
    spinning: true,
  },
};

export const WithTip: Story = {
  args: {
    size: 'large',
    tip: 'Loading...',
    spinning: true,
  },
};

export const WithDelay: Story = {
  args: {
    size: 'large',
    spinning: true,
    delay: 500,
    tip: 'Loading with delay...',
  },
};

export const Fullscreen: Story = {
  args: {
    size: 'large',
    spinning: true,
    fullscreen: true,
    tip: 'Loading fullscreen...',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// ==================== Size Comparison ====================

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <Loading size="small" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Small (16px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loading size="medium" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Medium (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loading size="large" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Large (32px)</p>
      </div>
    </div>
  ),
};

// ==================== Interactive Demos ====================

export const SpinningControl: Story = {
  render: (args) => {
    const [spinning, setSpinning] = React.useState(args.spinning ?? true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <button
          onClick={() => setSpinning(!spinning)}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #d9d9d9',
            background: '#fff',
          }}
        >
          {spinning ? 'Stop Loading' : 'Start Loading'}
        </button>
        <Loading {...args} spinning={spinning} />
      </div>
    );
  },
  args: {
    size: 'large',
    spinning: true,
    tip: 'Loading...',
  },
};

// ==================== Wrapper Mode ====================

export const WrapperMode: Story = {
  render: (args) => {
    const [spinning, setSpinning] = React.useState(args.spinning ?? true);

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => setSpinning(!spinning)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              background: '#fff',
            }}
          >
            Toggle Loading
          </button>
        </div>
        <Loading {...args} spinning={spinning}>
          <div
            style={{
              padding: '24px',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              background: '#fff',
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Content Title</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
              This is some content that will be covered by the loading overlay when spinning is
              true. The content becomes semi-transparent and non-interactive during loading.
            </p>
          </div>
        </Loading>
      </div>
    );
  },
  args: {
    spinning: true,
    tip: '',
  },
};

export const WrapperModeWithTip: Story = {
  render: (args) => {
    const [spinning, setSpinning] = React.useState(args.spinning ?? true);

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => setSpinning(!spinning)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              background: '#fff',
            }}
          >
            Toggle Loading
          </button>
        </div>
        <Loading {...args} spinning={spinning}>
          <div
            style={{
              padding: '24px',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              background: '#fff',
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Content Title</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
              Loading wrapper with tip text. The tip will be displayed below the loading indicator.
            </p>
          </div>
        </Loading>
      </div>
    );
  },
  args: {
    spinning: true,
    tip: 'Loading content...',
  },
};

// ==================== Custom Indicators ====================

// Custom CSS Spinner Component
const CSSSpinner: React.FC<{ size?: number }> = ({ size = 24 }) => {
  const borderWidth = Math.max(2, Math.round(size / 12));

  return (
    <>
      <style>
        {`
          @keyframes css-loading-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        style={{
          display: 'inline-block',
          width: `${size}px`,
          height: `${size}px`,
          border: `${borderWidth}px solid rgba(0, 0, 0, 0.1)`,
          borderTopColor: '#1890ff',
          borderRadius: '50%',
          animation: 'css-loading-spin 1s linear infinite',
          boxSizing: 'border-box',
        }}
        role="status"
        aria-label="Loading"
      />
    </>
  );
};

// Custom Emoji Spinner Component
const EmojiSpinner = () => (
  <>
    <style>
      {`
        @keyframes emoji-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
    </style>
    <span
      style={{
        display: 'inline-block',
        fontSize: '24px',
        animation: 'emoji-spin 1s linear infinite',
      }}
    >
      ⏳
    </span>
  </>
);

export const CustomCSSIndicator: Story = {
  name: 'Custom Indicator - CSS Animation',
  render: (args) => {
    const [spinning, setSpinning] = React.useState(args.spinning ?? true);
    const sizeMap = { small: 16, medium: 24, large: 32 };
    const indicatorSize = sizeMap[args.size || 'medium'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <button
            onClick={() => setSpinning(!spinning)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              background: '#fff',
            }}
          >
            {spinning ? 'Stop Loading' : 'Start Loading'}
          </button>
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>All Sizes</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <Loading size="small" spinning={spinning} indicator={<CSSSpinner size={16} />} />
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Small</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Loading size="medium" spinning={spinning} indicator={<CSSSpinner size={24} />} />
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Medium</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Loading size="large" spinning={spinning} indicator={<CSSSpinner size={32} />} />
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Large</p>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>
            Controllable (use Controls panel)
          </h4>
          <Loading {...args} spinning={spinning} indicator={<CSSSpinner size={indicatorSize} />} />
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>Wrapper Mode</h4>
          <div style={{ width: '400px' }}>
            <Loading spinning={spinning} tip="Loading content..." indicator={<CSSSpinner size={24} />}>
              <div
                style={{
                  padding: '24px',
                  border: '1px solid #e8e8e8',
                  borderRadius: '8px',
                  background: '#fff',
                }}
              >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Content Title</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  Content with custom CSS animation indicator.
                </p>
              </div>
            </Loading>
          </div>
        </div>
      </div>
    );
  },
  args: {
    size: 'large',
    spinning: true,
    tip: 'Loading with CSS animation...',
  },
  parameters: {
    layout: 'padded',
  },
};

export const CustomEmojiIndicator: Story = {
  name: 'Custom Indicator - Emoji',
  render: (args) => {
    const [spinning, setSpinning] = React.useState(args.spinning ?? true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <button
            onClick={() => setSpinning(!spinning)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              background: '#fff',
            }}
          >
            {spinning ? 'Stop Loading' : 'Start Loading'}
          </button>
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>
            Controllable (use Controls panel)
          </h4>
          <Loading {...args} spinning={spinning} indicator={<EmojiSpinner />} />
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>Wrapper Mode</h4>
          <div style={{ width: '400px' }}>
            <Loading spinning={spinning} tip="Loading content..." indicator={<EmojiSpinner />}>
              <div
                style={{
                  padding: '24px',
                  border: '1px solid #e8e8e8',
                  borderRadius: '8px',
                  background: '#fff',
                }}
              >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Content Title</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  Content with custom emoji indicator (⏳).
                </p>
              </div>
            </Loading>
          </div>
        </div>
      </div>
    );
  },
  args: {
    size: 'large',
    spinning: true,
    tip: 'Loading with emoji...',
  },
  parameters: {
    layout: 'padded',
  },
};

// ==================== Indicator as URL String ====================

export const CustomURLIndicator: Story = {
  name: 'Custom Indicator - URL String',
  render: (args) => {
    const [spinning, setSpinning] = React.useState(args.spinning ?? true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <button
            onClick={() => setSpinning(!spinning)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              background: '#fff',
            }}
          >
            {spinning ? 'Stop Loading' : 'Start Loading'}
          </button>
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>
            Using URL String as Indicator
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#666' }}>
            Pass a URL string to the indicator prop to use a custom image.
          </p>
          <Loading
            {...args}
            spinning={spinning}
            indicator="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>Wrapper Mode</h4>
          <div style={{ width: '400px' }}>
            <Loading
              spinning={spinning}
              tip="Loading content..."
              indicator="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            >
              <div
                style={{
                  padding: '24px',
                  border: '1px solid #e8e8e8',
                  borderRadius: '8px',
                  background: '#fff',
                }}
              >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Content Title</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  Content with custom URL indicator.
                </p>
              </div>
            </Loading>
          </div>
        </div>
      </div>
    );
  },
  args: {
    size: 'large',
    spinning: true,
    tip: 'Loading with custom URL...',
  },
  parameters: {
    layout: 'padded',
  },
};

// ==================== className Prop ====================

export const WithClassName: Story = {
  name: 'With Custom className',
  render: (args) => {
    const [spinning, setSpinning] = React.useState(args.spinning ?? true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <style>
          {`
            .custom-loading-container {
              padding: 24px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 12px;
            }
            .custom-loading-wrapper {
              border: 2px dashed #1890ff;
              border-radius: 8px;
            }
          `}
        </style>

        <div>
          <button
            onClick={() => setSpinning(!spinning)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              background: '#fff',
            }}
          >
            {spinning ? 'Stop Loading' : 'Start Loading'}
          </button>
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>
            Standalone with className
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#666' }}>
            The className prop allows you to add custom styles to the loading container.
          </p>
          <Loading {...args} spinning={spinning} className="custom-loading-container" />
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>
            Wrapper Mode with className
          </h4>
          <div style={{ width: '400px' }}>
            <Loading spinning={spinning} tip="Loading..." className="custom-loading-wrapper">
              <div
                style={{
                  padding: '24px',
                  background: '#fff',
                }}
              >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Content Title</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  Content wrapped with custom className applied to the wrapper.
                </p>
              </div>
            </Loading>
          </div>
        </div>
      </div>
    );
  },
  args: {
    size: 'large',
    spinning: true,
    tip: 'Custom styled loading...',
  },
  parameters: {
    layout: 'padded',
  },
};

// ==================== Tip as ReactNode ====================

// Custom tip component with icon
const TipWithIcon: React.FC<{ text: string }> = ({ text }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
    {text}
  </span>
);

// Custom tip with progress
const TipWithProgress: React.FC<{ progress: number }> = ({ progress }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <span>Loading... {progress}%</span>
    <div
      style={{
        width: '120px',
        height: '4px',
        background: '#e8e8e8',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          background: '#1890ff',
          transition: 'width 0.3s',
        }}
      />
    </div>
  </div>
);

export const TipAsReactNode: Story = {
  name: 'Tip as ReactNode',
  render: (args) => {
    const [spinning, setSpinning] = React.useState(args.spinning ?? true);
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      if (spinning) {
        const timer = setInterval(() => {
          setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
        }, 500);
        return () => clearInterval(timer);
      } else {
        setProgress(0);
      }
    }, [spinning]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <button
            onClick={() => setSpinning(!spinning)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              background: '#fff',
            }}
          >
            {spinning ? 'Stop Loading' : 'Start Loading'}
          </button>
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>Tip with Icon</h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#666' }}>
            The tip prop accepts ReactNode, allowing custom elements like icons.
          </p>
          <Loading {...args} spinning={spinning} tip={<TipWithIcon text="Please wait..." />} />
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>
            Tip with Progress Bar
          </h4>
          <Loading {...args} spinning={spinning} tip={<TipWithProgress progress={progress} />} />
        </div>

        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600 }}>
            Wrapper Mode with ReactNode Tip
          </h4>
          <div style={{ width: '400px' }}>
            <Loading spinning={spinning} tip={<TipWithIcon text="Loading content..." />}>
              <div
                style={{
                  padding: '24px',
                  border: '1px solid #e8e8e8',
                  borderRadius: '8px',
                  background: '#fff',
                }}
              >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Content Title</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  Content with ReactNode tip containing an icon.
                </p>
              </div>
            </Loading>
          </div>
        </div>
      </div>
    );
  },
  args: {
    size: 'large',
    spinning: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// ==================== Showcase ====================

export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '32px' }}>
      <div>
        <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', fontWeight: 600 }}>
          Loading Component Showcase
        </h2>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>
          Default GIF Indicators
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            padding: '24px',
            background: '#fafafa',
            borderRadius: '8px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Loading size="small" />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Small</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Loading size="medium" />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Medium</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Loading size="large" />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Large</p>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>
          Custom CSS Indicators
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            padding: '24px',
            background: '#fafafa',
            borderRadius: '8px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Loading size="small" indicator={<CSSSpinner size={16} />} />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Small</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Loading size="medium" indicator={<CSSSpinner size={24} />} />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Medium</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Loading size="large" indicator={<CSSSpinner size={32} />} />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>Large</p>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>
          Usage Guidelines
        </h3>
        <div
          style={{
            padding: '24px',
            background: '#fafafa',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.8',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>
              <strong>Large (32px)</strong>: Full page loading, important operations
            </li>
            <li>
              <strong>Medium (24px)</strong>: List/table refresh, section loading
            </li>
            <li>
              <strong>Small (16px)</strong>: Inline loading, dropdown refresh, button loading
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
