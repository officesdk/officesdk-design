import { createGlobalStyle } from 'styled-components';
import { getGlobalTheme } from '../utils/context';

const theme = getGlobalTheme();

export const DropdownGlobalStyles = createGlobalStyle`
  /* Dropdown container */
  .od-dropdown {
    position: absolute;
    z-index: 1050;
  }

  .od-dropdown-hidden {
    display: none;
  }

  /* Dropdown slide animations */
  .od-dropdown-slide-up-enter,
  .od-dropdown-slide-up-appear {
    animation-duration: 0.2s;
    animation-fill-mode: both;
    animation-play-state: paused;
  }

  .od-dropdown-slide-up-leave {
    animation-duration: 0.2s;
    animation-fill-mode: both;
    animation-play-state: paused;
  }

  .od-dropdown-slide-up-enter.od-dropdown-slide-up-enter-active,
  .od-dropdown-slide-up-appear.od-dropdown-slide-up-appear-active {
    animation-name: rcDropdownSlideUpIn;
    animation-play-state: running;
  }

  .od-dropdown-slide-up-leave.od-dropdown-slide-up-leave-active {
    animation-name: rcDropdownSlideUpOut;
    animation-play-state: running;
  }

  @keyframes rcDropdownSlideUpIn {
    0% {
      opacity: 0;
      transform: scaleY(0.8);
    }
    100% {
      opacity: 1;
      transform: scaleY(1);
    }
  }

  @keyframes rcDropdownSlideUpOut {
    0% {
      opacity: 1;
      transform: scaleY(1);
    }
    100% {
      opacity: 0;
      transform: scaleY(0.8);
    }
  }
`;

export const MenuGlobalStyles = createGlobalStyle`
  /* Base menu container */
  .od-menu {
    margin: 0;
    padding: 0;
    list-style: none;
    outline: none;
    box-shadow: none;
    background: transparent;
    border: none;
  }

  .od-menu-hidden {
    display: none;
  }

  /* Menu item */
  .od-menu-item, .od-menu-submenu-title {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0;
    cursor: pointer;
    transition: background-color 0.15s ease;
    user-select: none;
    list-style: none;

    ${() => {
      const config = theme.components?.menu?.menuItem;
      return `
        padding: ${config?.layout?.padding || '6px 12px'};
        background: ${config?.background?.normal || 'transparent'};
        border-radius: ${config?.border?.radius || '0'};
      `;
    }}
  }

  .od-menu-item:hover {
    ${() => {
      const config = theme.components?.menu?.menuItem;
      return `
        background: ${config?.background?.hover || 'rgba(65, 70, 75, 0.05)'};
      `;
    }}
  }

  .od-menu-item-active,
  .od-menu-item-selected {
    ${() => {
      const config = theme.components?.menu?.menuItem;
      return `
        background: ${config?.background?.active || 'rgba(65, 70, 75, 0.1)'};
      `;
    }}
  }

  .od-menu-item-disabled {
    cursor: not-allowed;
    opacity: 0.3;
    ${() => {
      const config = theme.components?.menu?.menuItem;
      return `
        background: ${config?.background?.disabled || 'transparent'};
      `;
    }}
  }

  .od-menu-item-disabled:hover {
    ${() => {
      const config = theme.components?.menu?.menuItem;
      return `
        background: ${config?.background?.disabled || 'transparent'};
      `;
    }}
  }

  /* SubMenu */
  .od-menu-submenu {
    position: relative;
    list-style: none;
  }

  .od-menu-submenu-popup {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    ${() => {
      const dropdownConfig = theme.components?.dropdown;

      return `
        background: ${dropdownConfig?.background || '#fff'};
        border: ${dropdownConfig?.border || 'none'};
        border-radius: ${dropdownConfig?.borderRadius || '4px'};
        padding: ${dropdownConfig?.padding || '4px 0'};
        box-shadow: ${dropdownConfig?.boxShadow || 'none'};
      `;
    }}



  }

  .od-menu-submenu-popup.od-menu-submenu .od-menu {
    border: none;
    box-shadow: none;
    background: transparent;
    padding: 0;
  }

  .od-menu-submenu-title {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0;
    cursor: pointer;
    transition: background-color 0.15s ease;
    user-select: none;

    ${() => {
      const config = theme.components?.menu?.menuItem;
      return `
        padding: ${config?.layout?.padding || '6px 12px'};
        background: ${config?.background?.normal || 'transparent'};
      `;
    }}
  }

  .od-menu-submenu-title:hover {
    ${() => {
      const config = theme.components?.menu?.menuItem;
      return `
        background: ${config?.background?.hover || 'rgba(65, 70, 75, 0.05)'};
      `;
    }}
  }

  .od-menu-submenu-open > .od-menu-submenu-title {
    ${() => {
      const config = theme.components?.menu?.menuItem;
      return `
        background: ${config?.background?.active || 'rgba(65, 70, 75, 0.1)'};
      `;
    }}
  }

  .od-menu-submenu-disabled .od-menu-submenu-title {
    cursor: not-allowed;
    opacity: 0.3;
    ${() => {
      const config = theme.components?.menu?.menuItem;
      return `
        background: ${config?.background?.disabled || 'transparent'};
      `;
    }}
  }

  /* Submenu popup */
  .od-menu-submenu-popup {
    position: absolute;
    z-index: 1050;
  }

  /* Submenu popup positioning - add 5px gap */
  .od-menu-submenu-placement-rightTop,
  .od-menu-submenu-placement-rightBottom {
    /* padding-left: 5px; */
  }

  .od-menu-submenu-placement-leftTop,
  .od-menu-submenu-placement-leftBottom {
    /* padding-right: 5px; */
  }

  .od-menu-submenu > .od-menu {
    ${() => {
      const dropdownConfig = theme.components?.dropdown;
      const menuConfig = theme.components?.menu;

      return `
        background: ${dropdownConfig?.background || '#fff'};
        border: ${menuConfig?.border?.width || '1px'} solid ${menuConfig?.border?.color || 'rgba(65, 70, 75, 0.1)'};
        border-radius: ${menuConfig?.border?.radius || '4px'};
        box-shadow: ${dropdownConfig?.boxShadow || '0 2px 8px rgba(0, 0, 0, 0.15)'};
      `;
    }}
  }

  /* Item Group */
  .od-menu-item-group-title {
    padding: 8px 12px 4px;
    user-select: none;
    list-style: none;

    ${() => {
      const config = theme.components?.menu?.groupTitle;
      return `
        font-size: ${config?.fontSize || '12px'};
        font-weight: ${config?.fontWeight || '500'};
        color: ${config?.color || 'rgba(65, 70, 75, 0.6)'};
        line-height: 20px;
      `;
    }}
  }

  .od-menu-item-group-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Divider */
  .od-menu-item-divider {
    overflow: hidden;
    line-height: 0;
    list-style: none;

    ${() => {
      const config = theme.components?.menu?.divider;
      return `
        height: ${config?.height || '1px'};
        background: ${config?.background || 'rgba(65, 70, 75, 0.1)'};
        margin: ${config?.margin || '4px 0'};
      `;
    }}
  }

  /* Animation */
  .od-menu-submenu-inline {
    border: 0;
    box-shadow: none;
  }

  .od-menu-submenu-inline > .od-menu {
    padding: 0;
    border: 0;
    box-shadow: none;
  }

  /* Collapse animation */
  .od-menu-submenu-inline-collapsed {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .od-menu-submenu-inline-collapsed-active {
    max-height: 1000px;
  }
`;

