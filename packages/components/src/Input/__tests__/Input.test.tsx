import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { Input } from '../Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('should render input with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render with different sizes', () => {
      const { rerender } = render(<Input size="mini" placeholder="Mini" />);
      expect(screen.getByPlaceholderText('Mini')).toBeInTheDocument();

      rerender(<Input size="small" placeholder="Small" />);
      expect(screen.getByPlaceholderText('Small')).toBeInTheDocument();

      rerender(<Input size="medium" placeholder="Medium" />);
      expect(screen.getByPlaceholderText('Medium')).toBeInTheDocument();

      rerender(<Input size="large" placeholder="Large" />);
      expect(screen.getByPlaceholderText('Large')).toBeInTheDocument();
    });

    it('should render with prefixNode', () => {
      render(<Input prefixNode={<span data-testid="prefix-icon">🔍</span>} placeholder="Search" />);
      expect(screen.getByTestId('prefix-icon')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    it('should render with suffixNode', () => {
      render(
        <Input suffixNode={<span data-testid="suffix-icon">×</span>} placeholder="Enter text" />
      );
      expect(screen.getByTestId('suffix-icon')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render with both prefixNode and suffixNode', () => {
      render(
        <Input
          prefixNode={<span data-testid="prefix">🔍</span>}
          suffixNode={<span data-testid="suffix">×</span>}
          placeholder="Search"
        />
      );
      expect(screen.getByTestId('prefix')).toBeInTheDocument();
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(<Input className="custom-class" placeholder="Test" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should render with custom style', () => {
      const { container } = render(<Input style={{ width: '500px' }} placeholder="Test" />);
      const wrapper = container.querySelector('div');
      expect(wrapper).toHaveStyle({ width: '500px' });
    });
  });

  describe('States', () => {
    it('should render in error state', () => {
      render(<Input error placeholder="Error input" />);
      expect(screen.getByPlaceholderText('Error input')).toBeInTheDocument();
    });

    it('should render in disabled state', () => {
      render(<Input disabled placeholder="Disabled input" />);
      const input = screen.getByPlaceholderText('Disabled input');
      expect(input).toBeDisabled();
    });

    it('should render in readonly state', () => {
      render(<Input readOnly value="Readonly value" />);
      const input = screen.getByDisplayValue('Readonly value');
      expect(input).toHaveAttribute('readonly');
    });
  });

  describe('Interactions', () => {
    it('should handle value changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} placeholder="Type here" />);
      const input = screen.getByPlaceholderText('Type here');

      await user.type(input, 'Hello');

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('Hello');
    });

    it('should handle focus events', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Input onFocus={handleFocus} placeholder="Focus test" />);
      const input = screen.getByPlaceholderText('Focus test');

      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('should handle blur events', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<Input onBlur={handleBlur} placeholder="Blur test" />);
      const input = screen.getByPlaceholderText('Blur test');

      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('should not trigger onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input disabled onChange={handleChange} placeholder="Disabled" />);
      const input = screen.getByPlaceholderText('Disabled');

      await user.type(input, 'Hello');

      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('');
    });

    it('should not trigger onChange when readonly', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input readOnly onChange={handleChange} value="Readonly" />);
      const input = screen.getByDisplayValue('Readonly');

      await user.type(input, 'Hello');

      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('Readonly');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component', async () => {
      const user = userEvent.setup();

      render(<Input defaultValue="Initial" placeholder="Uncontrolled" />);
      const input = screen.getByDisplayValue('Initial');

      await user.clear(input);
      await user.type(input, 'New value');

      expect(input).toHaveValue('New value');
    });

    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState('Initial');
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Controlled"
          />
        );
      };

      render(<TestComponent />);
      const input = screen.getByDisplayValue('Initial');

      await user.clear(input);
      await user.type(input, 'New value');

      expect(input).toHaveValue('New value');
    });
  });

  describe('Accessibility', () => {
    it('should have proper input role', () => {
      render(<Input placeholder="Accessible input" />);
      const input = screen.getByPlaceholderText('Accessible input');
      expect(input.tagName).toBe('INPUT');
    });

    it('should support aria-label', () => {
      render(<Input aria-label="Search field" placeholder="Search" />);
      expect(screen.getByLabelText('Search field')).toBeInTheDocument();
    });

    it('should support aria-describedby', () => {
      render(
        <>
          <Input aria-describedby="helper-text" placeholder="Input" />
          <span id="helper-text">Helper text</span>
        </>
      );
      const input = screen.getByPlaceholderText('Input');
      expect(input).toHaveAttribute('aria-describedby', 'helper-text');
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();

      render(
        <>
          <Input placeholder="First" />
          <Input placeholder="Second" />
        </>
      );

      const firstInput = screen.getByPlaceholderText('First');
      const secondInput = screen.getByPlaceholderText('Second');

      firstInput.focus();
      expect(firstInput).toHaveFocus();

      await user.tab();
      expect(secondInput).toHaveFocus();
    });
  });

  describe('ForwardRef', () => {
    it('should forward ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();

      render(<Input ref={ref} placeholder="Ref test" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.placeholder).toBe('Ref test');
    });

    it('should allow calling focus via ref', () => {
      const ref = React.createRef<HTMLInputElement>();

      render(<Input ref={ref} placeholder="Focus via ref" />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });
});
