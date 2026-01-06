import { createGlobalStyle } from 'styled-components';
import { getGlobalTheme } from '../utils/context';

const theme = getGlobalTheme()

// Arrow size is 5px, tooltip needs space for the arrow to display
const arrowSize = 5;
const paddingDistance = `${arrowSize}px`; // 8px - space for arrow (5px) + gap (3px)
const arrowDistance = `${arrowSize}px`; // 3px - arrow positioned to overlap with content slightly

// Tooltip global styles - includes base styles and all variant/size combinations
export const TooltipGlobalStyles = createGlobalStyle`
  /* Base tooltip container */
  .od-tooltip {
    position: absolute;
    z-index: 1070;
    display: block;
    visibility: visible;
    font-size: 12px;
    line-height: 1.5;
    opacity: 1;
  }

  .od-tooltip-hidden {
    display: none;
  }

  /* Tooltip content wrapper */
  .od-tooltip-content {
    position: relative;
  }

  /* Tooltip inner content */
  .od-tooltip-inner {
    padding: 6px 8px;
    text-align: left;
    text-decoration: none;
    word-wrap: break-word;
    min-height: unset;
  }

  /* Tooltip arrow base */
  .od-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  .od-tooltip-placement-top,
  .od-tooltip-placement-topLeft,
  .od-tooltip-placement-topRight {
    padding-bottom: ${paddingDistance};
  }

  .od-tooltip-placement-right,
  .od-tooltip-placement-rightTop,
  .od-tooltip-placement-rightBottom {
    padding-left: ${paddingDistance};
  }

  .od-tooltip-placement-bottom,
  .od-tooltip-placement-bottomLeft,
  .od-tooltip-placement-bottomRight {
    padding-top: ${paddingDistance};
  }

  .od-tooltip-placement-left,
  .od-tooltip-placement-leftTop,
  .od-tooltip-placement-leftBottom {
    padding-right: ${paddingDistance};
  }

  /* Placement specific adjustments - position arrows close to content edge */
  .od-tooltip-placement-top .od-tooltip-arrow,
  .od-tooltip-placement-topLeft .od-tooltip-arrow,
  .od-tooltip-placement-topRight .od-tooltip-arrow {
    bottom: ${arrowDistance};
    margin-left: -${arrowSize}px;
  }

  .od-tooltip-placement-right .od-tooltip-arrow,
  .od-tooltip-placement-rightTop .od-tooltip-arrow,
  .od-tooltip-placement-rightBottom .od-tooltip-arrow {
    left: ${arrowDistance};
    margin-top: -${arrowSize}px;
  }

  .od-tooltip-placement-left .od-tooltip-arrow,
  .od-tooltip-placement-leftTop .od-tooltip-arrow,
  .od-tooltip-placement-leftBottom .od-tooltip-arrow {
    right: ${arrowDistance};
    margin-top: -${arrowSize}px;
  }

  .od-tooltip-placement-bottom .od-tooltip-arrow,
  .od-tooltip-placement-bottomLeft .od-tooltip-arrow,
  .od-tooltip-placement-bottomRight .od-tooltip-arrow {
    top: ${arrowDistance};
    margin-left: -${arrowSize}px;
  }

  /* Alignment adjustments */
  .od-tooltip-placement-topLeft .od-tooltip-arrow,
  .od-tooltip-placement-bottomLeft .od-tooltip-arrow {
    left: 15%;
  }

  .od-tooltip-placement-topRight .od-tooltip-arrow,
  .od-tooltip-placement-bottomRight .od-tooltip-arrow {
    right: 15%;
  }

  .od-tooltip-placement-rightTop .od-tooltip-arrow,
  .od-tooltip-placement-leftTop .od-tooltip-arrow {
    top: 15%;
  }

  .od-tooltip-placement-rightBottom .od-tooltip-arrow,
  .od-tooltip-placement-leftBottom .od-tooltip-arrow {
    bottom: 15%;
  }

  .od-tooltip.od-tooltip-zoom-enter,
  .od-tooltip.od-tooltip-zoom-leave {
    display: block;
  }

  .od-tooltip-zoom-enter,
  .od-tooltip-zoom-appear {
    opacity: 0;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
    animation-play-state: paused;
  }

  .od-tooltip-zoom-leave {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);
    animation-play-state: paused;
  }

  .od-tooltip-zoom-enter.od-tooltip-zoom-enter-active,
  .od-tooltip-zoom-appear.od-tooltip-zoom-appear-active {
    animation-name: rcToolTipZoomIn;
    animation-play-state: running;
  }

  .od-tooltip-zoom-leave.od-tooltip-zoom-leave-active {
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
  .tooltip-variant-black .od-tooltip-inner {
    background: ${() => theme.components.tooltip.black.background};
    border: 1px solid ${() => theme.components.tooltip.black.borderColor};
    color: ${() => theme.components.tooltip.black.color};
    border-radius: ${() => theme.components.tooltip.black.borderRadius};
    padding: ${() => theme.components.tooltip.black.padding};
    box-shadow: ${() => theme.components.tooltip.black.boxShadow};
    font-size: ${() => theme.components.tooltip.black.fontSize};
    line-height: ${() => theme.components.tooltip.black.lineHeight};
    font-weight: ${() => theme.components.tooltip.black.fontWeight};
    max-width: ${() => theme.components.tooltip.black.maxWidth};
    text-align: left;
    text-decoration: none;
  }

  .tooltip-variant-black.od-tooltip-placement-top .od-tooltip-arrow,
  .tooltip-variant-black.od-tooltip-placement-topLeft .od-tooltip-arrow,
  .tooltip-variant-black.od-tooltip-placement-topRight .od-tooltip-arrow {
    bottom: ${arrowDistance};
    margin-left: -${arrowSize}px;
    border-width: ${arrowSize}px ${arrowSize}px 0;
    border-top-color: ${() => theme.components.tooltip.black.background};
  }

  .tooltip-variant-black.od-tooltip-placement-right .od-tooltip-arrow,
  .tooltip-variant-black.od-tooltip-placement-rightTop .od-tooltip-arrow,
  .tooltip-variant-black.od-tooltip-placement-rightBottom .od-tooltip-arrow {
    left: ${arrowDistance};
    margin-top: -${arrowSize}px;
    border-width: ${arrowSize}px ${arrowSize}px ${arrowSize}px 0;
    border-right-color: ${() => theme.components.tooltip.black.background};
  }

  .tooltip-variant-black.od-tooltip-placement-left .od-tooltip-arrow,
  .tooltip-variant-black.od-tooltip-placement-leftTop .od-tooltip-arrow,
  .tooltip-variant-black.od-tooltip-placement-leftBottom .od-tooltip-arrow {
    right: ${arrowDistance};
    margin-top: -${arrowSize}px;
    border-width: ${arrowSize}px 0 ${arrowSize}px ${arrowSize}px;
    border-left-color: ${() => theme.components.tooltip.black.background};
  }

  .tooltip-variant-black.od-tooltip-placement-bottom .od-tooltip-arrow,
  .tooltip-variant-black.od-tooltip-placement-bottomLeft .od-tooltip-arrow,
  .tooltip-variant-black.od-tooltip-placement-bottomRight .od-tooltip-arrow {
    top: ${arrowDistance};
    margin-left: -${arrowSize}px;
    border-width: 0 ${arrowSize}px ${arrowSize}px;
    border-bottom-color: ${() => theme.components.tooltip.black.background};
  }

  /* White variant - small size */
  .tooltip-variant-white.tooltip-size-small .od-tooltip-inner {
    background: ${() => theme.components.tooltip.white.small.background};
    border: 1px solid ${() => theme.components.tooltip.white.small.borderColor};
    color: ${() => theme.components.tooltip.white.small.color};
    border-radius: ${() => theme.components.tooltip.white.small.borderRadius};
    padding: ${() => theme.components.tooltip.white.small.padding};
    box-shadow: ${() => theme.components.tooltip.white.small.boxShadow};
    font-size: ${() => theme.components.tooltip.white.small.fontSize};
    line-height: ${() => theme.components.tooltip.white.small.lineHeight};
    font-weight: ${() => theme.components.tooltip.white.small.fontWeight};
    text-align: left;
    text-decoration: none;
  }

  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-top .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-topLeft .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-topRight .od-tooltip-arrow {
    bottom: ${arrowDistance};
    margin-left: -${arrowSize}px;
    border-width: ${arrowSize}px ${arrowSize}px 0;
    border-top-color: ${() => theme.components.tooltip.white.small.background};
  }

  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-right .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-rightTop .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-rightBottom .od-tooltip-arrow {
    left: ${arrowDistance};
    margin-top: -${arrowSize}px;
    border-width: ${arrowSize}px ${arrowSize}px ${arrowSize}px 0;
    border-right-color: ${() => theme.components.tooltip.white.small.background};
  }

  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-left .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-leftTop .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-leftBottom .od-tooltip-arrow {
    right: ${arrowDistance};
    margin-top: -${arrowSize}px;
    border-width: ${arrowSize}px 0 ${arrowSize}px ${arrowSize}px;
    border-left-color: ${() => theme.components.tooltip.white.small.background};
  }

  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-bottom .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-bottomLeft .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-small.od-tooltip-placement-bottomRight .od-tooltip-arrow {
    top: ${arrowDistance};
    margin-left: -${arrowSize}px;
    border-width: 0 ${arrowSize}px ${arrowSize}px;
    border-bottom-color: ${() => theme.components.tooltip.white.small.background};
  }

  /* White variant - large size */
  .tooltip-variant-white.tooltip-size-large .od-tooltip-inner {
    background: ${() => theme.components.tooltip.white.large.background};
    border: 1px solid ${() => theme.components.tooltip.white.large.borderColor};
    color: ${() => theme.components.tooltip.white.large.color};
    border-radius: ${() => theme.components.tooltip.white.large.borderRadius};
    padding: ${() => theme.components.tooltip.white.large.padding};
    box-shadow: ${() => theme.components.tooltip.white.large.boxShadow};
    font-size: ${() => theme.components.tooltip.white.large.fontSize};
    line-height: ${() => theme.components.tooltip.white.large.lineHeight};
    font-weight: ${() => theme.components.tooltip.white.large.fontWeight};
    text-align: left;
    text-decoration: none;
  }

  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-top .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-topLeft .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-topRight .od-tooltip-arrow {
    bottom: ${arrowDistance};
    margin-left: -${arrowSize}px;
    border-width: ${arrowSize}px ${arrowSize}px 0;
    border-top-color: ${() => theme.components.tooltip.white.large.borderColor};
  }

  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-right .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-rightTop .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-rightBottom .od-tooltip-arrow {
    left: ${arrowDistance};
    margin-top: -${arrowSize}px;
    border-width: ${arrowSize}px ${arrowSize}px ${arrowSize}px 0;
    border-right-color: ${() => theme.components.tooltip.white.large.background};
  }

  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-left .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-leftTop .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-leftBottom .od-tooltip-arrow {
    right: ${arrowDistance};
    margin-top: -${arrowSize}px;
    border-width: ${arrowSize}px 0 ${arrowSize}px ${arrowSize}px;
    border-left-color: ${() => theme.components.tooltip.white.large.background};
  }

  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-bottom .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-bottomLeft .od-tooltip-arrow,
  .tooltip-variant-white.tooltip-size-large.od-tooltip-placement-bottomRight .od-tooltip-arrow {
    top: ${arrowDistance};
    margin-left: -${arrowSize}px;
    border-width: 0 ${arrowSize}px ${arrowSize}px;
    border-bottom-color: ${() => theme.components.tooltip.white.large.background};
  }
`;
