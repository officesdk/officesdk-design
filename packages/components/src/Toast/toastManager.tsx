import React from 'react';
import { ToastProps } from './Toast';
import { Toast } from './Toast';
import { styled } from '../utils/styled';

type ToastPlacement =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

interface ToastItem extends Omit<ToastProps, 'onClose'> {
  id: string;
  placement?: ToastPlacement;
}

interface ToastContainerConfig {
  placement?: ToastPlacement;
  maxCount?: number;
  defaultDuration?: number;
}

type RenderFunction = (element: React.ReactElement, container: HTMLElement) => void;

interface ToastWrapperProps {
  $placement:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center';
}

const ToastWrapper = styled.div<ToastWrapperProps>`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  ${({ $placement, theme }) => {
    const offset = theme.components?.toast?.offset || { vertical: '24px', horizontal: '24px' };
    const vertical = offset.vertical || '24px';
    const horizontal = offset.horizontal || '24px';

    const styles: Record<string, string> = {
      'top-right': `
        top: ${vertical};
        right: ${horizontal};
      `,
      'top-left': `
        top: ${vertical};
        left: ${horizontal};
      `,
      'top-center': `
        top: ${vertical};
        left: 50%;
        transform: translateX(-50%);
      `,
      'bottom-right': `
        bottom: ${vertical};
        right: ${horizontal};
      `,
      'bottom-left': `
        bottom: ${vertical};
        left: ${horizontal};
      `,
      'bottom-center': `
        bottom: ${vertical};
        left: 50%;
        transform: translateX(-50%);
      `,
    };

    return styles[$placement] || styles['top-right'];
  }}
`;

class ToastManager {
  private toasts: ToastItem[] = [];
  private container: HTMLDivElement | null = null;
  private renderFunc: RenderFunction | null = null;
  private config: ToastContainerConfig = {
    placement: 'top-right',
    maxCount: 5,
    defaultDuration: 3000,
  };

  constructor() {
    // Try to get render function from global context
    this.tryGetRenderFunction();
  }

  /**
   * Try to get render function from global context
   */
  private tryGetRenderFunction() {
    if (typeof window !== 'undefined') {
      import('../utils/context')
        .then(({ getGlobalRenderFunction }) => {
          const renderFunc = getGlobalRenderFunction();
          if (renderFunc) {
            this.renderFunc = renderFunc;
          }
        })
        .catch(() => {
          // Context not available yet
        });
    }
  }

  /**
   * Set render function (from registerGlobalContext)
   */
  setRenderFunction(renderFunc: RenderFunction) {
    this.renderFunc = renderFunc;
  }

  /**
   * Initialize the toast container
   */
  private initialize() {
    if (this.container) return;

    if (!this.renderFunc) {
      console.warn('Toast render function not set. Please call registerGlobalContext first.');
      return;
    }

    // Create container element
    this.container = document.createElement('div');
    this.container.id = 'officesdk-toast-container';
    document.body.appendChild(this.container);

    this.render();
  }

  /**
   * Render toasts to DOM
   */
  private render() {
    if (!this.container || !this.renderFunc) return;

    const element = (
      <>
        {this.toasts.map((toast) => {
          return <ToastWrapper key={toast.id} $placement={toast.placement || 'top-center'}>
            <Toast  {...toast} onClose={() => this.hide(toast.id)} />
          </ToastWrapper>
        })}
      </>
    );

    this.renderFunc(element, this.container);
  }

  /**
   * Configure toast container
   */
  configure(config: ToastContainerConfig) {
    this.config = { ...this.config, ...config };
    this.render();
  }

  /**
   * Show a toast
   */
  show(props: Omit<ToastProps, 'onClose'>): string {
    this.initialize();

    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = {
      ...props,
      id,
      duration: props.duration ?? this.config.defaultDuration,
    };

    this.toasts = [...this.toasts, newToast].slice(-(this.config.maxCount || 5));
    this.render();

    return id;
  }

  /**
   * Hide a toast by id
   */
  hide(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.render();
  }

  /**
   * Hide all toasts
   */
  hideAll() {
    this.toasts = [];
    this.render();
  }

  /**
   * Show success toast
   */
  success(message: React.ReactNode, options?: Partial<ToastProps>): string {
    return this.show({ ...options, variant: 'success', message });
  }

  /**
   * Show info toast
   */
  info(message: React.ReactNode, options?: Partial<ToastProps>): string {
    return this.show({ ...options, variant: 'info', message });
  }

  /**
   * Show error toast
   */
  error(message: React.ReactNode, options?: Partial<ToastProps>): string {
    return this.show({ ...options, variant: 'error', message });
  }

  /**
   * Show warning toast
   */
  warn(message: React.ReactNode, options?: Partial<ToastProps>): string {
    return this.show({ ...options, variant: 'warn', message });
  }

  /**
   * Destroy the toast container
   */
  destroy() {
    if (this.container) {
      // Clear container content
      if (this.renderFunc) {
        // Render empty to unmount components
        this.renderFunc(<></>, this.container);
      }
      // Remove from DOM
      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      this.container = null;
    }
    this.toasts = [];
  }

  /**
   * Get current toasts
   */
  getToasts(): ToastItem[] {
    return this.toasts;
  }

  /**
   * Clear all toasts (for testing)
   */
  clear() {
    this.toasts = [];
    this.render();
  }
}

// Global singleton instance
const toastManager = new ToastManager();

/**
 * Global toast object that can be used anywhere
 * No need to render ToastContainer component manually
 *
 * @example
 * import { toast } from '@officesdk/design';
 *
 * // Configure (optional)
 * toast.configure({
 *   placement: 'top-right',
 *   maxCount: 5,
 *   defaultDuration: 3000,
 * });
 *
 * // Show toasts
 * toast.success('Operation successful!');
 * toast.error('Something went wrong');
 * toast.info('Info message', { duration: 5000 });
 * toast.warn('Warning message');
 *
 * const id = toast.show({ variant: 'info', message: 'Custom toast' });
 * toast.hide(id);
 * toast.hideAll();
 */
export const toast = {
  configure: (config: ToastContainerConfig) => toastManager.configure(config),
  show: (props: Omit<ToastProps, 'onClose'>) => toastManager.show(props),
  hide: (id: string) => toastManager.hide(id),
  hideAll: () => toastManager.hideAll(),
  success: (message: React.ReactNode, options?: Partial<ToastProps>) =>
    toastManager.success(message, options),
  info: (message: React.ReactNode, options?: Partial<ToastProps>) => toastManager.info(message, options),
  error: (message: React.ReactNode, options?: Partial<ToastProps>) => toastManager.error(message, options),
  warn: (message: React.ReactNode, options?: Partial<ToastProps>) => toastManager.warn(message, options),
  destroy: () => toastManager.destroy(),
};

// Export manager for internal use
export { toastManager };
export type { ToastItem, ToastContainerConfig };
