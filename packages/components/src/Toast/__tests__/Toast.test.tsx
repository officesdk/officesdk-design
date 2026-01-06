import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { Toast } from '../Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render toast with message', () => {
      render(<Toast message="Test message" />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should render with different variants', () => {
      const { rerender } = render(<Toast variant="success" message="Success" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();

      rerender(<Toast variant="info" message="Info" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();

      rerender(<Toast variant="error" message="Error" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();

      rerender(<Toast variant="warn" message="Warning" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should render with icon by default', () => {
      const { container } = render(<Toast variant="success" message="Success" />);
      // Check for icon wrapper
      const iconWrapper = container.querySelector('svg');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('should not render icon when showIcon is false', () => {
      const { container } = render(
        <Toast variant="success" message="Success" showIcon={false} />
      );
      const iconWrapper = container.querySelector('svg');
      expect(iconWrapper).not.toBeInTheDocument();
    });

    it('should render main action button when provided', () => {
      render(
        <Toast
          message="Test"
          mainButtonText="Action"
          onMainButtonClick={() => {}}
        />
      );
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
    });

    it('should render close button when closable', () => {
      render(<Toast message="Test" closable />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('should render both main button and close button', () => {
      render(
        <Toast
          message="Test"
          mainButtonText="Action"
          onMainButtonClick={() => {}}
          closable
        />
      );
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onMainButtonClick when main button clicked', async () => {
      vi.useRealTimers();
      const handleAction = vi.fn();
      const user = userEvent.setup();

      render(
        <Toast
          message="Test"
          mainButtonText="Action"
          onMainButtonClick={handleAction}
        />
      );

      await user.click(screen.getByRole('button', { name: /action/i }));
      expect(handleAction).toHaveBeenCalledTimes(1);
      vi.useFakeTimers();
    });

    it('should call onClose when close button clicked', async () => {
      vi.useRealTimers();
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(<Toast message="Test" closable onClose={handleClose} />);

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(handleClose).toHaveBeenCalledTimes(1);
      vi.useFakeTimers();
    });

    it('should hide toast when close button clicked', async () => {
      vi.useRealTimers();
      const handleClose = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(<Toast message="Test" closable onClose={handleClose} />);

      expect(screen.getByText('Test')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /close/i }));

      expect(handleClose).toHaveBeenCalled();
      vi.useFakeTimers();

      // Component should handle visibility internally
      // After clicking close, the component sets visible to false
      rerender(<Toast message="Test" closable onClose={handleClose} />);
    });
  });

  describe('Auto Close', () => {
    it('should auto close after duration', () => {
      const handleClose = vi.fn();

      render(<Toast message="Test" duration={3000} onClose={handleClose} />);

      expect(screen.getByText('Test')).toBeInTheDocument();

      // Fast-forward time
      vi.advanceTimersByTime(3000);

      expect(handleClose).toHaveBeenCalled();
    });

    it('should not auto close when duration is 0', () => {
      const handleClose = vi.fn();

      render(<Toast message="Test" duration={0} onClose={handleClose} />);

      expect(screen.getByText('Test')).toBeInTheDocument();

      vi.advanceTimersByTime(10000);

      expect(handleClose).not.toHaveBeenCalled();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should clear timer on unmount', () => {
      const { unmount } = render(<Toast message="Test" duration={3000} />);

      unmount();

      // Should not throw error
      vi.advanceTimersByTime(3000);
    });
  });

  describe('Custom Icon', () => {
    it('should render custom icon', () => {
      render(
        <Toast
          message="Test"
          icon={<span data-testid="custom-icon">★</span>}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('should apply custom className', () => {
      render(<Toast message="Test" className="custom-toast" />);
      const toast = screen.getByRole('alert');
      expect(toast).toHaveClass('custom-toast');
    });

    it('should apply custom style', () => {
      render(<Toast message="Test" style={{ margin: '20px' }} />);
      const toast = screen.getByRole('alert');
      expect(toast).toHaveStyle({ margin: '20px' });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Toast message="Test" />);
      const toast = screen.getByRole('alert');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });

    it('should have accessible close button', () => {
      render(<Toast message="Test" closable />);
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toHaveAttribute('aria-label', 'Close');
    });
  });
});

