import React from 'react';
import { styled } from '../utils/styled';
import loadingGif from '../assets/loading.gif';
import { lightTheme, type LoadingConfig } from '@officesdk/design-theme';

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

const defaultLoadingConfig = lightTheme.components.loading;

const getLoadingConfig = (theme?: { components?: Record<string, unknown> }): LoadingConfig => {
  const loadingConfig = theme?.components?.loading as LoadingConfig | undefined;
  return loadingConfig ?? defaultLoadingConfig;
};

const SpinnerImage = styled.img<{
  $size: LoadingProps['size'];
}>`
  display: inline-block;

  ${({ $size, theme }) => {
    const loadingConfig = getLoadingConfig(theme);
    const sizeConfig = loadingConfig[$size || 'medium'];

    return `
      width: ${sizeConfig.size};
      height: ${sizeConfig.size};
    `;
  }}
`;

const CustomIndicatorWrapper = styled.span<{
  $size: LoadingProps['size'];
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ $size, theme }) => {
    const loadingConfig = getLoadingConfig(theme);
    const sizeConfig = loadingConfig[$size || 'medium'];

    return `
      width: ${sizeConfig.size};
      height: ${sizeConfig.size};
    `;
  }}
`;

const LoadingContainer = styled.div<{
  $fullscreen: boolean;
}>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${({ $fullscreen, theme }) => {
    if (!$fullscreen) return '';
    const loadingConfig = getLoadingConfig(theme);
    return `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: ${loadingConfig.fullscreen.zIndex};
      background: ${loadingConfig.fullscreen.background};
    `;
  }}
`;

const Tip = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => getLoadingConfig(theme).tipColor};
`;

const Wrapper = styled.div`
  position: relative;
`;

const WrapperContent = styled.div<{ $spinning: boolean }>`
  transition: opacity 0.3s;
  opacity: ${({ $spinning, theme }) =>
    $spinning ? getLoadingConfig(theme).wrapper.contentOpacity : 1};
  pointer-events: ${({ $spinning }) => ($spinning ? 'none' : 'auto')};
`;

const WrapperOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 1;
  background: ${({ theme }) => getLoadingConfig(theme).wrapper.overlayBackground};
`;

/**
 * Loading Component
 *
 * A loading component that displays an animated GIF indicator.
 * By default uses a built-in loading GIF, but supports custom indicators.
 *
 * @example
 * // Basic usage
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
  const [shouldShow, setShouldShow] = React.useState(delay === 0 && spinning);

  React.useEffect(() => {
    if (spinning) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setShouldShow(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setShouldShow(true);
      }
    } else {
      setShouldShow(false);
    }
  }, [spinning, delay]);

  const renderIndicator = () => {
    // Custom indicator as string (image URL)
    if (typeof indicator === 'string') {
      return (
        <SpinnerImage
          $size={size}
          src={indicator}
          alt="Loading"
          role="status"
          aria-label="Loading"
        />
      );
    }
    // Custom indicator as React element
    if (indicator) {
      return (
        <CustomIndicatorWrapper $size={size} role="status" aria-label="Loading">
          {indicator}
        </CustomIndicatorWrapper>
      );
    }
    // Default GIF indicator
    return (
      <SpinnerImage
        $size={size}
        src={loadingGif}
        alt="Loading"
        role="status"
        aria-label="Loading"
      />
    );
  };

  const spinnerElement = (
    <>
      {renderIndicator()}
      {tip && <Tip>{tip}</Tip>}
    </>
  );

  // Fullscreen mode
  if (fullscreen) {
    if (!shouldShow) return null;
    return (
      <LoadingContainer $fullscreen className={className}>
        {spinnerElement}
      </LoadingContainer>
    );
  }

  // Standalone spinner (no children)
  if (React.Children.count(children) === 0) {
    if (!shouldShow) return null;
    return (
      <LoadingContainer $fullscreen={false} className={className}>
        {spinnerElement}
      </LoadingContainer>
    );
  }

  // Wrapper mode (with children)
  return (
    <Wrapper className={className}>
      <WrapperContent $spinning={shouldShow}>{children}</WrapperContent>
      {shouldShow && <WrapperOverlay>{spinnerElement}</WrapperOverlay>}
    </Wrapper>
  );
};

Loading.displayName = 'Loading';
