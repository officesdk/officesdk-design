import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    alert: {
      control: 'boolean',
      description: 'Whether to show alert state',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step increment/decrement',
    },
    precision: {
      control: 'number',
      description: 'Number of decimal places',
    },
    showStepButtons: {
      control: 'boolean',
      description: 'Whether to show step buttons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    defaultValue: 0,
    step: 1,
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    defaultValue: 50,
    size: 'small',
    step: 1,
  },
};

export const Large: Story = {
  args: {
    defaultValue: 50,
    size: 'large',
    step: 1,
  },
};

export const WithMinMax: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    size: 'large',
  },
};

export const WithPrecision: Story = {
  args: {
    defaultValue: 3.14,
    precision: 2,
    step: 0.01,
    size: 'large',
  },
};

export const WithCustomStep: Story = {
  args: {
    defaultValue: 0,
    step: 5,
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 50,
    disabled: true,
    size: 'large',
  },
};

export const Alert: Story = {
  args: {
    defaultValue: 150,
    max: 100,
    alert: true,
    size: 'large',
  },
};

export const WithUnit: Story = {
  args: {
    defaultValue: 100,
    unit: 'px',
    size: 'large',
  },
};

export const WithUnitPercent: Story = {
  args: {
    defaultValue: 50,
    unit: '%',
    min: 0,
    max: 100,
    size: 'large',
  },
};

export const WithFormatter: Story = {
  args: {
    defaultValue: 1000,
    formatter: (value) => `${value}px`,
    parser: (displayValue) => parseFloat(displayValue.replace('px', '')),
    size: 'large',
  },
};

export const WithRawValueCallback: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    size: 'large',
    onChange: (fixedValue, rawValue) => {
      console.log('Fixed value:', fixedValue);
      console.log('Raw value:', rawValue);
      if (fixedValue !== rawValue) {
        console.warn(`Value ${rawValue} was clamped to ${fixedValue}`);
      }
    },
  },
};

export const HideStepButtons: Story = {
  args: {
    defaultValue: 50,
    showStepButtons: false,
    size: 'large',
  },
};

export const Playground: Story = {
  args: {
    defaultValue: 0,
    min: -100,
    max: 100,
    step: 1,
    size: 'large',
    disabled: false,
    alert: false,
  },
};

export const FloatPrecision: Story = {
  args: {
    defaultValue: 0.01,
    step: 0.1,
    size: 'large',
  },
};

