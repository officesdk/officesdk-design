import React from 'react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import { render } from '../../__tests__/test-utils';
import { Loading } from '../Loading';

describe('Loading', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render spinner when spinning is true', () => {
      render(<Loading spinning />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should not render spinner when spinning is false', () => {
      render(<Loading spinning={false} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('should render with default props', () => {
      render(<Loading />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should render tip when provided', () => {
      render(<Loading tip="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should not render tip when spinning is false', () => {
      render(<Loading tip="Loading..." spinning={false} />);
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      render(<Loading size="small" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should render medium size', () => {
      render(<Loading size="medium" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should render large size', () => {
      render(<Loading size="large" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Delay', () => {
    it('should not show spinner immediately when delay is set', () => {
      render(<Loading delay={500} spinning />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('should show spinner after delay', async () => {
      render(<Loading delay={500} spinning />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      await act(async () => {
        vi.advanceTimersByTime(500);
      });

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should not show spinner if spinning becomes false before delay', async () => {
      const { rerender } = render(<Loading delay={500} spinning />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      rerender(<Loading delay={500} spinning={false} />);

      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  describe('Wrapper Mode', () => {
    it('should render children content', () => {
      render(
        <Loading spinning>
          <div>Test Content</div>
        </Loading>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should show overlay when spinning with children', () => {
      render(
        <Loading spinning>
          <div>Test Content</div>
        </Loading>
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should not show overlay when not spinning with children', () => {
      render(
        <Loading spinning={false}>
          <div>Test Content</div>
        </Loading>
      );
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should show tip in wrapper mode', () => {
      render(
        <Loading spinning tip="Loading content...">
          <div>Test Content</div>
        </Loading>
      );
      expect(screen.getByText('Loading content...')).toBeInTheDocument();
    });
  });

  describe('Fullscreen Mode', () => {
    it('should render fullscreen loading when fullscreen is true', () => {
      render(<Loading fullscreen spinning />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should not render fullscreen loading when spinning is false', () => {
      render(<Loading fullscreen spinning={false} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role="status" for screen readers', () => {
      render(<Loading spinning />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should have aria-label for accessibility', () => {
      render(<Loading spinning />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
    });
  });

  describe('Props', () => {
    it('should apply custom className', () => {
      const { container } = render(<Loading className="custom-loading" />);
      expect(container.querySelector('.custom-loading')).toBeInTheDocument();
    });
  });

  describe('Custom Indicator', () => {
    it('should render custom indicator as string (image URL)', () => {
      render(<Loading indicator="/custom-loading.gif" />);
      const img = screen.getByRole('status');
      expect(img).toHaveAttribute('src', '/custom-loading.gif');
    });

    it('should render custom indicator as React element', () => {
      render(<Loading indicator={<span data-testid="custom-spinner">Loading</span>} />);
      expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
    });

    it('should apply size to custom indicator wrapper', () => {
      const { container } = render(
        <Loading size="large" indicator={<span>Custom</span>} />
      );
      expect(container.querySelector('span[role="status"]')).toBeInTheDocument();
    });
  });
});
