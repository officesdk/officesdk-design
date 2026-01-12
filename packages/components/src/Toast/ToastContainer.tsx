import React, { createContext, useContext, useState, useCallback } from 'react';
import { styled } from '../utils/styled';
import { Toast, ToastProps } from './Toast';

interface ToastItem extends Omit<ToastProps, 'onClose'> {
  id: string;
}



interface ToastContextValue {
  showToast: (props: Omit<ToastProps, 'onClose'>) => string;
  hideToast: (id: string) => void;
  success: (message: React.ReactNode, options?: Partial<ToastProps>) => string;
  info: (message: React.ReactNode, options?: Partial<ToastProps>) => string;
  error: (message: React.ReactNode, options?: Partial<ToastProps>) => string;
  warn: (message: React.ReactNode, options?: Partial<ToastProps>) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastWrapperProps {
  $placement: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
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

export interface ToastContainerProps {
  placement?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
  /**
   * Maximum number of toasts to show at once
   */
  maxCount?: number;
  /**
   * Default duration for auto-close (ms)
   */
  defaultDuration?: number;
  /**
   * Children components
   */
  children: React.ReactNode;
}

/**
 * ToastContainer Component
 *
 * Provides toast context and manages toast display
 *
 * @example
 * <ToastContainer>
 *   <App />
 * </ToastContainer>
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  placement = 'top-right',
  maxCount = 5,
  defaultDuration = 3000,
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((props: Omit<ToastProps, 'onClose'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = {
      ...props,
      id,
      duration: props.duration ?? defaultDuration,
    };

    setToasts((prev) => {
      const updated = [...prev, newToast];
      // Limit to maxCount
      return updated.slice(-maxCount);
    });

    return id;
  }, [maxCount, defaultDuration]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message: React.ReactNode, options?: Partial<ToastProps>) => {
    return showToast({ ...options, variant: 'success', message });
  }, [showToast]);

  const info = useCallback((message: React.ReactNode, options?: Partial<ToastProps>) => {
    return showToast({ ...options, variant: 'info', message });
  }, [showToast]);

  const error = useCallback((message: React.ReactNode, options?: Partial<ToastProps>) => {
    return showToast({ ...options, variant: 'error', message });
  }, [showToast]);

  const warn = useCallback((message: React.ReactNode, options?: Partial<ToastProps>) => {
    return showToast({ ...options, variant: 'warn', message });
  }, [showToast]);

  const contextValue: ToastContextValue = {
    showToast,
    hideToast,
    success,
    info,
    error,
    warn,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastWrapper $placement={placement}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
};

/**
 * Hook to access toast methods
 *
 * @example
 * const toast = useToast();
 * toast.success('Operation successful!');
 * toast.error('Something went wrong');
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastContainer');
  }
  return context;
};

ToastContainer.displayName = 'ToastContainer';

