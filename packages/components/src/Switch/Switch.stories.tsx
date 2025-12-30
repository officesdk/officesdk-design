import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the switch',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ========== Basic Usage ==========
export const Default: Story = {
  args: {
    defaultChecked: false,
    size: 'large',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    size: 'large',
  },
};

// ========== Size ==========
export const Large: Story = {
  args: {
    defaultChecked: true,
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    defaultChecked: true,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    defaultChecked: true,
    size: 'small',
  },
};

// ========== Status ==========
export const Disabled: Story = {
  args: {
    defaultChecked: false,
    disabled: true,
    size: 'large',
  },
};

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
    size: 'large',
  },
};

// Controlled component
const ControlledComponent = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <Switch checked={checked} onChange={(val) => setChecked(val)} size="large" />
      <div style={{ fontSize: '14px', color: '#666' }}>status: {checked ? 'on' : 'off'}</div>
      <button
        onClick={() => setChecked(!checked)}
        style={{
          padding: '4px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        toggle status
      </button>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledComponent />,
};

// Comprehensive showcase
export const AllVariantsShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Large switch</h3>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Normal - Off</div>
            <Switch size="large" defaultChecked={false} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Normal - On</div>
            <Switch size="large" defaultChecked={true} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Hover - Off</div>
            <Switch size="large" defaultChecked={false} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Hover - On</div>
            <Switch size="large" defaultChecked={true} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              Disabled - Off
            </div>
            <Switch size="large" defaultChecked={false} disabled />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              Disabled - On
            </div>
            <Switch size="large" defaultChecked={true} disabled />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Medium switch</h3>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Normal - Off</div>
            <Switch size="medium" defaultChecked={false} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Normal - On</div>
            <Switch size="medium" defaultChecked={true} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Hover - Off</div>
            <Switch size="medium" defaultChecked={false} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Hover - On</div>
            <Switch size="medium" defaultChecked={true} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              Disabled - Off
            </div>
            <Switch size="medium" defaultChecked={false} disabled />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              Disabled - On
            </div>
            <Switch size="medium" defaultChecked={true} disabled />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Small switch</h3>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Normal - Off</div>
            <Switch size="small" defaultChecked={false} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Normal - On</div>
            <Switch size="small" defaultChecked={true} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Hover - Off</div>
            <Switch size="small" defaultChecked={false} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Hover - On</div>
            <Switch size="small" defaultChecked={true} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              Disabled - Off
            </div>
            <Switch size="small" defaultChecked={false} disabled />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              Disabled - On
            </div>
            <Switch size="small" defaultChecked={true} disabled />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
