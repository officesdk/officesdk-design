import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Whether the modal is visible',
    },
    variant: {
      control: 'select',
      options: ['message', 'functional'],
      description: 'Modal variant type',
    },
    maskType: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Mask layer type',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    width: {
      control: 'text',
      description: 'Modal width (number or string)',
    },
    height: {
      control: 'text',
      description: 'Modal height (number or string)',
    },
    closable: {
      control: 'boolean',
      description: 'Whether to show close button',
    },
    mask: {
      control: 'boolean',
      description: 'Whether to show mask',
    },
    maskClosable: {
      control: 'boolean',
      description: 'Whether to close modal when clicking mask',
    },
    okText: {
      control: 'text',
      description: 'OK button text (set to null to hide)',
    },
    cancelText: {
      control: 'text',
      description: 'Cancel button text (set to null to hide)',
    },
    disabledOkButton: {
      control: 'boolean',
      description: 'Whether OK button is disabled',
    },
    zIndex: {
      control: 'number',
      description: 'z-index of the modal',
    },
    destroyOnClose: {
      control: 'boolean',
      description: 'Whether to destroy modal on close',
    },
    keyboard: {
      control: 'boolean',
      description: 'Whether keyboard interactions are enabled (ESC to close)',
    },
    className: {
      control: 'text',
      description: 'Custom className',
    },
    forceRender: {
      control: 'boolean',
      description: 'Whether to force render modal content when not visible',
    },
    focusTriggerAfterClose: {
      control: 'boolean',
      description: 'Whether to focus trigger element after close',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Interactive wrapper component
const ModalDemo = (props: React.ComponentProps<typeof Modal>) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        {...props}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Modal Title',
    children: 'This is the modal content. You can put any content here.',
  },
};

export const WithCustomFooter: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Custom Footer',
    children: 'This modal has a custom footer.',
    footer: (
      <Button variant="solid" colorType="guidance">
        Custom Button
      </Button>
    ),
  },
};

export const NoFooter: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'No Footer',
    children: 'This modal has no footer.',
    footer: null,
  },
};

export const CustomWidth: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Wide Modal',
    width: 800,
    children: 'This modal has a custom width of 800px.',
  },
};

export const DisabledOkButton: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Disabled OK Button',
    children: 'The OK button is disabled.',
    disabledOkButton: true,
  },
};

export const NoCloseButton: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'No Close Button',
    children: 'This modal has no close button.',
    closable: false,
  },
};

export const CustomButtonText: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Custom Button Text',
    children: 'This modal has custom button text.',
    okText: 'Confirm',
    cancelText: 'Dismiss',
  },
};

export const OnlyOkButton: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Only OK Button',
    children: 'This modal only has an OK button.',
    cancelText: null,
  },
};

export const OnlyCancelButton: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Only Cancel Button',
    children: 'This modal only has a Cancel button.',
    okText: null,
  },
};

export const MessageDialog: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    variant: 'message',
    title: 'Message Dialog',
    children: 'This is a message dialog with a maximum width of 400px and minimum width of 360px.',
  },
};

export const FunctionalDialog: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    variant: 'functional',
    title: 'Functional Dialog',
    children:
      'This is a functional dialog with a default width of 640px (max 800px, min 400px). It is typically used for more complex interactions.',
  },
};

export const DarkMask: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Dark Mask Modal',
    maskType: 'dark',
    children:
      'This modal uses a dark mask layer (rgba(44,48,51,0.8)) instead of the default light mask.',
  },
};
