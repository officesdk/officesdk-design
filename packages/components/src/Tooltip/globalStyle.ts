import { createGlobalStyle } from 'styled-components';
import { getGlobalTheme } from '../utils/context';

// Helper functions to get arrow config values at runtime
const getArrowSize = () => parseInt(getGlobalTheme().components.tooltip.arrow.size.width);
const getArrowRadius = () => getGlobalTheme().components.tooltip.arrow.borderRadius;
// The rotated square's visible height is arrowSize * 0.707 (half of diagonal)
const getArrowVisibleHeight = () => Math.round(getArrowSize() * 1.414) / 2;
const getPaddingDistance = () => `${getArrowVisibleHeight()}px`;
const getArrowOverlap = () => `${Math.ceil(getArrowVisibleHeight() - getArrowSize() / 2)}px!important`;

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
    white-space: nowrap;
    min-height: unset;
    text-align: center;
  }

  /* Tooltip arrow base - rotated square for rounded corners */
  .od-tooltip-arrow {
    position: absolute;
    width: ${() => getArrowSize()}px;
    height: ${() => getArrowSize()}px;
    transform: rotate(45deg);
  }

  .od-tooltip-placement-top,
  .od-tooltip-placement-topLeft,
  .od-tooltip-placement-topRight {
    padding-bottom: ${() => getPaddingDistance()};
  }

  .od-tooltip-placement-right,
  .od-tooltip-placement-rightTop,
  .od-tooltip-placement-rightBottom {
    padding-left: ${() => getPaddingDistance()};
  }

  .od-tooltip-placement-bottom,
  .od-tooltip-placement-bottomLeft,
  .od-tooltip-placement-bottomRight {
    padding-top: ${() => getPaddingDistance()};
  }

  .od-tooltip-placement-left,
  .od-tooltip-placement-leftTop,
  .od-tooltip-placement-leftBottom {
    padding-right: ${() => getPaddingDistance()};
  }

  /* Placement specific adjustments - position arrows to overlap with content edge */
  .od-tooltip-placement-top .od-tooltip-arrow,
  .od-tooltip-placement-topLeft .od-tooltip-arrow,
  .od-tooltip-placement-topRight .od-tooltip-arrow {
    bottom: ${() => getArrowOverlap()};
    margin-left: ${() => `-${getArrowSize() / 2}px`};
    border-radius: ${() => `0 0 ${getArrowRadius()} 0`};
  }

  .od-tooltip-placement-right .od-tooltip-arrow,
  .od-tooltip-placement-rightTop .od-tooltip-arrow,
  .od-tooltip-placement-rightBottom .od-tooltip-arrow {
    left: ${() => getArrowOverlap()};
    margin-top: ${() => `-${getArrowSize() / 2}px`};
    border-radius: ${() => `0 0 0 ${getArrowRadius()}`};
  }

  .od-tooltip-placement-left .od-tooltip-arrow,
  .od-tooltip-placement-leftTop .od-tooltip-arrow,
  .od-tooltip-placement-leftBottom .od-tooltip-arrow {
    right: ${() => getArrowOverlap()};
    margin-top: ${() => `-${getArrowSize() / 2}px`};
    border-radius: ${() => `0 ${getArrowRadius()} 0 0`};
  }

  .od-tooltip-placement-bottom .od-tooltip-arrow,
  .od-tooltip-placement-bottomLeft .od-tooltip-arrow,
  .od-tooltip-placement-bottomRight .od-tooltip-arrow {
    top: ${() => getArrowOverlap()};
    margin-left: ${() => `-${getArrowSize() / 2}px`};
    border-radius: ${() => `${getArrowRadius()} 0 0 0`};
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
    background: ${() => getGlobalTheme().components.tooltip.black.background};
    border: 1px solid ${() => getGlobalTheme().components.tooltip.black.borderColor};
    color: ${() => getGlobalTheme().components.tooltip.black.color};
    border-radius: ${() => getGlobalTheme().components.tooltip.black.borderRadius};
    padding: ${() => getGlobalTheme().components.tooltip.black.padding};
    box-shadow: ${() => getGlobalTheme().components.tooltip.black.boxShadow};
    font-size: ${() => getGlobalTheme().components.tooltip.black.fontSize};
    line-height: ${() => getGlobalTheme().components.tooltip.black.lineHeight};
    font-weight: ${() => getGlobalTheme().components.tooltip.black.fontWeight};
    max-width: ${() => getGlobalTheme().components.tooltip.black.maxWidth};
    text-align: left;
    text-decoration: none;
  }

  .tooltip-variant-black .od-tooltip-arrow {
    background: ${() => getGlobalTheme().components.tooltip.black.background};
  }

  /* White variant - small size */
  .tooltip-variant-white.tooltip-size-small .od-tooltip-inner {
    background: ${() => getGlobalTheme().components.tooltip.white.small.background};
    border: 1px solid ${() => getGlobalTheme().components.tooltip.white.small.borderColor};
    color: ${() => getGlobalTheme().components.tooltip.white.small.color};
    border-radius: ${() => getGlobalTheme().components.tooltip.white.small.borderRadius};
    padding: ${() => getGlobalTheme().components.tooltip.white.small.padding};
    box-shadow: ${() => getGlobalTheme().components.tooltip.white.small.boxShadow};
    font-size: ${() => getGlobalTheme().components.tooltip.white.small.fontSize};
    line-height: ${() => getGlobalTheme().components.tooltip.white.small.lineHeight};
    font-weight: ${() => getGlobalTheme().components.tooltip.white.small.fontWeight};
    text-align: left;
    text-decoration: none;
  }

  .tooltip-variant-white.tooltip-size-small .od-tooltip-arrow {
    background: ${() => getGlobalTheme().components.tooltip.white.small.background};
  }

  /* White variant - large size */
  .tooltip-variant-white.tooltip-size-large .od-tooltip-inner {
    background: ${() => getGlobalTheme().components.tooltip.white.large.background};
    border: 1px solid ${() => getGlobalTheme().components.tooltip.white.large.borderColor};
    color: ${() => getGlobalTheme().components.tooltip.white.large.color};
    border-radius: ${() => getGlobalTheme().components.tooltip.white.large.borderRadius};
    padding: ${() => getGlobalTheme().components.tooltip.white.large.padding};
    box-shadow: ${() => getGlobalTheme().components.tooltip.white.large.boxShadow};
    font-size: ${() => getGlobalTheme().components.tooltip.white.large.fontSize};
    line-height: ${() => getGlobalTheme().components.tooltip.white.large.lineHeight};
    font-weight: ${() => getGlobalTheme().components.tooltip.white.large.fontWeight};
    text-align: left;
    text-decoration: none;
  }

  .tooltip-variant-white.tooltip-size-large .od-tooltip-arrow {
    background: ${() => getGlobalTheme().components.tooltip.white.large.background};
  }
`;
