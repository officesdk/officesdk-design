import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Simple icon component for demo
const RedoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 8C13.5 10.7614 11.2614 13 8.5 13C5.73858 13 3.5 10.7614 3.5 8C3.5 5.23858 5.73858 3 8.5 3H13.5M13.5 3L11 5.5M13.5 3L11 0.5"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M14.736 1.8909C14.5717 1.51067 14.1302 1.33564 13.75 1.49996L13.6748 1.53246C13.3361 1.67883 13.1802 2.07206 13.3266 2.41076C12.3093 1.95552 11.1837 1.70234 10 1.70234C5.43256 1.70234 1.75 5.46047 1.75 10.0714C1.75 11.0643 1.92075 12.0182 2.2346 12.9036C2.37298 13.294 2.82162 13.4584 3.19812 13.2857C3.57461 13.113 3.73559 12.6687 3.60483 12.2756C3.37489 11.5845 3.25 10.8434 3.25 10.0714C3.25 6.26654 6.28317 3.20234 10 3.20234C11.7257 3.20234 13.3001 3.8605 14.4955 4.94731C14.7568 5.18496 15.1486 5.208 15.436 5.00262C15.7235 4.79724 15.8286 4.41914 15.6885 4.09486L14.736 1.8909ZM16.5413 8.36911C16.6775 8.91285 16.75 9.48306 16.75 10.0714C16.75 13.8762 13.7168 16.9404 10 16.9404C8.27428 16.9404 6.69985 16.2823 5.50455 15.1955C5.24317 14.9578 4.8514 14.9348 4.56397 15.1402C4.27655 15.3455 4.1714 15.7236 4.31154 16.0479L5.26401 18.2519C5.42833 18.6321 5.86977 18.8071 6.25 18.6428L6.32519 18.6103C6.66389 18.464 6.8198 18.0707 6.67343 17.732C7.69075 18.1873 8.81627 18.4404 10 18.4404C14.5674 18.4404 18.25 14.6823 18.25 10.0714C18.25 9.30202 18.1475 8.55592 17.9552 7.84686C17.8468 7.44709 17.4119 7.24918 17.0234 7.39282C16.6349 7.53646 16.4407 7.96731 16.5413 8.36911ZM10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8Z" fill="#41464B"/>
</svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    colorType: {
      control: 'radio',
      options: ['default', 'guidance', 'alert', 'status'],
      description: 'Button color type (status only available for text variant)',
    },
    variant: {
      control: 'radio',
      options: ['solid', 'outlined', 'text', 'icon'],
      description: 'Button variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large', 'extraLarge'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
    },
    icon: {
      control: 'text',
      description: 'Icon URL or ReactNode to display',
    },
    iconPlacement: {
      control: 'radio',
      options: ['before', 'after'],
      description: 'Icon placement relative to text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ========== Solid Button ==========
export const SolidDefault: Story = {
  args: {
    variant: 'solid',
    colorType: 'default',
    children: 'button',
  },
};

export const SolidGuidance: Story = {
  args: {
    variant: 'solid',
    colorType: 'guidance',
    children: 'button',
  },
};

export const SolidAlert: Story = {
  args: {
    variant: 'solid',
    colorType: 'alert',
    children: 'delete',
  },
};

export const SolidDisabled: Story = {
  args: {
    variant: 'solid',
    colorType: 'default',
    disabled: true,
    children: 'button',
  },
};

// ========== Outlined Button ==========
export const OutlinedDefault: Story = {
  args: {
    variant: 'outlined',
    colorType: 'default',
    children: 'secondary button',
  },
};

export const OutlinedGuidance: Story = {
  args: {
    variant: 'outlined',
    colorType: 'guidance',
    children: 'secondary button',
  },
};

export const OutlinedAlert: Story = {
  args: {
    variant: 'outlined',
    colorType: 'alert',
    children: 'secondary button',
  },
};

export const OutlinedDisabled: Story = {
  args: {
    variant: 'outlined',
    colorType: 'default',
    disabled: true,
    children: 'secondary button',
  },
};

// ========== Text Button ==========
export const TextDefault: Story = {
  args: {
    variant: 'text',
    colorType: 'default',
    children: 'text button',
  },
};

export const TextGuidance: Story = {
  args: {
    variant: 'text',
    colorType: 'guidance',
    children: 'text button',
  },
};

export const TextAlert: Story = {
  args: {
    variant: 'text',
    colorType: 'alert',
    children: 'delete',
  },
};

export const TextStatus: Story = {
  args: {
    variant: 'text',
    colorType: 'status',
    children: 'status button',
  },
};

export const TextDisabled: Story = {
  args: {
    variant: 'text',
    colorType: 'default',
    disabled: true,
    children: 'text button',
  },
};

// ========== Icon Button ==========
export const WithIconBefore: Story = {
  args: {
    variant: 'solid',
    colorType: 'default',
    icon: <RedoIcon />,
    iconPlacement: 'before',
    children: 'button',
  },
};

export const WithIconAfter: Story = {
  args: {
    variant: 'solid',
    colorType: 'default',
    icon: <RedoIcon />,
    iconPlacement: 'after',
    children: 'button',
  },
};

// ========== Icon Only Button ==========
export const IconVariantBordered: Story = {
  args: {
    variant: 'icon',
    colorType: 'default',
    icon: <CloseIcon />,
    iconBordered: true,
  },
};

export const IconVariantBorderless: Story = {
  args: {
    variant: 'icon',
    colorType: 'default',
    size: 'extraLarge',
    icon: <RefreshIcon />,
    iconBordered: false,
  },
};

// ========== Size Variation ==========
export const SizeSmall: Story = {
  args: {
    size: 'small',
    children: 'small button',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'medium',
    children: 'medium button',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'large',
    children: 'large button',
  },
};

export const SizeExtraLarge: Story = {
  args: {
    size: 'extraLarge',
      children: 'extra large button',
  },
};

// ========== Other Status ==========
export const Loading: Story = {
  args: {
    loading: true,
    children: 'loading button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'full width button',
  },
  parameters: {
    layout: 'padded',
  },
};

// ========== All Variants Showcase ==========
export const AllVariantsShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Solid Button</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="solid" colorType="default">button</Button>
          <Button variant="solid" colorType="guidance">button</Button>
          <Button variant="solid" colorType="alert">delete</Button>
          <Button variant="solid" colorType="default" disabled>button</Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px' }}>Outlined Button</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="outlined" colorType="default">secondary button</Button>
          <Button variant="outlined" colorType="guidance">secondary button</Button>
          <Button variant="outlined" colorType="alert">secondary button</Button>
          <Button variant="outlined" colorType="default" disabled>secondary button</Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px' }}>Text Button</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="text" colorType="default">text button</Button>
          <Button variant="text" colorType="guidance">text button</Button>
          <Button variant="text" colorType="alert">delete</Button>
          <Button variant="text" colorType="status">status button</Button>
          <Button variant="text" colorType="default" disabled>text button</Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px' }}>Icon Variant Button (Square, No Padding)</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="icon" icon={<CloseIcon />} iconBordered />
          <Button variant="icon" icon={<CloseIcon />} iconBordered={false} />
          <Button variant="icon" icon={<CloseIcon />} iconBordered disabled />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px' }}>Button with Icons</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="solid" icon={<RedoIcon />} iconPlacement="before">button</Button>
          <Button variant="solid" icon={<RedoIcon />} iconPlacement="after">button</Button>
          <Button variant="outlined" icon={<RedoIcon />} iconPlacement="before">secondary button</Button>
          <Button variant="text" icon={<RedoIcon />} iconPlacement="before">text button</Button>
        </div>
      </div>

      <div>
          <h3 style={{ marginBottom: '12px' }}>Size</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button size="small">small button</Button>
          <Button size="medium">medium button</Button>
          <Button size="large">large button</Button>
          <Button size="extraLarge">extra large button</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

