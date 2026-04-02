import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import { render } from '../../__tests__/test-utils';
import { LoadingOverlay } from '../LoadingOverlay';

describe('LoadingOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render nothing when spinning is false', () => {
    const { container } = render(<LoadingOverlay spinning={false} />);
    expect(container.querySelector('[role="status"]')).not.toBeInTheDocument();
    expect(container.querySelector('.custom-loading-overlay')).not.toBeInTheDocument();
  });

  it('should render overlay root as div when spinning is true', () => {
    const { container } = render(
      <div style={{ position: 'relative' }}>
        <div>Panel Content</div>
        <LoadingOverlay spinning />
      </div>
    );

    expect(container.querySelector('[role="status"]')).toBeInTheDocument();
    expect(container.firstElementChild?.lastElementChild?.tagName).toBe('DIV');
  });

  it('should respect delay before showing', async () => {
    render(
      <div style={{ position: 'relative' }}>
        <LoadingOverlay delay={500} spinning />
      </div>
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should render tip text', () => {
    render(
      <div style={{ position: 'relative' }}>
        <LoadingOverlay spinning tip="Loading panel..." />
      </div>
    );

    expect(screen.getByText('Loading panel...')).toBeInTheDocument();
  });

  it('should apply className to overlay root', () => {
    const { container } = render(
      <div style={{ position: 'relative' }}>
        <LoadingOverlay spinning className="custom-loading-overlay" />
      </div>
    );

    expect(container.querySelector('.custom-loading-overlay')).toBeInTheDocument();
  });

  it('should render custom indicator', () => {
    render(
      <div style={{ position: 'relative' }}>
        <LoadingOverlay spinning indicator={<span data-testid="custom-overlay">Loading</span>} />
      </div>
    );

    expect(screen.getByTestId('custom-overlay')).toBeInTheDocument();
  });

  it('should support transparent overlay background', () => {
    const { container } = render(
      <div style={{ position: 'relative' }}>
        <LoadingOverlay spinning transparent />
      </div>
    );

    expect(container.firstElementChild?.lastElementChild).toHaveStyle({
      background: 'transparent',
    });
  });
});
