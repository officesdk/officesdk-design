import styled from "styled-components";
import { LineType } from "./NumberInput";

export const NumberInputContainer = styled.div<{
  $size: 'small' | 'large';
  $disabled: boolean;
  $alert: boolean;
  $isFocused: boolean;
  $lineType: LineType;
}>`
  display: inline-flex;
  align-items: center;
  background: white;
  border-radius: ${({ theme, $size }) => theme.components.inputNumber[$size].borderRadius};
  flex-shrink: 0;

  ${({ $size }) =>
    $size === 'small'
      ? `
    height: 24px;
    width: 72px;
  `
      : `
    height: 32px;
    width: 80px;
  `}

  ${({ $disabled, $alert, $isFocused, $lineType, theme }) => {
    if ($lineType === 'borderless') {
      // borderless type: no border, no boxShadow
      return `
        border: none;
        background: transparent;
        ${$disabled ? 'cursor: not-allowed;' : ''}
      `;
    }

    if ($lineType === 'underlined') {
      // underlined type: bottom border only
      const borderColor = $disabled
        ? theme.colors.palettes.transparency['10']
        : $alert
          ? theme.colors.palettes.red['6']
          : $isFocused
            ? theme.colors.palettes.transparency['30']
            : 'transparent';

      return `
        border: none;
        border-bottom: 1px solid ${borderColor};
        border-radius: 0;
        ${$disabled ? 'cursor: not-allowed;' : ''}
        ${
          !$disabled && !$isFocused && !$alert
            ? `
          &:hover {
            border-bottom-color: ${theme.colors.palettes.transparency['20']};
          }
        `
            : ''
        }
      `;
    }

    // outlined type (default): full border
    if ($disabled) {
      return `
        border: 1px solid ${theme.colors.palettes.transparency['10']};
        cursor: not-allowed;
      `;
    }
    if ($alert) {
      return `
        border: 1px solid ${theme.colors.palettes.red['6']};
      `;
    }
    if ($isFocused) {
      return `
        border: 1px solid ${theme.colors.palettes.transparency['30']};
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
      `;
    }
    return `
      border: 1px solid ${theme.colors.palettes.transparency['10']};

      &:hover {
        border-color: ${theme.colors.palettes.transparency['20']};
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
      }
    `;
  }}
`;

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 8px;
  min-width: 0;
`;

export const StyledInput = styled.input<{ $size: 'small' | 'large'; $disabled: boolean }>`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'PingFang SC', sans-serif;
  font-weight: 400;
  line-height: 20px;
  padding: 0;
  margin: 0;

  ${({ $size }) =>
    $size === 'small'
      ? `
    font-size: 12px;
  `
      : `
    font-size: 13px;
  `}

  ${({ $disabled, theme }) =>
    $disabled
      ? `
    color: ${theme.colors.palettes.transparency['30']};
    cursor: not-allowed;
  `
      : `
    color: ${theme.colors.palettes.gray['120']};
  `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.palettes.transparency['30']};
  }

  /* Remove number input arrows */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;

export const ButtonGroup = styled.div<{ $alert: boolean; $disabled: boolean; $lineType: LineType }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-shrink: 0;
  position: relative;

  ${({ $disabled, $alert, $lineType, theme }) => {
    // No left border for borderless and underlined types
    if ($lineType === 'borderless' || $lineType === 'underlined') {
      return '';
    }

    // outlined type: show left border
    const borderColor = $disabled
      ? theme.colors.palettes.transparency['10']
      : $alert
        ? theme.colors.palettes.red['6']
        : theme.colors.palettes.transparency['10'];

    return `border-left: 1px solid ${borderColor};`;
  }}

  /* Centered divider line between buttons */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 1px;
    pointer-events: none;
    background-color: ${({ $disabled, $alert, $lineType, theme }) => {
      // No divider for borderless and underlined types
      if ($lineType === 'borderless' || $lineType === 'underlined') {
        return 'transparent';
      }

      if ($disabled) {
        return theme.colors.palettes.transparency['10'];
      }
      if ($alert) {
        return theme.colors.palettes.red['6'];
      }
      return theme.colors.palettes.transparency['10'];
    }};
  }
`;

export const StepButton = styled.button<{ $disabled: boolean }>`
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 1px 8px;
  outline: none;
  min-height: 0;
  overflow: hidden;

  ${({ $disabled, theme }) => {
    if ($disabled) {
      return `
        cursor: not-allowed;
        opacity: 0.4;
      `;
    }
    return `
      &:hover {
        background-color: ${theme.colors.palettes.transparency['5']};
      }

      &:active {
        background-color: ${theme.colors.palettes.transparency['10']};
      }
    `;
  }}

  svg {
    width: 14px;
    height: 14px;
    fill: ${({ $disabled, theme }) =>
      $disabled ? theme.colors.palettes.transparency['30'] : theme.colors.palettes.gray['120']};
  }
`;
