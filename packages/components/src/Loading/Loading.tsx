import React, { useState, useEffect } from 'react';
import { styled } from '../utils/styled';
import loadingGif from '../assets/loading.gif';
import { getGlobalTheme } from '../utils/context';

export interface LoadingProps {
  /**
   * Size of the loading spinner
   * - 'small': 16x16 (for dropdown menus, search refresh)
   * - 'medium': 24x24 (for list/table refresh)
   * - 'large': 32x32 (for full page refresh)
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether the spinner is visible
   */
  spinning?: boolean;
  /**
   * Delay in milliseconds before showing the spinner (prevents flash)
   */
  delay?: number;
  /**
   * Tip text displayed below the spinner
   */
  tip?: React.ReactNode;
  /**
   * Whether to use fullscreen overlay mode
   */
  fullscreen?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Child content to wrap with loading overlay
   */
  children?: React.ReactNode;
  /**
   * Custom loading indicator (React element or image URL)
   * When provided as a string, it will be used as the image src
   * When provided as a React element, it will be rendered directly
   */
  indicator?: React.ReactNode | string;
}

// Shared size styles for indicators
const getIndicatorSize = (size: LoadingProps['size'], theme: any) => {
  const sizeConfig = theme.components.loading[size || 'medium'];
  return `
    width: ${sizeConfig.size};
    height: ${sizeConfig.size};
  `;
};

const SpinnerImage = styled.img<{ $size: LoadingProps['size'] }>`
  display: inline-block;
  ${({ $size, theme }) => getIndicatorSize($size, theme)}
`;

const CustomIndicatorWrapper = styled.span<{ $size: LoadingProps['size'] }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${({ $size, theme }) => getIndicatorSize($size, theme)}
`;

const CSSSpinner = styled.div<{ $size: LoadingProps['size'] }>`
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;

  ${({ $size, theme }) => {
    const loadingConfig = theme.components.loading;
    const sizeConfig = loadingConfig[$size || 'medium'];
    const { color, animation } = loadingConfig.indicator;
    const sizeValue = Number.parseFloat(sizeConfig.size);
    const borderWidth = Math.max(2, Math.round((Number.isNaN(sizeValue) ? 24 : sizeValue) / 12));

    return `
      width: ${sizeConfig.size};
      height: ${sizeConfig.size};
      border: ${borderWidth}px solid rgba(0, 0, 0, 0.1);
      border-top-color: ${color};
      animation: loading-spin ${animation.duration} ${animation.timingFunction} infinite;

      @keyframes loading-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
  }}
`;

const LoadingContainer = styled.div<{ $fullscreen: boolean }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.components.loading.indicator.gap};

  ${({ $fullscreen, theme }) =>
    $fullscreen &&
    `
      position: fixed;
      inset: 0;
      z-index: ${theme.components.loading.fullscreen.zIndex};
      background: ${theme.components.loading.fullscreen.background};
    `}
`;

const Tip = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.components.loading.tipColor};
`;

const Wrapper = styled.div`
  position: relative;
`;

const WrapperContent = styled.div<{ $spinning: boolean }>`
  transition: opacity 0.3s;
  opacity: ${({ $spinning, theme }) =>
    $spinning ? theme.components.loading.wrapper.contentOpacity : 1};
  pointer-events: ${({ $spinning }) => ($spinning ? 'none' : 'auto')};
`;

const WrapperOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background: ${({ theme }) => theme.components.loading.wrapper.overlayBackground};
  gap: ${({ theme }) => theme.components.loading.indicator.gap};
`;

/**
 * Loading Component
 *
 * A loading component that displays an animated indicator.
 * Supports GIF/CSS defaults via theme configuration or custom indicators via props.
 *
 * @example
 * // Basic usage (uses theme default indicator type)
 * <Loading />
 *
 * @example
 * // Different sizes
 * <Loading size="small" />
 * <Loading size="medium" />
 * <Loading size="large" />
 *
 * @example
 * // With tip
 * <Loading tip="Loading..." />
 *
 * @example
 * // Custom indicator (image URL)
 * <Loading indicator="/path/to/custom-loading.gif" />
 *
 * @example
 * // Custom indicator (React element)
 * <Loading indicator={<MyCustomSpinner />} />
 *
 * @example
 * // Wrap content
 * <Loading spinning={isLoading}>
 *   <div>Content to load</div>
 * </Loading>
 *
 * @example
 * // Fullscreen loading
 * <Loading fullscreen spinning={isLoading} />
 */
export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  spinning = true,
  delay = 0,
  tip,
  fullscreen = false,
  className,
  children,
  indicator,
}) => {
  const [shouldShow, setShouldShow] = useState(delay === 0 && spinning);

  // Simplified effect: only set timer when delay > 0 and spinning
  useEffect(() => {
    if (!spinning) {
      setShouldShow(false);
      return;
    }

    if (delay <= 0) {
      setShouldShow(true);
      return;
    }

    const timer = setTimeout(() => setShouldShow(true), delay);
    return () => clearTimeout(timer);
  }, [spinning, delay]);

  // Render indicator - not memoized because theme can change dynamically via registerGlobalTheme
  const renderIndicator = () => {
    const a11yProps = { role: 'status' as const, 'aria-label': 'Loading' };

    // Custom indicator as string (image URL)
    if (typeof indicator === 'string') {
      return <SpinnerImage $size={size} src={indicator} alt="Loading" {...a11yProps} />;
    }

    // Custom indicator as React element
    if (indicator) {
      return (
        <CustomIndicatorWrapper $size={size} {...a11yProps}>
          {indicator}
        </CustomIndicatorWrapper>
      );
    }

    // Default indicator from theme
    const { indicator: indicatorConfig } = getGlobalTheme().components.loading;

    if (indicatorConfig.defaultType === 'css') {
      return <CSSSpinner $size={size} {...a11yProps} />;
    }

    return (
      <SpinnerImage
        $size={size}
        src={indicatorConfig.defaultImage || loadingGif}
        alt="Loading"
        {...a11yProps}
      />
    );
  };

  // Render spinner with optional tip
  const renderSpinner = () => (
    <>
      {renderIndicator()}
      {tip && <Tip>{tip}</Tip>}
    </>
  );

  const hasChildren = React.Children.count(children) > 0;

  // Wrapper mode (with children)
  if (hasChildren) {
    return (
      <Wrapper className={className}>
        <WrapperContent $spinning={shouldShow}>{children}</WrapperContent>
        {shouldShow && <WrapperOverlay>{renderSpinner()}</WrapperOverlay>}
      </Wrapper>
    );
  }

  // Standalone or fullscreen mode (no children)
  if (!shouldShow) return null;

  return (
    <LoadingContainer $fullscreen={fullscreen} className={className}>
      {renderSpinner()}
    </LoadingContainer>
  );
};

Loading.displayName = 'Loading';
