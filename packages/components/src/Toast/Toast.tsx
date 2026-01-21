import React, { useEffect, useState } from 'react';
import { styled } from '../utils/styled';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { getGlobalTheme } from '../utils/context';
import loadingGif from '../assets/loading.gif';

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'children' | 'onClick'> {
  /**
   * Toast variant type
   */
  variant?: 'success' | 'info' | 'error' | 'warn' | 'loading';
  /**
   * Toast message content (main text)
   */
  message: React.ReactNode;
  /**
   * Optional description text (shows below message in multiline mode)
   */
  description?: string;
  /**
   * Main action button text (blue color)
   */
  mainButtonText?: string;
  /**
   * Main action button click handler
   */
  onMainButtonClick?: () => void;
  /**
   * Secondary action button text (gray color)
   */
  secondaryButtonText?: string;
  /**
   * Secondary action button click handler
   */
  onSecondaryButtonClick?: () => void;
  /**
   * Whether to show close button
   */
  closable?: boolean;
  /**
   * Close button click handler
   */
  onClose?: () => void;
  /**
   * Auto close duration in milliseconds (0 to disable)
   */
  duration?: number;
  /**
   * Custom icon (overrides default variant icon)
   */
  icon?: React.ReactNode;
  /**
   * Whether to show icon
   */
  showIcon?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

const ToastContainer = styled.div<{
  $variant: 'success' | 'info' | 'error' | 'warn' | 'loading';
}>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);

  ${({ theme }) => {
    const baseConfig = theme.components.toast;
    return `
      padding: ${baseConfig.padding};
      border-radius: ${baseConfig.borderRadius};
      font-size: ${baseConfig.fontSize};
      font-weight: ${baseConfig.fontWeight};
    `;
  }}

  ${({ $variant, theme }) => {
    const variantConfig = theme.components.toast[$variant];
    return `
      background: ${variantConfig.background};
      border-color: ${variantConfig.borderColor};
    `;
  }}
`;

const IconWrapper = styled.div<{
  $variant: 'success' | 'info' | 'error' | 'warn' | 'loading';
  $hasDescription: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $hasDescription }) => {
    const size = $hasDescription ? '28px' : '18px';
    return `
      width: ${size};
      height: ${size};
    `;
  }}
`;

const ContentWrapper = styled.div<{ $hasDescription: boolean }>`
  display: flex;
  flex-direction: ${({ $hasDescription }) => ($hasDescription ? 'column' : 'row')};
  align-items: ${({ $hasDescription }) => ($hasDescription ? 'flex-start' : 'center')};
  gap: ${({ $hasDescription }) => ($hasDescription ? '2px' : '0')};
  flex: 1;
`;

const Message = styled.span`
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.palettes.gray['100']};
`;

const Description = styled.span`
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.palettes.transparency['60']};
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

// Default icons for each variant
const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" fill="#4ea44b" />
    <path
      d="M6 10L9 13L14 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" fill="#5ba0e7" />
    <path d="M10 9V14M10 6H10.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" fill="#e95555" />
    <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WarnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" fill="#ebe361" />
    <path d="M10 6V11M10 14H10.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIconSvg = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LoadingIcon = () => (
  <img src={loadingGif} alt="Loading" width="20" height="20" />
);

/**
 * Toast Component
 *
 * A notification message component with different variants
 *
 * @example
 * // Single line toast
 * <Toast variant="success" message="信息反馈" />
 *
 * @example
 * // Toast with buttons
 * <Toast
 *   variant="info"
 *   message="信息反馈"
 *   mainButtonText="按钮名称"
 *   onMainButtonClick={() => console.log('Main clicked')}
 *   secondaryButtonText="按钮名称"
 *   onSecondaryButtonClick={() => console.log('Secondary clicked')}
 *   closable
 * />
 *
 * @example
 * // Multi-line toast with description
 * <Toast
 *   variant="success"
 *   message="信息反馈"
 *   description="信息具体说明"
 *   mainButtonText="按钮名称"
 *   closable
 * />
 */
export const Toast: React.FC<ToastProps> = ({
  variant = 'info' as 'success' | 'info' | 'error' | 'warn' | 'loading',
  message,
  description,
  mainButtonText,
  onMainButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
  closable = false,
  onClose,
  duration = 0,
  icon,
  showIcon = true,
  className,
  style,
  ...restProps
}) => {
  const [visible, setVisible] = useState(true);

  // Auto close after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) {
    return null;
  }

  // Icon priority: props.icon > theme icon > default icon
  const getIconElement = () => {
    // 1. If icon prop is provided, use it
    if (icon) {
      return icon;
    }

    // 2. Try to get icon from theme
    const theme = getGlobalTheme();
    const themeIconUrl = theme?.components?.toast?.[variant]?.icon?.url;
    if (themeIconUrl) {
      return <Icon src={themeIconUrl} />;
    }

    // 3. Use default icon as fallback
    const defaultIcons = {
      success: <SuccessIcon />,
      info: <InfoIcon />,
      error: <ErrorIcon />,
      warn: <WarnIcon />,
      loading: <LoadingIcon />,
    };
    return defaultIcons[variant];
  };

  const iconElement = getIconElement();
  const hasDescription = !!description;
  const hasActions = !!(mainButtonText || secondaryButtonText || closable);

  return (
    <ToastContainer
      $variant={variant}
      className={className}
      style={style}
      role="alert"
      aria-live="polite"
      {...restProps}
    >
      {showIcon && (
        <IconWrapper $variant={variant} $hasDescription={hasDescription}>
          {iconElement}
        </IconWrapper>
      )}

      <ContentWrapper $hasDescription={hasDescription}>
        <Message>{message}</Message>
        {description && <Description>{description}</Description>}
      </ContentWrapper>

      {hasActions && (
        <ActionGroup>
          {mainButtonText && onMainButtonClick && (
            <Button variant="text" colorType="guidance" size="small" onClick={onMainButtonClick}>
              {mainButtonText}
            </Button>
          )}

          {secondaryButtonText && onSecondaryButtonClick && (
            <Button
              variant="text"
              colorType="default"
              size="small"
              onClick={onSecondaryButtonClick}
            >
              {secondaryButtonText}
            </Button>
          )}

          {closable && (
            <Button
              variant="icon"
              colorType="default"
              size="small"
              onClick={handleClose}
              aria-label="Close"
              icon={<CloseIconSvg />}
              iconBordered={false}
            />
          )}
        </ActionGroup>
      )}
    </ToastContainer>
  );
};

Toast.displayName = 'Toast';
