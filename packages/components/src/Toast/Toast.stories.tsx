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
      options: ['success', 'info', 'error', 'warn', 'loading', 'critical'],
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
    onMainButtonClick: {
      action: 'onMainButtonClick',
      description: 'Main action button click handler',
    },
    onSecondaryButtonClick: {
      action: 'onSecondaryButtonClick',
      description: 'Secondary action button click handler',
    },
    onClose: {
      action: 'onClose',
      description: 'Close button click handler',
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

export const Critical: Story = {
  args: {
    variant: 'critical',
    message: 'Critical: This action is critical and cannot be undone.',
  },
};

export const Loading: Story = {
  args: {
    variant: 'loading',
    message: 'Loading data, please wait...',
  },
};

// Single line with buttons (Un)
export const SingleLineWithButtons: Story = {
  args: {
    variant: 'success',
    message: 'Feedback information',
    mainButtonText: 'Button name',
    onMainButtonClick: () => alert('Main button clicked!'),
    secondaryButtonText: 'Button name',
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
    message: 'Feedback information',
    description: 'Information specific description',
    mainButtonText: 'Button name',
    onMainButtonClick: () => alert('Main button clicked!'),
    secondaryButtonText: 'Button name',
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

// HTML attributes support
export const WithHTMLAttributes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        HTML Attributes Support
      </h3>

      <Toast
        variant="success"
        message="Toast with data-testid"
        data-testid="success-toast"
      />

      <Toast
        variant="info"
        message="Toast with custom id and title"
        id="custom-toast-id"
        title="Information toast"
        data-test="info-toast"
      />

      <Toast
        variant="error"
        message="Toast with aria attributes"
        aria-label="Error notification"
        aria-describedby="error-description"
      />

      <div style={{ marginTop: '16px', padding: '12px', background: '#f9f9f9', borderRadius: '4px' }}>
        <p style={{ fontSize: '12px', margin: 0 }}>
          Open DevTools to inspect the HTML attributes (data-testid, id, title, aria-*, etc.)
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// ReactNode message examples
export const WithReactNodeMessage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        ReactNode Message Examples
      </h3>

      <Toast
        variant="success"
        message={
          <span>
            Operation completed <strong>successfully</strong>!
          </span>
        }
      />

      <Toast
        variant="info"
        message={
          <div>
            Please review the{' '}
            <a
              href="#"
              style={{ color: '#5ba0e7', textDecoration: 'underline' }}
              onClick={(e) => {
                e.preventDefault();
                alert('Link clicked!');
              }}
            >
              documentation
            </a>
            {' '}for more details.
          </div>
        }
      />

      <Toast
        variant="error"
        message={
          <>
            <strong>Error:</strong> Failed to save changes. Please try again.
          </>
        }
        closable
      />

      <Toast
        variant="warn"
        message={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontWeight: 600 }}>Warning</span>
            <span style={{ fontSize: '12px' }}>This action cannot be undone.</span>
          </div>
        }
      />

      <Toast
        variant="success"
        message={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>File uploaded:</span>
            <code
              style={{
                background: 'rgba(0,0,0,0.1)',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '12px',
              }}
            >
              document.pdf
            </code>
          </div>
        }
        mainButtonText="View"
        onMainButtonClick={() => console.log('View clicked')}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
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
      <Toast variant="loading" message="Loading data, please wait..." />

      <h3 style={{ marginTop: '24px', marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        With Action Button
      </h3>
      <Toast
        variant="success"
        message="File uploaded successfully"
        mainButtonText="View"
        onMainButtonClick={() => console.log('View clicked')}
      />
      <Toast
        variant="info"
        message="New update available"
        mainButtonText="Update"
        onMainButtonClick={() => console.log('Update clicked')}
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
        mainButtonText="Retry"
        onMainButtonClick={() => console.log('Retry clicked')}
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

