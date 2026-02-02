import React, { useState, useCallback, useRef, useEffect } from 'react';
import { styled } from '../utils/styled';
import { getGlobalTheme } from '../utils/context';
import { Icon } from '../Icon';

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Default checked state
   */
  defaultChecked?: boolean;
  /**
   * Whether the checkbox is in indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Value of the checkbox
   */
  value?: string | number;
  /**
   * Name attribute for the checkbox
   */
  name?: string;
  /**
   * ID attribute for the checkbox (used with htmlFor in labels)
   */
  id?: string;
  /**
   * Callback when checked state changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * prevent default click event, if true, change event will not be triggered
   * @default false
   */
  clickPreventDefault?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

const CheckboxContainer = styled.label<{
  $disabled: boolean;
}>`
  position: relative;
  display: inline-block;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  ${({ theme }) => {
    const sizeConfig = theme.components.checkbox.small;
    return `
      width: ${sizeConfig.size};
      height: ${sizeConfig.size};
    `;
  }}
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const CheckboxBox = styled.div<{
  $checked: boolean;
  $indeterminate: boolean;
  $disabled: boolean;
  $isFocused: boolean;
}>`
  position: absolute;
  inset: 1px;
  border: 1px solid;
  transition: all 0.2s ease;

  ${({ theme }) => {
    const sizeConfig = theme.components.checkbox.small;
    return `
      border-radius: ${sizeConfig.borderRadius};
    `;
  }}

  ${({ $checked, $indeterminate, $disabled, theme }) => {
    if ($disabled) {
      const stateConfig = $checked || $indeterminate
        ? theme.components.checkbox.checked
        : theme.components.checkbox.unchecked;
      return `
        background: ${stateConfig.backgroundDisabled};
        border-color: ${stateConfig.borderColorDisabled};
      `;
    }

    if ($checked) {
      const checkedConfig = theme.components.checkbox.checked;
      return `
        background: ${checkedConfig.background};
        border-color: ${checkedConfig.borderColor};
      `;
    }

    if ($indeterminate) {
      const indeterminateConfig = theme.components.checkbox.indeterminate;
      return `
        background: ${indeterminateConfig.background};
        border-color: ${indeterminateConfig.borderColor};
      `;
    }

    const uncheckedConfig = theme.components.checkbox.unchecked;
    return `
      background: ${uncheckedConfig.background};
      border-color: ${uncheckedConfig.borderColor};
    `;
  }}

  ${({ $disabled, $checked, $indeterminate, theme }) => {
    if ($disabled) return '';

    const stateConfig = $checked || $indeterminate
      ? theme.components.checkbox.checked
      : theme.components.checkbox.unchecked;

    return `
      :hover & {
        background: ${stateConfig.backgroundHover};
        border-color: ${stateConfig.borderColorHover};
      }

      :active & {
        border-color: ${stateConfig.borderColorActive};
      }
    `;
  }}
`;

const IconWrapper = styled.div<{
  $visible: boolean;
}>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => {
    const iconSize = theme.components.checkbox.small.iconSize;
    return `
      width: ${iconSize.width};
      height: ${iconSize.height};
    `;
  }}

  svg, img {
    display: block;
  }
`;

const DefaultIndeterminateIcon = styled.div`
  width: 8px;
  height: 2px;
  background: white;
`;

const DefaultCheckedIcon = () => <svg width={10} height={8} viewBox="0 0 10 8" fill="#fff">
            <path d="M1.05426 3.16164L0 4.27945L3.50904 8L10 1.11781L8.94573 0L3.50904 5.76438L1.05426 3.16164Z" />
          </svg>

/**
 * Checkbox Component
 *
 * A checkbox for selecting multiple options
 *
 * @example
 * <Checkbox checked={true} onChange={(e) => console.log(e.target.checked)} />
 *
 * @example
 * // Indeterminate state
 * <Checkbox indeterminate={true} />
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  value,
  name,
  id,
  onChange,
  clickPreventDefault = false,
  className,
  style,
}) => {
  const theme = getGlobalTheme()
  const [internalChecked, setInternalChecked] = useState<boolean>(
    controlledChecked ?? defaultChecked
  );
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  // Set indeterminate property on the native input element
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newChecked = e.target.checked;

      if (controlledChecked === undefined) {
        setInternalChecked(newChecked);
      }

      onChange?.(e);
    },
    [disabled, controlledChecked, onChange]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    // Prevent event bubbling to avoid triggering parent element's click handlers
    if (clickPreventDefault) {
      e.preventDefault();
    }
  }, []);

  return (
    <CheckboxContainer
      $disabled={disabled}
      className={className}
      style={style}
      onClick={handleContainerClick}
    >
      <HiddenInput
        ref={inputRef}
        type="checkbox"
        id={id}
        checked={checked}
        value={value}
        name={name}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <CheckboxBox
        $checked={checked}
        $indeterminate={indeterminate}
        $disabled={disabled}
        $isFocused={isFocused}
      />
      {!indeterminate && (
        <IconWrapper $visible={checked}>
          {
            !theme.components.checkbox.icons.checked
              ? <DefaultCheckedIcon />
              : <Icon src={theme.components.checkbox.icons.checked} size={theme.components.checkbox.small.iconSize.width} />
          }
        </IconWrapper>
      )}
      {indeterminate && (
        <IconWrapper $visible={indeterminate}>
          {
            !theme.components.checkbox.icons.indeterminate
              ? <DefaultIndeterminateIcon />
              : <Icon src={theme.components.checkbox.icons.indeterminate} size={theme.components.checkbox.small.iconSize.width} />
          }
        </IconWrapper>
      )}
    </CheckboxContainer>
  );
};

Checkbox.displayName = 'Checkbox';

