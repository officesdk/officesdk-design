# Loading 组件指示器配置更新

## 更新概述

为 Loading 组件添加了指示器和动画的主题配置支持，使其更加灵活和可定制。

## 新增配置

### LoadingIndicatorConfig

在 `packages/theme/src/light/components/loading.ts` 中新增了 `LoadingIndicatorConfig` 接口：

```typescript
export interface LoadingIndicatorConfig {
  /**
   * 默认指示器类型
   * - 'gif': 使用动画 GIF 图片
   * - 'css': 使用 CSS 动画（旋转圆环）
   * - 'custom': 使用通过 props 提供的自定义指示器
   */
  defaultType: 'gif' | 'css' | 'custom';
  
  /**
   * 默认指示器图片 URL（当 type 为 'gif' 时使用）
   */
  defaultImage?: string;
  
  /**
   * 指示器颜色（用于 CSS 动画）
   */
  color: string;
  
  /**
   * CSS 动画配置
   */
  animation: {
    duration: string;        // 动画持续时间
    timingFunction: string;  // 动画时间函数
  };
  
  /**
   * 指示器与提示文字之间的间距
   */
  gap: string;
}
```

### 默认配置

```typescript
indicator: {
  defaultType: 'gif',                    // 默认使用 GIF
  defaultImage: undefined,               // 使用内置 GIF
  color: colors.palettes.brand,          // 品牌色
  animation: {
    duration: '1s',                      // 1 秒旋转一圈
    timingFunction: 'linear',            // 线性动画
  },
  gap: '8px',                            // 8px 间距
}
```

## Storybook 演示

### 默认 GIF 指示器 Stories

以下 stories 展示默认的 GIF 指示器（使用默认 theme 配置）：

- **Default**: 默认中等尺寸 GIF loading
- **Small / Medium / Large**: 不同尺寸的 GIF loading
- **AllSizes**: 所有尺寸对比（GIF）
- **WithTip**: 带提示文字的 GIF loading
- **WrapperMode**: 包裹内容的 GIF loading（可切换）
- **WrapperModeWithTip**: 带提示文字包裹内容的 GIF loading
- **WithDelay**: 延迟显示的 GIF loading
- **Showcase**: 完整展示（GIF）

### 自定义指示器 Stories

- **CustomCSSIndicator**: CSS 动画圆环指示器（通过 `indicator` 属性）
  - 支持 `spinning` 属性控制显示/隐藏
  - 包含所有尺寸、带提示、包裹模式的演示
  - 演示如何通过 `indicator` 属性传入自定义 CSS 动画组件
- **CustomEmojiIndicator**: Emoji 自定义指示器（通过 `indicator` 属性）
  - 支持 `spinning` 属性控制显示/隐藏
  - 包含基础展示、带提示、包裹模式的演示

### 使用方式对比

```tsx
// 方式 1: 使用默认配置（GIF）
<Loading size="medium" />

// 方式 2: 通过 indicator 属性自定义（推荐用于特殊场景）
<Loading size="medium" indicator={<MyCustomSpinner />} />

// 方式 3: 通过 theme 全局配置（推荐用于整个应用统一风格）
const customTheme = {
  ...lightTheme,
  components: {
    ...lightTheme.components,
    loading: {
      ...lightTheme.components.loading,
      indicator: {
        ...lightTheme.components.loading.indicator,
        defaultType: 'css', // 或 defaultImage: '/custom.gif'
      },
    },
  },
};
```

## 使用示例

### 1. 使用默认 GIF 指示器（无需配置）

```tsx
<Loading size="medium" />
```

### 2. 全局配置为 CSS 动画指示器

```tsx
import { initUIConfig } from '@officesdk/design';
import { lightTheme } from '@officesdk/design/theme';

const customTheme = {
  ...lightTheme,
  components: {
    ...lightTheme.components,
    loading: {
      ...lightTheme.components.loading,
      indicator: {
        ...lightTheme.components.loading.indicator,
        defaultType: 'css',  // 切换为 CSS 动画
      },
    },
  },
};

initUIConfig({
  theme: customTheme,
});
```

### 3. 自定义 CSS 动画颜色和速度

```tsx
const customTheme = {
  ...lightTheme,
  components: {
    ...lightTheme.components,
    loading: {
      ...lightTheme.components.loading,
      indicator: {
        defaultType: 'css',
        color: '#ff0000',           // 红色指示器
        animation: {
          duration: '0.5s',         // 0.5 秒旋转一圈（更快）
          timingFunction: 'ease',   // 缓动函数
        },
        gap: '12px',                // 更大的间距
      },
    },
  },
};
```

### 4. 使用自定义 GIF 图片

```tsx
const customTheme = {
  ...lightTheme,
  components: {
    ...lightTheme.components,
    loading: {
      ...lightTheme.components.loading,
      indicator: {
        defaultType: 'gif',
        defaultImage: '/path/to/custom-loading.gif',
      },
    },
  },
};
```

### 5. 单独使用自定义指示器（不影响全局配置）

推荐用于特殊场景，不修改全局配置：

```tsx
// 自定义 CSS 动画组件
const CSSSpinner = ({ size = 24 }) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      border: '2px solid transparent',
      borderTopColor: '#1890ff',
      borderRightColor: '#1890ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }}
  />
);

<Loading 
  size="large" 
  indicator={<CSSSpinner size={32} />} 
/>
```

## 文件变更

### 修改的文件

1. **packages/theme/src/light/components/loading.ts**
   - 新增 `LoadingIndicatorConfig` 接口
   - 在 `LoadingConfig` 中添加 `indicator` 字段
   - 添加默认指示器配置

2. **packages/theme/src/index.ts**
   - 导出 `LoadingIndicatorConfig` 类型

3. **packages/components/src/Loading/Loading.tsx**
   - 添加 `CSSSpinner` 样式组件（CSS 动画圆环）
   - 更新 `LoadingContainer` 使用配置的 `gap`
   - 更新 `WrapperOverlay` 使用配置的 `gap`
   - 更新 `renderIndicator` 逻辑支持 CSS 类型指示器
   - 根据主题配置选择合适的指示器类型

4. **packages/components/src/Loading/Loading.stories.tsx**
   - 添加 `CSSAnimatedIndicator` 故事展示 CSS 动画指示器

## 向后兼容性

✅ 完全向后兼容：

- 默认配置使用原有的 GIF 指示器
- 现有代码无需任何修改即可继续工作
- 所有原有功能保持不变

## 优势

1. **灵活性**：支持 GIF、CSS 动画、自定义 React 组件三种指示器类型
2. **主题化**：可以通过主题配置全局定制指示器样式
3. **性能**：CSS 动画性能优于 GIF，可根据需求选择
4. **可配置**：动画速度、颜色、间距都可以配置
5. **易用性**：简单场景零配置，高级场景完全可控

## 类型安全

所有新增配置都有完整的 TypeScript 类型定义，IDE 会提供完整的类型提示和自动补全。
