import React, { forwardRef } from 'react';
import { styled } from '../utils/styled';
import { Input, InputProps } from './Input';
import { Icon } from '../Icon';
import { getGlobalTheme } from '../utils/context';
import { SearchIcon } from '@officesdk/design/icons';

export interface SearchInputProps extends Omit<InputProps, 'prefixNode' | 'suffixNode'> {
  /**
   * Line type (outlined or underlined)
   */
  lineType?: 'outlined' | 'underlined';
  /**
   * SearchInput size
   */
  size?: 'mini' | 'small' | 'medium' | 'large';
  /**
   * Whether to show the clear button when input has value
   */
  clearable?: boolean;
  /**
   * Callback when clear button is clicked
   */
  onClear?: () => void;
  /**
   * Custom search icon (URL string or React node)
   */
  searchIcon?: string | React.ReactNode;
}

const SearchIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors?.palettes?.transparency?.['100'] || '#41464b'};
  }
`;

/**
 * SearchInput Component
 *
 * A wrapper around Input component with search icon and clear functionality
 *
 * @example
 * // Basic search input
 * <SearchInput placeholder="Search..." />
 *
 * @example
 * // Underlined search input
 * <SearchInput lineType="underlined" placeholder="Search..." />
 *
 * @example
 * // Search input without clearable
 * <SearchInput clearable={false} placeholder="Search..." />
 *
 * @example
 * // Different sizes
 * <SearchInput size="small" placeholder="Search..." />
 * <SearchInput size="medium" placeholder="Search..." />
 * <SearchInput size="large" placeholder="Search..." />
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { lineType = 'outlined', size = 'medium', clearable = true, onClear, searchIcon, ...rest },
    ref
  ) => {
    // Render search icon by priority:
    // 1. props.searchIcon (string or ReactNode)
    // 2. theme.components.inputSearch.searchIcon.url
    // 3. Default search icon from registry
    const getSearchIconElement = () => {
      // Priority 1: props.searchIcon
      if (searchIcon !== undefined) {
        if (typeof searchIcon === 'string') {
          return <Icon src={searchIcon} />;
        }
        return searchIcon;
      }

      // Priority 2: theme icon
      const theme = getGlobalTheme();
      const themeIconUrl = theme?.components?.inputSearch?.searchIcon?.url;
      if (themeIconUrl) {
        return <Icon src={themeIconUrl} />;
      }

      // Priority 3: default icon
      return <SearchIcon />;
    };

    const prefixNode = <SearchIconWrapper>{getSearchIconElement()}</SearchIconWrapper>;

    return (
      <Input
        ref={ref}
        lineType={lineType}
        size={size}
        prefixNode={prefixNode}
        clearable={clearable}
        onClear={onClear}
        {...rest}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';
