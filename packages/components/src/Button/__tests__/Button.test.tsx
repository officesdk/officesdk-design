import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { Button } from '../Button';


describe('Button', () => {
  describe('Rendering', () => {
    it('should render button with text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should render with different variants', () => {
      const { rerender } = render(<Button variant="solid">Solid</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Solid');

      rerender(<Button variant="outlined">Outlined</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Outlined');

      rerender(<Button variant="text">Text</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Text');
    });

    it('should render with different sizes', () => {
      const { rerender } = render(<Button size="small">Small</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<Button size="medium">Medium</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<Button size="large">Large</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render with different color types', () => {
      const { rerender } = render(<Button colorType="default">Default</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<Button colorType="guidance">Guidance</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<Button colorType="alert">Alert</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render with icon before text', () => {
      render(
        <Button icon={<span data-testid="icon-before">→</span>} iconPlacement="before">
          With Icon
        </Button>
      );
      expect(screen.getByTestId('icon-before')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('should render with icon after text', () => {
      render(
        <Button icon={<span data-testid="icon-after">→</span>} iconPlacement="after">
          With Icon
        </Button>
      );
      expect(screen.getByTestId('icon-after')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('should render button with only icon', () => {
      render(<Button icon={<span data-testid="icon-only">×</span>} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByTestId('icon-only')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} loading>
          Loading
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Press me</Button>);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('should have proper disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Props', () => {
    it('should apply custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('should apply custom style', () => {
      render(<Button style={{ margin: '10px' }}>Button</Button>);
      expect(screen.getByRole('button')).toHaveStyle({ margin: '10px' });
    });

    it('should render full width', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });
});

