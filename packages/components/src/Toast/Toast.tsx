import React, { useEffect, useState } from 'react';
import { styled } from '../utils/styled';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { getGlobalTheme } from '../utils/context';
import loadingGif from '../assets/loading.gif';

export type ToastVariant = 'success' | 'info' | 'error' | 'warn' | 'loading' | 'critical';

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'children' | 'onClick'> {
  /**
   * Toast variant type
   */
  variant?: ToastVariant;
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
  $variant: ToastVariant;
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
  $variant: ToastVariant;
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

const Message = styled.span<{ $variant: ToastVariant }>`
  font-size: 13px;
  line-height: 20px;
  color: ${({ $variant, theme }) => theme.components.toast[$variant].message.color};
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
const SuccessIcon = (props: { width: string; height: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 20 20" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17ZM14.3081 6.87917C14.6833 7.2543 14.6833 7.86249 14.3081 8.23762L8.3458 14.2L5.26516 11.1193C4.89004 10.7442 4.89004 10.136 5.26516 9.76087C5.64028 9.38575 6.24848 9.38575 6.62361 9.76087L8.3458 11.4831L12.9497 6.87917C13.3248 6.50405 13.933 6.50405 14.3081 6.87917Z" fill="#4EA44B"/>
  </svg>
);

const InfoIcon = (props: { width: string; height: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 20 20" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17ZM11.1831 6.77603C11.1831 7.40257 10.6752 7.91048 10.0487 7.91048C9.42216 7.91048 8.91425 7.40257 8.91425 6.77603C8.91425 6.14949 9.42216 5.64158 10.0487 5.64158C10.6752 5.64158 11.1831 6.14949 11.1831 6.77603ZM10.0482 8.81801L8.45999 9.21507C8.33468 9.24639 8.25849 9.37337 8.28982 9.49868C8.32115 9.62399 8.44812 9.70017 8.57343 9.66885L8.9986 9.56255C9.11775 9.53276 9.22756 9.63669 9.20437 9.7573L8.68688 12.4482C8.57343 13.5827 9.48099 13.923 10.3886 13.8096C11.0411 13.728 11.5043 13.2358 11.6982 12.8908C11.7332 12.8286 11.7259 12.7526 11.6863 12.6932C11.6066 12.5736 11.4347 12.5707 11.3372 12.6764C11.1857 12.8406 10.9715 13.0155 10.7289 13.0155C10.3886 13.0155 10.3507 12.8264 10.3886 12.6751L10.9558 9.72556C11.0692 8.93145 10.3129 8.74238 10.0482 8.81801Z" fill="#6DA0E3"/>
</svg>

);

const ErrorIcon = (props: { width: string; height: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 20 20" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17ZM6.66684 13.3332C7.03502 13.7014 7.63197 13.7014 8.00015 13.3332L10 11.3334L11.9999 13.3333C12.3681 13.7015 12.9651 13.7015 13.3332 13.3333C13.7014 12.9651 13.7014 12.3682 13.3332 12L11.3333 10.0001L13.3334 7.99995C13.7016 7.63177 13.7016 7.03482 13.3334 6.66664C12.9652 6.29845 12.3683 6.29845 12.0001 6.66664L10 8.66674L7.99997 6.66672C7.63179 6.29853 7.03484 6.29853 6.66666 6.66672C6.29847 7.0349 6.29847 7.63185 6.66666 8.00003L8.66668 10.0001L6.66684 11.9999C6.29865 12.3681 6.29865 12.965 6.66684 13.3332Z" fill="#E95555"/>
  </svg>
);

const WarnIcon = (props: { width: string; height: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 20 20" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM9.00868 6.12383C8.9336 5.52726 9.39866 5 9.99994 5C10.6012 5 11.0663 5.52726 10.9912 6.12383L10.3775 11H9.62237L9.00868 6.12383ZM8.79999 14C8.79999 13.3373 9.33725 12.8 9.99999 12.8C10.6627 12.8 11.2 13.3373 11.2 14C11.2 14.6627 10.6627 15.2 9.99999 15.2C9.33725 15.2 8.79999 14.6627 8.79999 14Z" fill="#F5D57A"/>
  </svg>
);

const CriticalIcon = (props: { width: string; height: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 20 20" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM9.00868 6.12383C8.9336 5.52726 9.39866 5 9.99994 5C10.6012 5 11.0663 5.52726 10.9912 6.12383L10.3775 11H9.62237L9.00868 6.12383ZM8.79999 14C8.79999 13.3373 9.33725 12.8 9.99999 12.8C10.6627 12.8 11.2 13.3373 11.2 14C11.2 14.6627 10.6627 15.2 9.99999 15.2C9.33725 15.2 8.79999 14.6627 8.79999 14Z" fill="#E95555"/>
  </svg>
);

const DefaultIconSvg = (  ) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LoadingIcon = (props: { width: string; height: string }) => (
  <img src={loadingGif} alt="Loading" width={props.width} height={props.height} />
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
  variant = 'info',
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
    const variantIcon = theme?.components?.toast?.[variant]?.icon;
    if (variantIcon.url) {
      return <Icon src={variantIcon.url} size={variantIcon.size} />;
    }

    // 3. Use default icon as fallback
    const defaultIcons = {
      success: <SuccessIcon width={variantIcon.size.width} height={variantIcon.size.height}/>,
      info: <InfoIcon width={variantIcon.size.width} height={variantIcon.size.height}/>,
      error: <ErrorIcon width={variantIcon.size.width} height={variantIcon.size.height}/>,
      warn: <WarnIcon width={variantIcon.size.width} height={variantIcon.size.height}/>,
      critical: <CriticalIcon width={variantIcon.size.width} height={variantIcon.size.height}/>,
      loading: <LoadingIcon width={variantIcon.size.width} height={variantIcon.size.height}/>,
    };
    return defaultIcons[variant];
  };

  const theme = getGlobalTheme();
  const toastConfig = theme?.components?.toast;

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
        <Message $variant={variant}>{message}</Message>
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
              icon={ toastConfig.closeButton.icon.url ? toastConfig.closeButton.icon.url : <DefaultIconSvg /> }
              iconBordered={false}
            />
          )}
        </ActionGroup>
      )}
    </ToastContainer>
  );
};

Toast.displayName = 'Toast';
