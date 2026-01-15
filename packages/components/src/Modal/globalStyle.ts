import { createGlobalStyle } from '../utils/styled';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ModalGlobalStyles = createGlobalStyle`
  .osd-modal {
    position: relative;
    width: auto;
    max-height: 100%;
  }

  .osd-modal-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: ${(props: any) => props.theme.components.modal.message.maskLight};
    height: 100%;
    z-index: ${(props: any) => props.theme.components.modal.message.maskZIndex};
  }

  .osd-modal-mask-dark {
    background-color: ${(props: any) => props.theme.components.modal.message.maskDark};
  }

  .osd-modal-mask-hidden {
    display: none;
  }

  .osd-modal-wrap {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${(props: any) => props.theme.components.modal.message.maskZIndex};
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }

  .osd-modal-section {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: ${(props: any) => props.theme.components.modal.message.padding};
    background: ${(props: any) => props.theme.components.modal.message.background};
    border: ${(props: any) => props.theme.components.modal.message.border};
    box-shadow: ${(props: any) => props.theme.components.modal.message.shadow};
    border-radius: ${(props: any) => props.theme.components.modal.message.borderRadius};
    box-sizing: border-box;
  }

  .osd-modal-section-message {
    max-width: ${(props: any) => props.theme.components.modal.message.maxWidth};
    min-width: ${(props: any) => props.theme.components.modal.message.minWidth};
    max-height: ${(props: any) => props.theme.components.modal.message.maxHeight};
    min-height: ${(props: any) => props.theme.components.modal.message.minHeight};
  }

  .osd-modal-section-functional {
    max-width: ${(props: any) => props.theme.components.modal.functional.maxWidth};
    min-width: ${(props: any) => props.theme.components.modal.functional.minWidth};
    max-height: ${(props: any) => props.theme.components.modal.functional.maxHeight};
    min-height: ${(props: any) => props.theme.components.modal.functional.minHeight};
  }

  .osd-modal-content-message {
    max-width: ${(props: any) => props.theme.components.modal.message.maxWidth};
    min-width: ${(props: any) => props.theme.components.modal.message.minWidth};
    max-height: ${(props: any) => props.theme.components.modal.message.maxHeight};
    min-height: ${(props: any) => props.theme.components.modal.message.minHeight};
  }

  .osd-modal-content-functional {
    max-width: ${(props: any) => props.theme.components.modal.functional.maxWidth};
    min-width: ${(props: any) => props.theme.components.modal.functional.minWidth};
    max-height: ${(props: any) => props.theme.components.modal.functional.maxHeight};
    min-height: ${(props: any) => props.theme.components.modal.functional.minHeight};
  }

  .osd-modal-close {
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 10;
    padding: 4px;
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
    background: ${(props: any) => props.theme.components.modal.message.closeButtonHoverBackground};
  }

  .osd-modal-close:active {
    background: ${(props: any) => props.theme.components.modal.message.closeButtonActiveBackground};
  }

  .osd-modal-header {
    margin-bottom: 16px;
    padding-right: 24px;
  }

  .osd-modal-title {
    font-size: ${(props: any) => props.theme.components.modal.message.titleFontSize};
    font-weight: ${(props: any) => props.theme.components.modal.message.titleFontWeight};
    line-height: ${(props: any) => props.theme.components.modal.message.titleLineHeight};
    color: ${(props: any) => props.theme.components.modal.message.titleColor};
  }

  .osd-modal-body {
    flex: 1;
    font-size: ${(props: any) => props.theme.components.modal.message.bodyFontSize};
    line-height: ${(props: any) => props.theme.components.modal.message.bodyLineHeight};
    color: ${(props: any) => props.theme.components.modal.message.bodyColor};
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
