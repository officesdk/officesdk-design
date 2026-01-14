import { createGlobalStyle } from 'styled-components';
import { getGlobalTheme } from '../utils/context';
import type { ModalConfig } from '@officesdk/design/theme';

// Get theme with modal config type assertion
const theme = getGlobalTheme() as unknown as {
  components: {
    modal: ModalConfig;
  };
};

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
    background-color: ${() => theme.components.modal.default.maskLight};
    height: 100%;
    z-index: 1000;
  }

  .osd-modal-mask-dark {
    background-color: ${() => theme.components.modal.default.maskDark};
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
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }

  .osd-modal-section {
    position: relative;
    padding: ${() => theme.components.modal.default.padding};
    background: ${() => theme.components.modal.default.background};
    border: ${() => theme.components.modal.default.border};
    box-shadow: ${() => theme.components.modal.default.shadow};
    border-radius: ${() => theme.components.modal.default.borderRadius};
    box-sizing: border-box;
  }

  .osd-modal-section-blue {
    background: ${() => theme.components.modal.blue.background};
    border: ${() => theme.components.modal.blue.border};
    border-radius: ${() => theme.components.modal.blue.borderRadius};
  }

  .osd-modal-section-message {
    max-width: ${() => theme.components.modal.message.maxWidth};
    min-width: ${() => theme.components.modal.message.minWidth};
    max-height: ${() => theme.components.modal.message.maxHeight};
    min-height: ${() => theme.components.modal.message.minHeight};
  }

  .osd-modal-section-functional {
    max-width: ${() => theme.components.modal.functional.maxWidth};
    min-width: ${() => theme.components.modal.functional.minWidth};
    max-height: ${() => theme.components.modal.functional.maxHeight};
    min-height: ${() => theme.components.modal.functional.minHeight};
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
  }

  .osd-modal-close:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .osd-modal-close:active {
    background: rgba(0, 0, 0, 0.08);
  }

  .osd-modal-close-x {
    display: block;
    width: 20px;
    height: 20px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.348 3.465a.625.625 0 1 0-.884.883L7.116 8l-3.651 3.652a.625.625 0 1 0 .883.884L8 8.884l3.652 3.652a.625.625 0 1 0 .883-.884L8.884 8l3.652-3.652a.625.625 0 1 0-.884-.883L8 7.116 4.348 3.465z' fill='%23141414'/%3E%3C/svg%3E");
  }

  .osd-modal-header {
    margin-bottom: ${() => theme.components.modal.default.headerMarginBottom};
    padding-right: 24px;
  }

  .osd-modal-title {
    font-size: ${() => theme.components.modal.default.titleFontSize};
    font-weight: ${() => theme.components.modal.default.titleFontWeight};
    line-height: ${() => theme.components.modal.default.titleLineHeight};
    color: ${() => theme.components.modal.default.titleColor};
  }

  .osd-modal-body {
    font-size: ${() => theme.components.modal.default.bodyFontSize};
    line-height: ${() => theme.components.modal.default.bodyLineHeight};
    color: ${() => theme.components.modal.default.bodyColor};
  }

  .osd-modal-footer {
    margin-top: ${() => theme.components.modal.default.footerMarginTop};
    display: flex;
    justify-content: flex-end;
    gap: ${() => theme.components.modal.default.footerGap};
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
