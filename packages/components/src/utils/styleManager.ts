import React from 'react';
import type { ReactElement } from 'react';
import type { GlobalStyleComponent } from 'styled-components';
import { getGlobalRenderFunction } from './context';

const injectedStyles = new Set<string>();

/**
 * Style Manager
 *
 * Manages global style injection on demand.
 * Styles are injected only once when first component is used.
 */
export const styleManager = {
  /**
   * Inject global styles on demand
   * @param id Unique identifier for the style (e.g., 'od-tooltip-styles')
   * @param StyleComponent The styled component to inject
   */
  inject: (id: string, StyleComponent: React.ComponentType<any> | GlobalStyleComponent<any, any>) => {
    if (injectedStyles.has(id) || typeof document === 'undefined') {
      return;
    }

    // Check if already in DOM
    if (document.getElementById(id)) {
      injectedStyles.add(id);
      return;
    }

    // Get render function from global context
    const renderFunction = getGlobalRenderFunction();
    if (!renderFunction) {
      console.warn(
        `Style injection failed for "${id}": render function not available. ` +
          `Please call initUIConfig() or use UIConfigProvider first.`
      );
      return;
    }

    // Create container and inject styles
    const container = document.createElement('div');
    container.id = id;
    document.head.appendChild(container);

    // Use global render function for consistency
    // Cast StyleComponent to any to avoid type issues with GlobalStyleComponent
    renderFunction(
      React.createElement(StyleComponent as React.ComponentType<any>) as ReactElement,
      container
    );

    injectedStyles.add(id);
  },

  /**
   * Check if styles have been injected
   */
  isInjected: (id: string): boolean => {
    return (
      injectedStyles.has(id) ||
      (typeof document !== 'undefined' && !!document.getElementById(id))
    );
  },

  /**
   * Reset injected styles (mainly for testing)
   */
  reset: () => {
    injectedStyles.clear();
  },
};
