import { createGlobalStyle } from '../utils/styled';
export const ModalGlobalStyles = createGlobalStyle`
  .osd-modal {
    position: relative;
    width: auto;
    max-height: 100%;
  }

  .osd-modal-mask {
    position: fixed;
    inset: 0;
    background-color: ${({ theme }) => theme.components.modal.message.maskLight};
    height: 100%;
    z-index: ${({ theme }) => theme.components.modal.message.maskZIndex};
  }

  .osd-modal-mask-dark {
    background-color: ${({ theme }) => theme.components.modal.message.maskDark};
  }

  .osd-modal-mask-hidden {
    display: none;
  }

  .osd-modal-wrap {
    position: fixed;
    overflow: auto;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${({ theme }) => theme.components.modal.message.maskZIndex};
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }

  .osd-modal-section {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.components.modal.message.padding};
    background: ${({ theme }) => theme.components.modal.message.background};
    border: ${({ theme }) => theme.components.modal.message.border};
    box-shadow: ${({ theme }) => theme.components.modal.message.shadow};
    border-radius: ${({ theme }) => theme.components.modal.message.borderRadius};
    box-sizing: border-box;
  }

  .osd-modal-section-message {
    max-width: ${({ theme }) => theme.components.modal.message.maxWidth};
    min-width: ${({ theme }) => theme.components.modal.message.minWidth};
    max-height: ${({ theme }) => theme.components.modal.message.maxHeight};
    min-height: ${({ theme }) => theme.components.modal.message.minHeight};
  }

  .osd-modal-section-functional {
    max-width: ${({ theme }) => theme.components.modal.functional.maxWidth};
    min-width: ${({ theme }) => theme.components.modal.functional.minWidth};
    max-height: ${({ theme }) => theme.components.modal.functional.maxHeight};
    min-height: ${({ theme }) => theme.components.modal.functional.minHeight};
  }

  .osd-modal-content-message {
    max-width: ${({ theme }) => theme.components.modal.message.maxWidth};
    min-width: ${({ theme }) => theme.components.modal.message.minWidth};
    max-height: ${({ theme }) => theme.components.modal.message.maxHeight};
    min-height: ${({ theme }) => theme.components.modal.message.minHeight};
  }

  .osd-modal-content-functional {
    max-width: ${({ theme }) => theme.components.modal.functional.maxWidth};
    min-width: ${({ theme }) => theme.components.modal.functional.minWidth};
    max-height: ${({ theme }) => theme.components.modal.functional.maxHeight};
    min-height: ${({ theme }) => theme.components.modal.functional.minHeight};
  }

  .osd-modal-close {
    position: absolute;
    right: 32px;
    top: 24px;
    z-index: 10;
    padding: 2.4px;
    line-height: 1;
    border: 0;
    outline: 0;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .osd-modal-close:hover {
    background: ${({ theme }) => theme.components.modal.message.closeButtonHoverBackground};
  }

  .osd-modal-close:active {
    background: ${({ theme }) => theme.components.modal.message.closeButtonActiveBackground};
  }

  .osd-modal-header {
    margin-bottom: 16px;
    padding-right: 24px;
  }

  .osd-modal-title {
    font-size: ${({ theme }) => theme.components.modal.message.titleFontSize};
    font-weight: ${({ theme }) => theme.components.modal.message.titleFontWeight};
    line-height: ${({ theme }) => theme.components.modal.message.titleLineHeight};
    color: ${({ theme }) => theme.components.modal.message.titleColor};
  }

  .osd-modal-body {
    flex: 1;
    font-size: ${({ theme }) => theme.components.modal.message.bodyFontSize};
    line-height: ${({ theme }) => theme.components.modal.message.bodyLineHeight};
    color: ${({ theme }) => theme.components.modal.message.bodyColor};
  }

  .osd-modal-footer {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .osd-modal.zoom-enter,
  .osd-modal.zoom-appear {
    animation-duration: 0.3s;
    transform: none;
    opacity: 0;
  }

  .osd-modal-open {
    overflow: hidden;
  }
`;
