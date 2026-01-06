import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { useState } from 'react';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['success', 'info', 'error', 'warn'],
      description: 'Toast variant type',
    },
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    mainButtonText: {
      control: 'text',
      description: 'Main action button text (blue)',
    },
    secondaryButtonText: {
      control: 'text',
      description: 'Secondary action button text (gray)',
    },
    closable: {
      control: 'boolean',
      description: 'Whether to show close button',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show icon',
    },
    duration: {
      control: 'number',
      description: 'Auto close duration in milliseconds (0 to disable)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Basic variants
export const Success: Story = {
  args: {
    variant: 'success',
    message: 'Operation completed successfully!',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    message: 'This is an informational message.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    message: 'An error occurred. Please try again.',
  },
};

export const Warn: Story = {
  args: {
    variant: 'warn',
    message: 'Warning: This action cannot be undone.',
  },
};

// Single line with buttons (Un)
export const SingleLineWithButtons: Story = {
  args: {
    variant: 'success',
    message: '信息反馈',
    mainButtonText: '按钮名称',
    onMainButtonClick: () => alert('Main button clicked!'),
    secondaryButtonText: '按钮名称',
    onSecondaryButtonClick: () => alert('Secondary button clicked!'),
    closable: true,
  },
};

// With close button
export const Closable: Story = {
  args: {
    variant: 'success',
    message: 'File saved successfully',
    closable: true,
  },
};

// Multi-line with description (Deux)
export const MultiLineWithDescription: Story = {
  args: {
    variant: 'success',
    message: '信息反馈',
    description: '信息具体说明',
    mainButtonText: '按钮名称',
    onMainButtonClick: () => alert('Main button clicked!'),
    secondaryButtonText: '按钮名称',
    onSecondaryButtonClick: () => alert('Secondary button clicked!'),
    closable: true,
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    message: 'Simple message without icon',
    showIcon: false,
  },
};

// Auto close example
export const AutoClose: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        {visible && (
          <Toast
            variant="success"
            message="This will auto-close in 3 seconds"
            duration={3000}
            onClose={() => setVisible(false)}
          />
        )}
        {!visible && (
          <button
            onClick={() => setVisible(true)}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Show Toast Again
          </button>
        )}
      </div>
    );
  },
};

// All variants showcase
export const AllVariantsShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        Basic Variants
      </h3>
      <Toast variant="success" message="Operation completed successfully!" />
      <Toast variant="info" message="This is an informational message." />
      <Toast variant="error" message="An error occurred. Please try again." />
      <Toast variant="warn" message="Warning: This action cannot be undone." />

      <h3 style={{ marginTop: '24px', marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        With Action Button
      </h3>
      <Toast
        variant="success"
        message="File uploaded successfully"
        actionText="View"
        onAction={() => console.log('View clicked')}
      />
      <Toast
        variant="info"
        message="New update available"
        actionText="Update"
        onAction={() => console.log('Update clicked')}
      />

      <h3 style={{ marginTop: '24px', marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        With Close Button
      </h3>
      <Toast
        variant="success"
        message="Changes saved"
        closable
      />
      <Toast
        variant="warn"
        message="Connection unstable"
        closable
      />

      <h3 style={{ marginTop: '24px', marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        With Action and Close
      </h3>
      <Toast
        variant="error"
        message="Failed to save changes"
        actionText="Retry"
        onAction={() => console.log('Retry clicked')}
        closable
      />

      <h3 style={{ marginTop: '24px', marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        Without Icon
      </h3>
      <Toast
        variant="info"
        message="Simple message without icon"
        showIcon={false}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

