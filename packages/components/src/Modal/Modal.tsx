import React, { useCallback, useEffect } from 'react';
import RcDialog from 'rc-dialog';
import type { DialogProps } from 'rc-dialog';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { ModalGlobalStyles } from './globalStyle';
import { styleManager } from '../utils/styleManager';
import { getGlobalTheme } from '../utils/context';
import type { ModalConfig } from '@officesdk/design/theme';

export interface ModalProps extends DialogProps {
  /**
   * Whether the modal is visible
   */
  visible?: boolean;
  /**
   * Modal variant type
   * - 'message': Message dialog (max 400px, min 360px)
   * - 'functional': Functional dialog (default 640px, max 800px, min 400px)
   */
  variant?: 'message' | 'functional';
  /**
   * Mask layer type
   * - 'light': Light mask (rgba(65,70,75,0.5))
   * - 'dark': Dark mask (rgba(44,48,51,0.8))
   */
  maskType?: 'light' | 'dark';
  /**
   * Modal title
   */
  title?: React.ReactNode;
  /**
   * Modal width
   */
  width?: string | number;
  /**
   * Modal height
   */
  height?: string | number;
  /**
   * Whether to show mask
   */
  mask?: boolean;
  /**
   * Whether to close modal when clicking mask
   */
  maskClosable?: boolean;
  /**
   * Whether to show close button
   */
  closable?: boolean;
  /**
   * OK button text, set to null to hide
   */
  okText?: string | null;
  /**
   * Cancel button text, set to null to hide
   */
  cancelText?: string | null;
  /**
   * Whether OK button is disabled
   */
  disabledOkButton?: boolean;
  /**
   * Custom footer, set to null to hide footer
   */
  footer?: React.ReactNode;
  /**
   * Callback when OK button is clicked
   */
  onOk?: (e: React.MouseEvent) => void;
  /**
   * Callback when Cancel button is clicked or modal is closed
   */
  onCancel?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Modal content
   */
  children?: React.ReactNode;
  /**
   * CSS class prefix
   */
  prefixCls?: string;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * z-index of the modal
   */
  zIndex?: number;
  /**
   * Whether to destroy modal on close
   */
  destroyOnClose?: boolean;
  /**
   * Whether to focus on modal when opened
   */
  focusTriggerAfterClose?: boolean;
  /**
   * Return the mount node for Modal
   */
  getContainer?: () => HTMLElement;
}

/**
 * Modal Component
 *
 * A dialog component for displaying content in a layer above the page.
 *
 * @example
 * // Basic usage
 * <Modal
 *   visible={visible}
 *   title="Modal Title"
 *   onOk={handleOk}
 *   onCancel={handleCancel}
 * >
 *   Modal content
 * </Modal>
 *
 * @example
 * // Custom footer
 * <Modal
 *   visible={visible}
 *   title="Custom Footer"
 *   footer={<Button onClick={handleClose}>Close</Button>}
 *   onCancel={handleCancel}
 * >
 *   Modal content
 * </Modal>
 *
 * @example
 * // No footer
 * <Modal
 *   visible={visible}
 *   title="No Footer"
 *   footer={null}
 *   onCancel={handleCancel}
 * >
 *   Modal content
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  visible = false,
  variant = 'message',
  maskType = 'light',
  title,
  width,
  okText,
  cancelText,
  footer,
  onOk,
  onCancel,
  onClose,
  disabledOkButton = false,
  prefixCls = 'osd-modal',
  closable = true,
  closeIcon,
  mask = true,
  maskClosable = true,
  className,
  children,
  ...restProps
}) => {
  const handleClose = useCallback(
    (e: React.SyntheticEvent) => {
      onClose?.(e);
      onCancel?.(e as React.MouseEvent | React.KeyboardEvent);
    },
    [onClose, onCancel]
  );

  // Inject styles on first render using styleManager
  useEffect(() => {
    styleManager.inject('osd-modal-styles', ModalGlobalStyles);
  }, []);

  // Get theme with modal config
  const theme = getGlobalTheme() as unknown as {
    components: {
      modal: ModalConfig;
    };
  };

  // Calculate default width based on variant using theme values
  const getDefaultWidth = () => {
    if (width !== undefined) return width;
    switch (variant) {
      case 'functional':
        return theme.components.modal.functional.defaultWidth;
      case 'message':
      default:
        return theme.components.modal.message.defaultWidth;
    }
  };

  // Build className for modal content based on variant
  const getContentClassName = () => {
    switch (variant) {
      case 'message':
        return `${prefixCls}-content-message`;
      case 'functional':
        return `${prefixCls}-content-functional`;
      default:
        return `${prefixCls}-content-message`;
    }
  };
  const contentClassName = getContentClassName();

  // Build className for mask
  const maskClassName = maskType === 'dark' ? `${prefixCls}-mask-dark` : undefined;

  // Build default footer
  let defaultFooter: React.ReactNode = null;
  if (footer === undefined) {
    const okButton =
      okText === null ? null : (
        <Button
          key="confirm"
          variant="solid"
          colorType="guidance"
          onClick={onOk}
          disabled={disabledOkButton}
        >
          {okText ?? 'OK'}
        </Button>
      );

    const cancelButton =
      cancelText === null ? null : (
        <Button key="cancel" variant="outlined" colorType="default" onClick={(e) => handleClose(e)}>
          {cancelText ?? 'Cancel'}
        </Button>
      );

    defaultFooter = (
      <>
        {cancelButton}
        {okButton}
      </>
    );
  }

  // Build classNames for semantic elements (mask and content)
  const semanticClassNames: Record<string, string> = {};
  if (maskClassName) {
    semanticClassNames.mask = maskClassName;
  }
  if (contentClassName) {
    semanticClassNames.content = contentClassName;
  }

  // Build styles to apply width to content instead of root
  const semanticStyles: Record<string, React.CSSProperties> = {};
  if (width !== undefined) {
    semanticStyles.content = { width };
  }

  return (
    <RcDialog
      {...restProps}
      visible={visible}
      title={title}
      width={width === undefined ? getDefaultWidth() : undefined}
      prefixCls={prefixCls}
      closable={closable}
      closeIcon={closeIcon ?? <Icon name="close" size={16} />}
      mask={mask}
      maskClosable={maskClosable}
      classNames={Object.keys(semanticClassNames).length > 0 ? semanticClassNames : undefined}
      styles={Object.keys(semanticStyles).length > 0 ? semanticStyles : undefined}
      className={className}
      onClose={handleClose}
      footer={footer === undefined ? defaultFooter : footer}
    >
      {children}
    </RcDialog>
  );
};

Modal.displayName = 'Modal';
