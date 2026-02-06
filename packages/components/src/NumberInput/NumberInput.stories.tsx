import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';
import { UIConfigProvider, createUIConfig } from '../UIConfigProvider';
import { lightTheme } from '../../../theme/src';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Size and style
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: 'Size variant',
      table: { type: { summary: "'small' | 'large'" } },
    },
    lineType: {
      control: 'radio',
      options: ['outlined', 'underlined', 'borderless'],
      description: 'Input line type',
      table: { type: { summary: "'outlined' | 'underlined' | 'borderless'" } },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: { type: { summary: 'boolean' } },
    },
    alert: {
      control: 'boolean',
      description: 'Whether to show alert state',
      table: { type: { summary: 'boolean' } },
    },

    // Value constraints
    min: {
      control: 'number',
      description: 'Minimum value',
      table: { type: { summary: 'number' } },
    },
    max: {
      control: 'number',
      description: 'Maximum value',
      table: { type: { summary: 'number' } },
    },
    step: {
      control: 'number',
      description: 'Step increment/decrement',
      table: { type: { summary: 'number' } },
    },
    precision: {
      control: 'number',
      description: 'Number of decimal places',
      table: { type: { summary: 'number' } },
    },

    // Display options
    showStepButtons: {
      control: 'boolean',
      description: 'Whether to show step buttons',
      table: { type: { summary: 'boolean' } },
    },
    showStepButtonsTrigger: {
      control: 'radio',
      options: ['normal', 'hover'],
      description: 'Trigger mode for step buttons',
      table: { type: { summary: "'hover' | 'normal'" } },
    },
    useThousandsSeparator: {
      control: 'boolean',
      description: 'Whether to use thousands separator in display',
      table: { type: { summary: 'boolean' } },
    },

    // Event callbacks
    onChange: {
      action: 'onChange',
      description: 'Callback when value changes (on blur or step button click)',
      table: { type: { summary: '(fixedValue: number | undefined, rawValue: number | undefined) => void' } },
    },
    onInputChange: {
      action: 'onInputChange',
      description: 'Callback when input value changes during typing',
      table: { type: { summary: '(inputValue: string, parsedValue: number | undefined) => void' } },
    },
    onFocus: {
      action: 'onFocus',
      description: 'Callback when input receives focus',
      table: { type: { summary: '(e: React.FocusEvent<HTMLInputElement>) => void' } },
    },
    onBlur: {
      action: 'onBlur',
      description: 'Callback when input loses focus',
      table: { type: { summary: '(e: React.FocusEvent<HTMLInputElement>) => void' } },
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

export const HoverStepButtons: Story = {
  args: {
    defaultValue: 50,
    showStepButtonsTrigger: 'hover',
    size: 'large',
  },
};

export const Outlined: Story = {
  args: {
    defaultValue: 50,
    lineType: 'outlined',
    size: 'large',
  },
};

export const Underlined: Story = {
  args: {
    defaultValue: 50,
    lineType: 'underlined',
    size: 'large',
  },
};

export const Borderless: Story = {
  args: {
    defaultValue: 50,
    lineType: 'borderless',
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
    lineType: 'outlined',
  },
};

/**
 * This story demonstrates all event callbacks.
 * Open the Actions panel to see the events being triggered.
 * - onFocus: triggered when input receives focus
 * - onBlur: triggered when input loses focus
 * - onInputChange: triggered on every keystroke during typing
 * - onChange: triggered when value is committed (on blur or step button click)
 */
export const WithEvents: Story = {
  name: 'With Events (check Actions panel)',
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    size: 'large',
  },
};

export const FloatPrecision: Story = {
  args: {
    defaultValue: 0.01,
    step: 0.1,
    size: 'large',
  },
};

export const WithThousandsSeparator: Story = {
  name: 'With Thousands Separator (default)',
  args: {
    defaultValue: 1234567.89,
    precision: 2,
    size: 'large',
    useThousandsSeparator: true,
  },
};

export const WithoutThousandsSeparator: Story = {
  name: 'Without Thousands Separator',
  args: {
    defaultValue: 1234567.89,
    precision: 2,
    size: 'large',
    useThousandsSeparator: false,
  },
};

/**
 * Locale-specific stories demonstrating number formatting
 * Different locales use different decimal and thousands separators
 */

// Helper component to wrap NumberInput with a specific locale
const LocaleWrapper: React.FC<{
  locale: string;
  children: React.ReactNode;
}> = ({ locale, children }) => {
  const config = createUIConfig({
    theme: lightTheme,
    locale,
  });
  return <UIConfigProvider config={config}>{children}</UIConfigProvider>;
};

export const LocaleEnUS: Story = {
  name: 'Locale: en-US (1,234.56)',
  args: {
    defaultValue: 1234.56,
    precision: 2,
    size: 'large',
  },
  decorators: [
    (Story) => (
      <LocaleWrapper locale="en-US">
        <Story />
      </LocaleWrapper>
    ),
  ],
};

export const LocaleDeDE: Story = {
  name: 'Locale: de-DE (1.234,56)',
  args: {
    defaultValue: 1234.56,
    precision: 2,
    size: 'large',
  },
  decorators: [
    (Story) => (
      <LocaleWrapper locale="de-DE">
        <Story />
      </LocaleWrapper>
    ),
  ],
};

export const LocaleFrFR: Story = {
  name: 'Locale: fr-FR (1 234,56)',
  args: {
    defaultValue: 1234.56,
    precision: 2,
    size: 'large',
  },
  decorators: [
    (Story) => (
      <LocaleWrapper locale="fr-FR">
        <Story />
      </LocaleWrapper>
    ),
  ],
};

export const LocaleZhCN: Story = {
  name: 'Locale: zh-CN (1,234.56)',
  args: {
    defaultValue: 1234.56,
    precision: 2,
    size: 'large',
  },
  decorators: [
    (Story) => (
      <LocaleWrapper locale="zh-CN">
        <Story />
      </LocaleWrapper>
    ),
  ],
};

export const LocaleWithLargeNumber: Story = {
  name: 'Locale: Large Numbers',
  args: {
    defaultValue: 1234567.89,
    precision: 2,
    size: 'large',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>en-US: 1,234,567.89</div>
        <LocaleWrapper locale="en-US">
          <NumberInput {...args} />
        </LocaleWrapper>
      </div>
      <div>
        <div style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>de-DE: 1.234.567,89</div>
        <LocaleWrapper locale="de-DE">
          <NumberInput {...args} />
        </LocaleWrapper>
      </div>
      <div>
        <div style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>fr-FR: 1 234 567,89</div>
        <LocaleWrapper locale="fr-FR">
          <NumberInput {...args} />
        </LocaleWrapper>
      </div>
    </div>
  ),
};

