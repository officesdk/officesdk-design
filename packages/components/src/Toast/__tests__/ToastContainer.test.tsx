import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { ToastContainer, useToast } from '../ToastContainer';
import React from 'react';

const TestComponent = () => {
  const toast = useToast();

  return (
    <div>
      <button onClick={() => toast.success('Success message')}>
        Show Success
      </button>
      <button onClick={() => toast.info('Info message')}>
        Show Info
      </button>
      <button onClick={() => toast.error('Error message')}>
        Show Error
      </button>
      <button onClick={() => toast.warn('Warning message')}>
        Show Warning
      </button>
      <button onClick={() => toast.info('With action', {
        mainButtonText: 'Action',
        onMainButtonClick: () => console.log('Action clicked'),
      })}>
        Show With Action
      </button>
    </div>
  );
};

describe('ToastContainer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render children', () => {
      render(
        <ToastContainer>
          <div>Test Content</div>
        </ToastContainer>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should not show toasts initially', () => {
      render(
        <ToastContainer>
          <div>Content</div>
        </ToastContainer>
      );
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Toast Methods', () => {
    it('should show success toast', async () => {
      vi.useRealTimers();
      const user = userEvent.setup({ delay: null });

      render(
        <ToastContainer>
          <TestComponent />
        </ToastContainer>
      );

      await user.click(screen.getByText('Show Success'));

      expect(screen.getByText('Success message')).toBeInTheDocument();
      vi.useFakeTimers();
    });

    it('should show info toast', async () => {
      vi.useRealTimers();
      const user = userEvent.setup({ delay: null });

      render(
        <ToastContainer>
          <TestComponent />
        </ToastContainer>
      );

      await user.click(screen.getByText('Show Info'));

      expect(screen.getByText('Info message')).toBeInTheDocument();
      vi.useFakeTimers();
    });

    it('should show error toast', async () => {
      vi.useRealTimers();
      const user = userEvent.setup({ delay: null });

      render(
        <ToastContainer>
          <TestComponent />
        </ToastContainer>
      );

      await user.click(screen.getByText('Show Error'));

      expect(screen.getByText('Error message')).toBeInTheDocument();
      vi.useFakeTimers();
    });

    it('should show warning toast', async () => {
      vi.useRealTimers();
      const user = userEvent.setup({ delay: null });

      render(
        <ToastContainer>
          <TestComponent />
        </ToastContainer>
      );

      await user.click(screen.getByText('Show Warning'));

      expect(screen.getByText('Warning message')).toBeInTheDocument();
      vi.useFakeTimers();
    });

    it('should show toast with action button', async () => {
      vi.useRealTimers();
      const user = userEvent.setup({ delay: null });

      render(
        <ToastContainer>
          <TestComponent />
        </ToastContainer>
      );

      await user.click(screen.getByText('Show With Action'));

      expect(screen.getByText('With action')).toBeInTheDocument();
      const actionButtons = screen.getAllByRole('button');
      expect(actionButtons.some(btn => btn.textContent === 'Action')).toBe(true);
      vi.useFakeTimers();
    });
  });

  describe('Multiple Toasts', () => {
    it('should show multiple toasts', async () => {
      vi.useRealTimers();
      const user = userEvent.setup({ delay: null });

      render(
        <ToastContainer>
          <TestComponent />
        </ToastContainer>
      );

      await user.click(screen.getByText('Show Success'));
      await user.click(screen.getByText('Show Info'));

      expect(screen.getByText('Success message')).toBeInTheDocument();
      expect(screen.getByText('Info message')).toBeInTheDocument();
      vi.useFakeTimers();
    });

    it('should limit toasts to maxCount', async () => {
      vi.useRealTimers();
      const user = userEvent.setup({ delay: null });

      const MultipleToastComponent = () => {
        const toast = useToast();

        const showMany = () => {
          for (let i = 1; i <= 6; i++) {
            toast.info(`Toast ${i}`);
          }
        };

        return <button onClick={showMany}>Show Many</button>;
      };

      render(
        <ToastContainer maxCount={3}>
          <MultipleToastComponent />
        </ToastContainer>
      );

      await user.click(screen.getByText('Show Many'));

      // Should only show last 3 toasts
      expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Toast 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Toast 3')).not.toBeInTheDocument();
      expect(screen.getByText('Toast 4')).toBeInTheDocument();
      expect(screen.getByText('Toast 5')).toBeInTheDocument();
      expect(screen.getByText('Toast 6')).toBeInTheDocument();
      vi.useFakeTimers();
    });
  });

  describe('Auto Close', () => {
    it('should auto close toasts after default duration', async () => {
      vi.useRealTimers();
      const user = userEvent.setup({ delay: null });

      render(
        <ToastContainer defaultDuration={2000}>
          <TestComponent />
        </ToastContainer>
      );

      await user.click(screen.getByText('Show Success'));

      expect(screen.getByText('Success message')).toBeInTheDocument();

      // Wait for auto-close with real timers
      await waitFor(() => {
        expect(screen.queryByText('Success message')).not.toBeInTheDocument();
      }, { timeout: 3000 });

      vi.useFakeTimers();
    });
  });

  describe('Manual Close', () => {
    it('should close toast when close button clicked', async () => {
      vi.useRealTimers();
      const user = userEvent.setup({ delay: null });

      const CloseableToastComponent = () => {
        const toast = useToast();

        return (
          <button onClick={() => toast.info('Closeable toast', { closable: true })}>
            Show Closeable
          </button>
        );
      };

      render(
        <ToastContainer>
          <CloseableToastComponent />
        </ToastContainer>
      );

      await user.click(screen.getByText('Show Closeable'));
      expect(screen.getByText('Closeable toast')).toBeInTheDocument();

      const closeButtons = screen.getAllByRole('button');
      const closeButton = closeButtons.find(btn => btn.getAttribute('aria-label') === 'Close');
      expect(closeButton).toBeDefined();
      await user.click(closeButton!);

      await waitFor(() => {
        expect(screen.queryByText('Closeable toast')).not.toBeInTheDocument();
      });
      vi.useFakeTimers();
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useToast is used outside ToastContainer', () => {
      const TestComponentWithoutContainer = () => {
        const toast = useToast();
        expect(() => toast.success('Test')).toThrow('useToast must be used within ToastContainer');
        return null;
      };

      expect(() => render(<TestComponentWithoutContainer />)).toThrow();
    });
  });
});

