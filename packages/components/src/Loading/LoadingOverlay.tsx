import React, { useEffect, useState } from 'react';
import { styled } from '../utils/styled';
import loadingGif from '../assets/loading.gif';
import { getGlobalTheme } from '../utils/context';
import type { LoadingProps } from './Loading';

export interface LoadingOverlayProps
  extends Pick<LoadingProps, 'size' | 'spinning' | 'delay' | 'tip' | 'className' | 'indicator'> {
  transparent?: boolean;
}

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
  object-fit: contain;
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

const OverlayContainer = styled.div<{ $hasTip: boolean; $transparent: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background: ${({ $transparent, theme }) =>
    $transparent ? 'transparent' : theme.components.loading.wrapper.overlayBackground};
  gap: ${({ $hasTip, theme }) => ($hasTip ? theme.components.loading.indicator.gap : '0')};
`;

const Tip = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.components.loading.tipColor};
`;

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  size = 'medium',
  spinning = true,
  delay = 0,
  tip,
  className,
  indicator,
  transparent = false,
}) => {
  const [shouldShow, setShouldShow] = useState(delay === 0 && spinning);

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

  const renderIndicator = () => {
    const a11yProps = { role: 'status' as const, 'aria-label': 'Loading' };

    if (typeof indicator === 'string') {
      return <SpinnerImage $size={size} src={indicator} alt="Loading" {...a11yProps} />;
    }

    if (indicator) {
      return (
        <CustomIndicatorWrapper $size={size} {...a11yProps}>
          {indicator}
        </CustomIndicatorWrapper>
      );
    }

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

  if (!shouldShow) return null;

  return (
    <OverlayContainer $hasTip={!!tip} $transparent={transparent} className={className}>
      {renderIndicator()}
      {tip && <Tip>{tip}</Tip>}
    </OverlayContainer>
  );
};

LoadingOverlay.displayName = 'LoadingOverlay';
