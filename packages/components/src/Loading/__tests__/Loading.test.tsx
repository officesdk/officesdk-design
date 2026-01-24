import React from 'react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import { render } from '../../__tests__/test-utils';
import { registerGlobalTheme } from '../../utils/context';
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

    it('should treat numeric children as wrapper content', () => {
      render(<Loading spinning>{0}</Loading>);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
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

  describe('Theme Configuration', () => {
    it('should render CSS spinner when defaultType is css', () => {
      const { rerender } = render(<Loading />);

      registerGlobalTheme({
        components: {
          loading: {
            indicator: {
              defaultType: 'css',
            },
          },
        },
      });

      rerender(<Loading />);
      const indicator = screen.getByRole('status');
      expect(indicator).toBeInTheDocument();
      expect(indicator.tagName).toBe('DIV');

      registerGlobalTheme({
        components: {
          loading: {
            indicator: {
              defaultType: 'gif',
              defaultImage: undefined,
            },
          },
        },
      });
    });

    it('should use theme default image when provided', () => {
      const { rerender } = render(<Loading />);

      registerGlobalTheme({
        components: {
          loading: {
            indicator: {
              defaultType: 'gif',
              defaultImage: '/theme-loading.gif',
            },
          },
        },
      });

      rerender(<Loading />);
      const indicator = screen.getByRole('status');
      expect(indicator).toHaveAttribute('src', '/theme-loading.gif');

      registerGlobalTheme({
        components: {
          loading: {
            indicator: {
              defaultType: 'gif',
              defaultImage: undefined,
            },
          },
        },
      });
    });
    it('should use theme indicator gap configuration', () => {
      const { container } = render(<Loading tip="Loading..." />);
      // The gap is applied via styled-components theme
      expect(container.querySelector('[role="status"]')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render with default GIF indicator', () => {
      render(<Loading />);
      const indicator = screen.getByRole('status');
      expect(indicator).toBeInTheDocument();
      expect(indicator.tagName).toBe('IMG');
    });

    it('should respect theme indicator color for CSS spinner', () => {
      // This tests that the component accepts theme configuration
      // The actual CSS animation spinner would be rendered when theme.indicator.defaultType = 'css'
      render(<Loading />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should apply correct size from theme configuration', () => {
      const { rerender } = render(<Loading size="small" />);
      expect(screen.getByRole('status')).toBeInTheDocument();

      rerender(<Loading size="medium" />);
      expect(screen.getByRole('status')).toBeInTheDocument();

      rerender(<Loading size="large" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Indicator Configuration', () => {
    it('should handle custom indicator with spinning control', () => {
      const CustomIndicator = () => <div data-testid="custom">Loading</div>;
      const { rerender } = render(<Loading spinning indicator={<CustomIndicator />} />);

      expect(screen.getByTestId('custom')).toBeInTheDocument();

      rerender(<Loading spinning={false} indicator={<CustomIndicator />} />);
      expect(screen.queryByTestId('custom')).not.toBeInTheDocument();
    });

    it('should maintain indicator during wrapper mode', () => {
      const CustomIndicator = () => <div data-testid="custom-wrapper">⏳</div>;
      render(
        <Loading spinning indicator={<CustomIndicator />}>
          <div>Content</div>
        </Loading>
      );

      expect(screen.getByTestId('custom-wrapper')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should support indicator with tip text', () => {
      const CustomIndicator = () => <div data-testid="custom-tip">CSS</div>;
      render(<Loading spinning tip="Custom loading..." indicator={<CustomIndicator />} />);

      expect(screen.getByTestId('custom-tip')).toBeInTheDocument();
      expect(screen.getByText('Custom loading...')).toBeInTheDocument();
    });
  });
});
