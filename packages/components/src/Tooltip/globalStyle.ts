import {  createGlobalStyle } from 'styled-components';


const paddingDistance = '5px';
const positionDistance = '0'

// Tooltip global styles - includes base styles and all variant/size combinations
export const TooltipGlobalStyles = createGlobalStyle`
  .rc-tooltip {
    opacity: 1;
  }

  .rc-tooltip-hidden {
    display: none;
  }

  .rc-tooltip-placement-top,
  .rc-tooltip-placement-topLeft,
  .rc-tooltip-placement-topRight {
    padding-bottom: ${paddingDistance};
  }

  .rc-tooltip-placement-right,
  .rc-tooltip-placement-rightTop,
  .rc-tooltip-placement-rightBottom {
    padding-left: ${paddingDistance};
  }

  .rc-tooltip-placement-bottom,
  .rc-tooltip-placement-bottomLeft,
  .rc-tooltip-placement-bottomRight {
    padding-top: ${paddingDistance};
  }

  .rc-tooltip-placement-left,
  .rc-tooltip-placement-leftTop,
  .rc-tooltip-placement-leftBottom {
    padding-right: ${paddingDistance};
  }

  .rc-tooltip-inner {
    word-wrap: break-word;
    min-height: unset;
  }

  .rc-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  .rc-tooltip.rc-tooltip-zoom-enter,
  .rc-tooltip.rc-tooltip-zoom-leave {
    display: block;
  }

  .rc-tooltip-zoom-enter,
  .rc-tooltip-zoom-appear {
    opacity: 0;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
    animation-play-state: paused;
  }

  .rc-tooltip-zoom-leave {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);
    animation-play-state: paused;
  }

  .rc-tooltip-zoom-enter.rc-tooltip-zoom-enter-active,
  .rc-tooltip-zoom-appear.rc-tooltip-zoom-appear-active {
    animation-name: rcToolTipZoomIn;
    animation-play-state: running;
  }

  .rc-tooltip-zoom-leave.rc-tooltip-zoom-leave-active {
    animation-name: rcToolTipZoomOut;
    animation-play-state: running;
  }

  @keyframes rcToolTipZoomIn {
    0% {
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(0, 0);
    }
    100% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 1);
    }
  }

  @keyframes rcToolTipZoomOut {
    0% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 1);
    }
    100% {
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(0, 0);
    }
  }

  /* Black variant */
  .tooltip-variant-black .rc-tooltip-inner {
    background: ${({ theme }) => theme.components.tooltip.black.background};
    border: 1px solid ${({ theme }) => theme.components.tooltip.black.borderColor};
    color: ${({ theme }) => theme.components.tooltip.black.color};
    border-radius: ${({ theme }) => theme.components.tooltip.black.borderRadius};
    padding: ${({ theme }) => theme.components.tooltip.black.padding};
    box-shadow: ${({ theme }) => theme.components.tooltip.black.boxShadow};
    font-size: ${({ theme }) => theme.components.tooltip.black.fontSize};
    line-height: ${({ theme }) => theme.components.tooltip.black.lineHeight};
    font-weight: ${({ theme }) => theme.components.tooltip.black.fontWeight};
    max-width: ${({ theme }) => theme.components.tooltip.black.maxWidth};
    text-align: left;
    text-decoration: none;
  }

  .tooltip-variant-black.rc-tooltip-placement-top .rc-tooltip-arrow,
  .tooltip-variant-black.rc-tooltip-placement-topLeft .rc-tooltip-arrow,
  .tooltip-variant-black.rc-tooltip-placement-topRight .rc-tooltip-arrow {
    bottom: ${positionDistance};
    margin-left: -5px;
    border-width: 5px 5px 0;
    border-top-color: ${({ theme }) => theme.components.tooltip.black.background};
  }

  .tooltip-variant-black.rc-tooltip-placement-right .rc-tooltip-arrow,
  .tooltip-variant-black.rc-tooltip-placement-rightTop .rc-tooltip-arrow,
  .tooltip-variant-black.rc-tooltip-placement-rightBottom .rc-tooltip-arrow {
    left: ${positionDistance};
    margin-top: -5px;
    border-width: 5px 5px 5px 0;
    border-right-color: ${({ theme }) => theme.components.tooltip.black.background};
  }

  .tooltip-variant-black.rc-tooltip-placement-left .rc-tooltip-arrow,
  .tooltip-variant-black.rc-tooltip-placement-leftTop .rc-tooltip-arrow,
  .tooltip-variant-black.rc-tooltip-placement-leftBottom .rc-tooltip-arrow {
    right: ${positionDistance};
    margin-top: -5px;
    border-width: 5px 0 5px 5px;
    border-left-color: ${({ theme }) => theme.components.tooltip.black.background};
  }

  .tooltip-variant-black.rc-tooltip-placement-bottom .rc-tooltip-arrow,
  .tooltip-variant-black.rc-tooltip-placement-bottomLeft .rc-tooltip-arrow,
  .tooltip-variant-black.rc-tooltip-placement-bottomRight .rc-tooltip-arrow {
    top: ${positionDistance};
    margin-left: -5px;
    border-width: 0 5px 5px;
    border-bottom-color: ${({ theme }) => theme.components.tooltip.black.background};
  }

  /* White variant - small size */
  .tooltip-variant-white.tooltip-size-small .rc-tooltip-inner {
    background: ${({ theme }) => theme.components.tooltip.white.small.background};
    border: 1px solid ${({ theme }) => theme.components.tooltip.white.small.borderColor};
    color: ${({ theme }) => theme.components.tooltip.white.small.color};
    border-radius: ${({ theme }) => theme.components.tooltip.white.small.borderRadius};
    padding: ${({ theme }) => theme.components.tooltip.white.small.padding};
    box-shadow: ${({ theme }) => theme.components.tooltip.white.small.boxShadow};
    font-size: ${({ theme }) => theme.components.tooltip.white.small.fontSize};
    line-height: ${({ theme }) => theme.components.tooltip.white.small.lineHeight};
    font-weight: ${({ theme }) => theme.components.tooltip.white.small.fontWeight};
    text-align: left;
    text-decoration: none;
  }

  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-top .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-topLeft .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-topRight .rc-tooltip-arrow {
    bottom: ${positionDistance};
    margin-left: -5px;
    border-width: 5px 5px 0;
    border-top-color: ${({ theme }) => theme.components.tooltip.white.small.background};
  }

  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-right .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-rightTop .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-rightBottom .rc-tooltip-arrow {
    left: ${positionDistance};
    margin-top: -5px;
    border-width: 5px 5px 5px 0;
    border-right-color: ${({ theme }) => theme.components.tooltip.white.small.background};
  }

  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-left .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-leftTop .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-leftBottom .rc-tooltip-arrow {
    right: ${positionDistance};
    margin-top: -5px;
    border-width: 5px 0 5px 5px;
    border-left-color: ${({ theme }) => theme.components.tooltip.white.small.background};
  }

  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-bottom .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-bottomLeft .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.rc-tooltip-placement-bottomRight .rc-tooltip-arrow {
    top: ${positionDistance};
    margin-left: -5px;
    border-width: 0 5px 5px;
    border-bottom-color: ${({ theme }) => theme.components.tooltip.white.small.background};
  }

  /* White variant - large size */
  .tooltip-variant-white.tooltip-size-large .rc-tooltip-inner {
    background: ${({ theme }) => theme.components.tooltip.white.large.background};
    border: 1px solid ${({ theme }) => theme.components.tooltip.white.large.borderColor};
    color: ${({ theme }) => theme.components.tooltip.white.large.color};
    border-radius: ${({ theme }) => theme.components.tooltip.white.large.borderRadius};
    padding: ${({ theme }) => theme.components.tooltip.white.large.padding};
    box-shadow: ${({ theme }) => theme.components.tooltip.white.large.boxShadow};
    font-size: ${({ theme }) => theme.components.tooltip.white.large.fontSize};
    line-height: ${({ theme }) => theme.components.tooltip.white.large.lineHeight};
    font-weight: ${({ theme }) => theme.components.tooltip.white.large.fontWeight};
    text-align: left;
    text-decoration: none;
  }

  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-top .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-topLeft .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-topRight .rc-tooltip-arrow {
    bottom: ${positionDistance};
    margin-left: -5px;
    border-width: 5px 5px 0;
    border-top-color: ${({ theme }) => theme.components.tooltip.white.large.background};
  }

  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-right .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-rightTop .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-rightBottom .rc-tooltip-arrow {
    left: ${positionDistance};
    margin-top: -5px;
    border-width: 5px 5px 5px 0;
    border-right-color: ${({ theme }) => theme.components.tooltip.white.large.background};
  }

  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-left .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-leftTop .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-leftBottom .rc-tooltip-arrow {
    right: ${positionDistance};
    margin-top: -5px;
    border-width: 5px 0 5px 5px;
    border-left-color: ${({ theme }) => theme.components.tooltip.white.large.background};
  }

  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-bottom .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-bottomLeft .rc-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.rc-tooltip-placement-bottomRight .rc-tooltip-arrow {
    top: ${positionDistance};
    margin-left: -5px;
    border-width: 0 5px 5px;
    border-bottom-color: ${({ theme }) => theme.components.tooltip.white.large.background};
  }
`;
