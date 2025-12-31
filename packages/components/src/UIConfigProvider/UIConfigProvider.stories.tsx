import type { Meta, StoryObj } from '@storybook/react';
import { UIConfigProvider, useUIConfig, createUIConfig } from './index';
import { useToast } from '../Toast/ToastContainer';
import { lightTheme } from '../../../theme/src';
import { iconRegistry } from '../../../icons/src';
import { Button } from '../Button';

const meta: Meta<typeof UIConfigProvider> = {
  title: 'Components/UIConfigProvider',
  component: UIConfigProvider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UIConfigProvider>;

// Demo component showing all features
const DemoComponent = () => {
  const toast = useToast();
  const config = useUIConfig();

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '24px' }}>
        UIConfigProvider Demo
      </h1>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
          Current Configuration
        </h2>
        <div style={{ background: '#f9f9f9', padding: '16px', borderRadius: '8px', fontSize: '14px' }}>
          <div><strong>Locale:</strong> {config.locale}</div>
          <div><strong>Toast Duration:</strong> {config.toast?.defaultDuration}ms</div>
          <div><strong>Toast Max Count:</strong> {config.toast?.maxCount}</div>
          <div><strong>Animation Duration:</strong> {config.animation?.duration}ms</div>
          <div><strong>Animation Easing:</strong> {config.animation?.easing}</div>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
          Toast Methods
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button onClick={() => toast.success('Success!')}>
            Success Toast
          </Button>
          <Button onClick={() => toast.info('Information')}>
            Info Toast
          </Button>
          <Button onClick={() => toast.error('Error occurred')}>
            Error Toast
          </Button>
          <Button onClick={() => toast.warn('Warning!')}>
            Warning Toast
          </Button>
          <Button onClick={() => toast.info('With action', {
            actionText: 'Action',
            onAction: () => alert('Action clicked!'),
            closable: true,
          })}>
            Toast with Action
          </Button>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
          Usage Example
        </h2>
        <pre style={{
          background: '#2c3033',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '13px',
          overflow: 'auto',
        }}>
{`import { UIConfigProvider, createUIConfig } from '@officesdk/design';
import { lightTheme } from '@officesdk/design/theme';
import { iconRegistry } from '@officesdk/design/icons';

const config = createUIConfig({
  theme: lightTheme,
  icons: iconRegistry,
  toast: {
    defaultDuration: 3000,
    maxCount: 5,
    position: 'top-right',
  },
  locale: 'zh-CN',
});

<UIConfigProvider config={config}>
  <App />
</UIConfigProvider>`}
        </pre>
      </div>
    </div>
  );
};

// Basic usage
export const Default: Story = {
  render: () => {
    const config = createUIConfig({
      theme: lightTheme,
      icons: iconRegistry,
      toast: {
        defaultDuration: 3000,
        maxCount: 5,
      },
    });

    return (
      <UIConfigProvider config={config}>
        <DemoComponent />
      </UIConfigProvider>
    );
  },
};

// Custom toast duration
export const CustomToastDuration: Story = {
  render: () => {
    const config = createUIConfig({
      theme: lightTheme,
      icons: iconRegistry,
      toast: {
        defaultDuration: 5000, // 5 seconds
        maxCount: 3,
      },
    });

    return (
      <UIConfigProvider config={config}>
        <div style={{ padding: '40px' }}>
          <h2 style={{ marginBottom: '16px' }}>Custom Toast Duration (5s)</h2>
          <DemoComponent />
        </div>
      </UIConfigProvider>
    );
  },
};

// Minimal configuration
export const MinimalConfig: Story = {
  render: () => {
    const config = {
      theme: lightTheme,
    };

    return (
      <UIConfigProvider config={config}>
        <div style={{ padding: '40px' }}>
          <h2 style={{ marginBottom: '16px' }}>Minimal Configuration (Only Theme)</h2>
          <DemoComponent />
        </div>
      </UIConfigProvider>
    );
  },
};

