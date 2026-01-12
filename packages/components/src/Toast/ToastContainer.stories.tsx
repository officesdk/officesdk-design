import type { Meta, StoryObj } from '@storybook/react';
import { ToastContainer, useToast } from './ToastContainer';

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/Toast/ToastContainer',
  component: ToastContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

// Demo component using toast methods
const ToastDemo = () => {
  const toast = useToast();

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
        Toast Methods Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={() => toast.success('Operation completed successfully!', {duration: 3000})}
          style={{
            padding: '10px 16px',
            background: '#4ea44b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Show Success Toast
        </button>

        <button
          onClick={() => toast.info('This is an informational message')}
          style={{
            padding: '10px 16px',
            background: '#5ba0e7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Show Info Toast
        </button>

        <button
          onClick={() => toast.error('An error occurred. Please try again.')}
          style={{
            padding: '10px 16px',
            background: '#e95555',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Show Error Toast
        </button>

        <button
          onClick={() => toast.warn('Warning: This action cannot be undone')}
          style={{
            padding: '10px 16px',
            background: '#ebe361',
            color: '#2c3033',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Show Warning Toast
        </button>

        <button
          onClick={() => {
            const id = toast.loading('Loading data, please wait...');
            setTimeout(() => {
              toast.hideToast(id);
              toast.success('Data loaded successfully!');
            }, 3000);
          }}
          style={{
            padding: '10px 16px',
            background: '#5ba0e7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Show Loading Toast
        </button>

        <button
          onClick={() => toast.info('New update available', {
            mainButtonText: 'Update',
            onMainButtonClick: () => alert('Update clicked!'),
            closable: true,
          })}
          style={{
            padding: '10px 16px',
            background: '#41464b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Show Toast with Action
        </button>

        <button
          onClick={() => {
            toast.success('First toast');
            setTimeout(() => toast.info('Second toast'), 200);
            setTimeout(() => toast.warn('Third toast'), 400);
            setTimeout(() => toast.error('Fourth toast'), 600);
            setTimeout(() => toast.loading('Fifth toast'), 800);
          }}
          style={{
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Show Multiple Toasts
        </button>
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#f9f9f9', borderRadius: '4px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
          Usage Example:
        </h3>
        <pre style={{ fontSize: '12px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`import { useToast } from '@officesdk/design';

const MyComponent = () => {
  const toast = useToast();

  const handleClick = () => {
    toast.success('Success!');
    toast.info('Info message');
    toast.error('Error message');
    toast.warn('Warning message');
    toast.loading('Loading...');

    // With options
    toast.info('Update available', {
      mainButtonText: 'Update',
      onMainButtonClick: () => console.log('Update'),
      closable: true,
      duration: 5000,
    });
  };

  return <button onClick={handleClick}>Show Toast</button>;
};`}
        </pre>
      </div>
    </div>
  );
};

// Basic usage
export const Default: Story = {
  render: () => (
    <ToastContainer>
      <ToastDemo />
    </ToastContainer>
  ),
};

// With custom settings
export const CustomSettings: Story = {
  render: () => (
    <ToastContainer maxCount={3} defaultDuration={5000}>
      <div style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>
          Custom Settings (Max 3 toasts, 5s duration)
        </h2>
        <ToastDemo />
      </div>
    </ToastContainer>
  ),
};

// Multiple toasts example
export const MultipleToasts: Story = {
  render: () => {
    const DemoComponent = () => {
      const toast = useToast();

      const showMultiple = () => {
        toast.success('Task 1 completed');
        setTimeout(() => toast.success('Task 2 completed'), 300);
        setTimeout(() => toast.success('Task 3 completed'), 600);
        setTimeout(() => toast.info('All tasks completed!'), 900);
      };

      return (
        <div style={{ padding: '40px' }}>
          <button
            onClick={showMultiple}
            style={{
              padding: '12px 24px',
              background: '#5ba0e7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Show Multiple Toasts
          </button>
        </div>
      );
    };

    return (
      <ToastContainer>
        <DemoComponent />
      </ToastContainer>
    );
  },
};

// Placement examples
export const Placement: Story = {
  render: () => {
    const placements: Array<'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'> = [
      'top-right',
      'top-left',
      'top-center',
      'bottom-right',
      'bottom-left',
      'bottom-center',
    ];

    return (
      <div style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>
          Toast Placement Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {placements.map((placement) => {
            const DemoComponent = () => {
              const toast = useToast();
              return (
                <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
                    {placement}
                  </h3>
                  <button
                    onClick={() => toast.info(`Toast positioned at ${placement}`)}
                    style={{
                      padding: '8px 16px',
                      background: '#5ba0e7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    Show Toast
                  </button>
                </div>
              );
            };

            return (
              <ToastContainer key={placement} placement={placement}>
                <DemoComponent />
              </ToastContainer>
            );
          })}
        </div>
      </div>
    );
  },
};

