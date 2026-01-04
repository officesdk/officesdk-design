import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['black', 'white'],
      description: 'Tooltip variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: 'Tooltip size (only for white variant)',
    },
    placement: {
      control: 'select',
      options: ['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'],
      description: 'Tooltip placement',
    },
    trigger: {
      control: 'select',
      options: [['hover'], ['click'], ['focus'], ['hover', 'click']],
      description: 'Tooltip trigger',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Tooltip text',
    variant: 'black',
    getPopupContainer: (triggerNode) => triggerNode.parentElement || document.body,
  },
  render: (args) => (
    <div style={{ padding: '50px' }} data-testid="tooltip-container">
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const BlackVariant: Story = {
  render: () => {
    const getContainer = (node: HTMLElement) => node.parentElement || document.body;
    return (
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: '100px' }}>
        <Tooltip content="Simple tooltip" variant="black" getPopupContainer={getContainer}>
          <Button>Simple</Button>
        </Tooltip>

        <Tooltip content="Tooltip with title" variant="black" getPopupContainer={getContainer}>
          <Button>With Title</Button>
        </Tooltip>

        <Tooltip
          content={
            <div>
              <div style={{ fontWeight: 500, marginBottom: '4px' }}>Title</div>
              <div>Description text here</div>
            </div>
          }
          variant="black"
          getPopupContainer={getContainer}
        >
          <Button>Complex Content</Button>
        </Tooltip>

        <Tooltip
          content={
            <div>
              <div style={{ fontWeight: 500, marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Title</span>
                <span style={{ opacity: 0.9 }}>⌘+⇧+M</span>
              </div>
              <div>Tooltip description text</div>
              <div style={{ color: '#73b1eb', marginTop: '4px', opacity: 0.9 }}>Help - Feature name</div>
            </div>
          }
          variant="black"
          getPopupContainer={getContainer}
        >
          <Button>Full Example</Button>
        </Tooltip>
      </div>
    );
  },
};

export const WhiteSmall: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: '100px' }}>
      <Tooltip
        content={
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '8px' }}>Title</div>
            <div style={{ fontSize: '13px', lineHeight: '20px' }}>
              A description text. This text has no length limit. A description text. This text has no length limit.
            </div>
          </div>
        }
        variant="white"
        size="small"
      >
        <Button>Simple Content</Button>
      </Tooltip>

      <Tooltip
        content={
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '8px' }}>Title</div>
            <div style={{ fontSize: '13px', lineHeight: '20px', marginBottom: '8px' }}>
              A description text. This text has no length limit.
            </div>
            <div style={{ display: 'flex', gap: '4px', color: '#5ba0e7', fontSize: '12px', alignItems: 'center' }}>
              <span>Text link</span>
            </div>
          </div>
        }
        variant="white"
        size="small"
      >
        <Button>With Link</Button>
      </Tooltip>

      <Tooltip
        content={
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '8px' }}>Title</div>
            <div style={{ fontSize: '13px', lineHeight: '20px', marginBottom: '8px' }}>
              A description text. This text has no length limit.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#5ba0e7', fontSize: '12px' }}>
                <span>Text link</span>
              </div>
              <Button size="small">Action</Button>
            </div>
          </div>
        }
        variant="white"
        size="small"
      >
        <Button>With Button</Button>
      </Tooltip>
    </div>
  ),
};

export const WhiteLarge: Story = {
  render: () => {
    const getContainer = (node: HTMLElement) => node.parentElement || document.body;
    return (
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: '100px' }}>
        <Tooltip
          content={
            <div style={{ width: '320px' }}>
              <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '8px' }}>Title</div>
              <div style={{ fontSize: '13px', lineHeight: '20px', marginBottom: '8px' }}>
                A description text. This text has no length limit. A description text. This text has no length limit. A description text. This text has no length limit.
              </div>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                <Button size="small">Primary</Button>
                <Button size="small" variant="outlined">Secondary</Button>
              </div>
            </div>
          }
          variant="white"
          size="large"
          getPopupContainer={getContainer}
        >
          <Button>Large Tooltip</Button>
        </Tooltip>

        <Tooltip
          content={
            <div style={{ width: '320px' }}>
              <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '8px' }}>Title</div>
              <div style={{ fontSize: '13px', lineHeight: '20px', marginBottom: '8px' }}>
                A description text. This text has no length limit.
              </div>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '4px', fontSize: '13px', lineHeight: '24px', color: 'rgba(65, 70, 75, 0.8)' }}>
                  <span>•</span>
                  <span>List item one with more details</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', fontSize: '13px', lineHeight: '24px', color: 'rgba(65, 70, 75, 0.8)' }}>
                  <span>•</span>
                  <span>List item two with more details</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '4px', color: '#5ba0e7', fontSize: '12px' }}>
                  <span>Text link</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Button size="small">Primary</Button>
                  <Button size="small" variant="outlined">Secondary</Button>
                </div>
              </div>
            </div>
          }
          variant="white"
          size="large"
          getPopupContainer={getContainer}
        >
          <Button>Complex Large</Button>
        </Tooltip>
      </div>
    );
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', padding: '100px', width: '600px' }}>
      <div />
      <Tooltip content="Top placement" placement="top">
        <Button style={{ width: '100%' }}>Top</Button>
      </Tooltip>
      <div />

      <Tooltip content="Left placement" placement="left">
        <Button style={{ width: '100%' }}>Left</Button>
      </Tooltip>
      <div />
      <Tooltip content="Right placement" placement="right">
        <Button style={{ width: '100%' }}>Right</Button>
      </Tooltip>

      <div />
      <Tooltip content="Bottom placement" placement="bottom">
        <Button style={{ width: '100%' }}>Bottom</Button>
      </Tooltip>
      <div />
    </div>
  ),
};

export const Triggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', padding: '100px' }}>
      <Tooltip content="Hover to show" trigger={['hover']}>
        <Button>Hover</Button>
      </Tooltip>

      <Tooltip content="Click to show" trigger={['click']}>
        <Button>Click</Button>
      </Tooltip>

      <Tooltip content="Focus to show" trigger={['focus']}>
        <Button>Focus</Button>
      </Tooltip>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    content: 'Tooltip content',
    variant: 'black',
    size: 'small',
    placement: 'top',
    trigger: ['hover'],
  },
  render: (args) => (
    <div style={{ padding: '100px' }}>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

