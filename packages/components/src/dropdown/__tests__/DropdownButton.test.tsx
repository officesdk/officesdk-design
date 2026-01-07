import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { DropdownButton } from '../DropdownButton';
import React from 'react';

describe('DropdownButton', () => {
  describe('Rendering', () => {
    it('should render with value', () => {
      render(<DropdownButton value="Option 1" />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should render with placeholder when no value', () => {
      render(<DropdownButton placeholder="Select..." />);
      expect(screen.getByText('Select...')).toBeInTheDocument();
    });

    it('should render default placeholder', () => {
      render(<DropdownButton />);
      expect(screen.getByText('Select...')).toBeInTheDocument();
    });

    it('should render with icon', () => {
      const TestIcon = () => <div data-testid="custom-icon">Icon</div>;
      render(<DropdownButton icon={<TestIcon />} value="Option" />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render framed variant by default', () => {
      const { container } = render(<DropdownButton value="Option" />);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('should render frameless variant', () => {
      const { container } = render(<DropdownButton variant="frameless" value="Option" />);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('should auto-determine size based on variant', () => {
      const { container: container1 } = render(<DropdownButton variant="framed" value="Option" />);
      const button1 = container1.querySelector('button');
      expect(button1).toBeInTheDocument();

      const { container: container2 } = render(<DropdownButton variant="frameless" value="Option" />);
      const button2 = container2.querySelector('button');
      expect(button2).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should handle disabled state', () => {
      render(<DropdownButton disabled value="Option" />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should handle open state', () => {
      const { container } = render(<DropdownButton open value="Option" />);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('should handle error state', () => {
      const { container } = render(<DropdownButton error value="Option" />);
      expect(container.querySelector('button')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<DropdownButton onClick={onClick} value="Option" />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<DropdownButton onClick={onClick} disabled value="Option" />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Icon handling', () => {
    it('should render string icon as Icon component', () => {
      render(<DropdownButton icon="https://example.com/icon.svg" value="Option" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render ReactNode icon', () => {
      const TestIcon = () => <div data-testid="react-icon">Icon</div>;
      render(<DropdownButton icon={<TestIcon />} value="Option" />);
      expect(screen.getByTestId('react-icon')).toBeInTheDocument();
    });

    it('should render custom indicator icon', () => {
      const CustomIndicator = () => <div data-testid="custom-indicator">↓</div>;
      render(<DropdownButton indicatorIcon={<CustomIndicator />} value="Option" />);
      expect(screen.getByTestId('custom-indicator')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(<DropdownButton value="Option" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<DropdownButton onClick={onClick} value="Option" />);

      const button = screen.getByRole('button');
      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalled();
    });

    it('should support aria-label', () => {
      render(<DropdownButton value="Option" aria-label="Select option" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Select option');
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<DropdownButton ref={ref} value="Option" />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should allow calling focus via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<DropdownButton ref={ref} value="Option" />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });
});

