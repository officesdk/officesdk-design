'use strict';

// ../../node_modules/@officesdk/editor-sdk-core/esm/shared/theme/index.js
var ThemeMode;
(function(ThemeMode2) {
  ThemeMode2["LIGHT"] = "light";
  ThemeMode2["DARK"] = "dark";
})(ThemeMode || (ThemeMode = {}));

// src/light/base.ts
var palettes = {
  // Brand colors
  brand: "#41464b",
  // Red scale
  red: {
    "1": "#fdedf0",
    "2": "#fad2d8",
    "3": "#e9a2a5",
    "4": "#de7f83",
    "5": "#e96465",
    "6": "#e95555",
    "7": "#e0504e",
    "8": "#cd4747",
    "9": "#c04140",
    "10": "#af3a37"
  },
  // Orange scale
  orange: {
    "1": "#fde7e1",
    "2": "#fdc8ab",
    "3": "#faa573",
    "4": "#f3833a",
    "5": "#ed6b00",
    "6": "#e65600",
    "7": "#dc5000",
    "8": "#cf4900",
    "9": "#c24100",
    "10": "#ab3300"
  },
  // Yellow scale
  yellow: {
    "1": "#fcfcea",
    "2": "#f8f7cb",
    "3": "#f4f2aa",
    "4": "#f1ed8b",
    "5": "#eee874",
    "6": "#ebe361",
    "7": "#e9d45c",
    "8": "#e5bf52",
    "9": "#e0a849",
    "10": "#d78539"
  },
  // Green scale
  green: {
    "1": "#e8f3e8",
    "2": "#c7e2c7",
    "3": "#a4d0a3",
    "4": "#80be7f",
    "5": "#66b165",
    "6": "#4ea44b",
    "7": "#459542",
    "8": "#3a8438",
    "9": "#30732e",
    "10": "#1e541d"
  },
  // Cyan scale
  cyan: {
    "1": "#e0f9fd",
    "2": "#b1eff8",
    "3": "#7ae6f5",
    "4": "#37d9f0",
    "5": "#00d2ec",
    "6": "#00c9e8",
    "7": "#00b9d4",
    "8": "#00a3b8",
    "9": "#008fa0",
    "10": "#006c72"
  },
  // Blue scale
  blue: {
    "1": "#e4f1fb",
    "2": "#bfdcf7",
    "3": "#98c7f1",
    "4": "#73b1eb",
    "5": "#6da0e3",
    "6": "#5ba0e7",
    "7": "#4583d4",
    "8": "#3e72c1",
    "9": "#3861af",
    "10": "#2d448f"
  },
  // Purple scale
  purple: {
    "1": "#e7e3f0",
    "2": "#c3bbda",
    "3": "#9c8ec1",
    "4": "#7562ab",
    "5": "#59439e",
    "6": "#3a2590",
    "7": "#31218b",
    "8": "#221a83",
    "9": "#10147b",
    "10": "#000a6d"
  },
  // Gray scale
  gray: {
    "0": "#fff",
    "1": "#fdfdfd",
    "2": "#fbfbfb",
    "3": "#f9f9f9",
    "4": "#f7f7f7",
    "5": "#f6f6f6",
    "6": "#f4f4f4",
    "7": "#f2f2f2",
    "8": "#f1f1f1",
    "9": "#eee",
    "10": "#eceded",
    "20": "#d9dadb",
    "30": "#c6c8c9",
    "40": "#b3b5b7",
    "50": "#a0a2a5",
    "60": "#8d9093",
    "70": "#7a7e81",
    "80": "#676b6f",
    "90": "#54585d",
    "100": "#41464b",
    "110": "#363b3e",
    "120": "#2c3033"
  },
  // Transparency scale (using rgba for light theme)
  transparency: {
    "2": "rgba(65, 70, 75, 0.02)",
    "5": "rgba(65, 70, 75, 0.05)",
    "8": "rgba(65, 70, 75, 0.08)",
    "10": "rgba(65, 70, 75, 0.10)",
    "15": "rgba(65, 70, 75, 0.15)",
    "20": "rgba(65, 70, 75, 0.20)",
    "30": "rgba(65, 70, 75, 0.30)",
    "40": "rgba(65, 70, 75, 0.40)",
    "50": "rgba(65, 70, 75, 0.50)",
    "60": "rgba(65, 70, 75, 0.60)",
    "70": "rgba(65, 70, 75, 0.70)",
    "80": "rgba(65, 70, 75, 0.80)",
    "90": "rgba(65, 70, 75, 0.90)",
    "100": "rgba(65, 70, 75, 1)",
    "110": "#363b3e",
    "120": "#2c3033"
  }
};
var colors = {
  base: {
    default: palettes.brand,
    notice: palettes.blue["5"],
    success: palettes.green["6"],
    warning: palettes.yellow["7"],
    error: palettes.red["6"],
    guidance: palettes.blue["6"]
  },
  border: {
    default: palettes.transparency["10"],
    hover: palettes.transparency["20"],
    active: palettes.transparency["30"],
    error: palettes.red["6"],
    disabled: palettes.transparency["10"]
  },
  background: {
    hover: palettes.transparency["5"],
    selected: palettes.transparency["10"],
    disabled: palettes.gray["5"]
  },
  mask: {
    light: palettes.transparency["50"],
    dark: palettes.transparency["80"]
  },
  gradient: {
    dark: `linear-gradient(0deg, ${palettes.gray["120"]} -0.09%, ${palettes.gray["90"]} 100%)`,
    guidance: `linear-gradient(0deg, ${palettes.blue["8"]} -0.09%, ${palettes.blue["5"]} 100%)`,
    light: `linear-gradient(0deg, ${palettes.gray["5"]} -0.09%, ${palettes.gray["0"]} 100%)`,
    error: `linear-gradient(0deg, ${palettes.red["8"]} -0.09%, ${palettes.red["5"]} 100%)`
  },
  palettes: {
    brand: palettes.brand,
    red: palettes.red,
    yellow: palettes.yellow,
    orange: palettes.orange,
    green: palettes.green,
    cyan: palettes.cyan,
    blue: palettes.blue,
    purple: palettes.purple,
    gray: palettes.gray,
    transparency: palettes.transparency
  }
};
var boxShadow = {
  small: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
  medium: "0 4px 10px rgba(65, 70, 75, 0.06)",
  large: "0 8px 18px 0 rgba(0, 0, 0, 0.06)",
  xl: "0 20px 32px 0 rgba(0, 0, 0, 0.06)"
};
var borderRadius = {
  none: 0,
  small: "2px",
  medium: "4px",
  large: "8px",
  xl: "12px",
  xxl: "16px",
  full: "1000px"
};
var typography = {
  title: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    fontSize: {
      xs: "12px",
      s: "13px",
      m: "14px",
      l: "16px",
      xl: "20px",
      xxl: "24px",
      xxxl: "32px"
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: "1.2",
      regular: "1.4",
      medium: "1.5",
      relaxed: "1.6",
      loose: "1.8"
    }
  },
  paragraph: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    fontSize: {
      xs: "12px",
      s: "13px",
      m: "14px",
      l: "16px",
      xl: "18px",
      xxl: "20px",
      xxxl: "24px"
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: "1.4",
      regular: "1.5",
      medium: "1.6",
      relaxed: "1.7",
      loose: "2"
    }
  },
  article: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    fontSize: {
      xs: "12px",
      s: "14px",
      m: "16px",
      l: "18px",
      xl: "20px",
      xxl: "24px",
      xxxl: "28px"
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: "1.5",
      regular: "1.6",
      medium: "1.7",
      relaxed: "1.8",
      loose: "2"
    }
  }
};

// src/light/components/button.ts
var button = {
  icons: {
    close: {
      url: "",
      size: { width: "16px", height: "16px" }
    },
    clear: {
      url: "",
      size: { width: "16px", height: "16px" }
    },
    search: {
      url: "",
      size: { width: "16px", height: "16px" }
    }
  },
  solid: {
    default: {
      background: `linear-gradient(0deg, ${colors.palettes.gray["120"]} 0%, ${colors.palettes.gray["90"]} 100%)`,
      backgroundHover: colors.palettes.transparency["80"],
      backgroundActive: colors.palettes.gray["120"],
      backgroundDisabled: colors.palettes.transparency["30"],
      color: colors.palettes.gray["0"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: "transparent",
      borderColorHover: "transparent",
      borderColorActive: "transparent",
      borderColorDisabled: "transparent",
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    },
    guidance: {
      background: `linear-gradient(0deg, ${colors.palettes.blue["7"]} 0%, ${colors.palettes.blue["5"]} 100%)`,
      backgroundHover: colors.palettes.blue["6"],
      backgroundActive: colors.palettes.blue["7"],
      backgroundDisabled: "rgba(91, 160, 231, 0.30)",
      color: colors.palettes.gray["0"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: "transparent",
      borderColorHover: "transparent",
      borderColorActive: "transparent",
      borderColorDisabled: "transparent",
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    },
    alert: {
      background: `linear-gradient(0deg, ${colors.palettes.red["8"]} 0%, ${colors.palettes.red["6"]} 100%)`,
      backgroundHover: colors.palettes.red["6"],
      backgroundActive: colors.palettes.red["7"],
      backgroundDisabled: "rgba(233, 85, 85, 0.30)",
      color: colors.palettes.gray["0"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: "transparent",
      borderColorHover: "transparent",
      borderColorActive: "transparent",
      borderColorDisabled: "transparent",
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    }
  },
  outlined: {
    default: {
      background: `linear-gradient(0deg, ${colors.palettes.gray["5"]} 0%, ${colors.palettes.gray["0"]} 100%)`,
      backgroundHover: colors.palettes.gray["0"],
      backgroundActive: colors.palettes.gray["3"],
      backgroundDisabled: colors.palettes.transparency["5"],
      color: colors.palettes.brand,
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: colors.palettes.transparency["10"],
      borderColorHover: colors.palettes.transparency["20"],
      borderColorActive: colors.palettes.transparency["30"],
      borderColorDisabled: colors.palettes.transparency["10"],
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    },
    guidance: {
      background: `linear-gradient(0deg, ${colors.palettes.gray["5"]} 0%, ${colors.palettes.gray["0"]} 100%)`,
      backgroundHover: colors.palettes.gray["0"],
      backgroundActive: colors.palettes.gray["3"],
      backgroundDisabled: colors.palettes.transparency["5"],
      color: colors.palettes.blue["6"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: colors.palettes.transparency["10"],
      borderColorHover: colors.palettes.transparency["20"],
      borderColorActive: colors.palettes.transparency["30"],
      borderColorDisabled: colors.palettes.transparency["10"],
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    },
    alert: {
      background: `linear-gradient(0deg, ${colors.palettes.gray["5"]} 0%, ${colors.palettes.gray["0"]} 100%)`,
      backgroundHover: colors.palettes.gray["0"],
      backgroundActive: colors.palettes.gray["3"],
      backgroundDisabled: colors.palettes.transparency["5"],
      color: colors.palettes.red["6"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: colors.palettes.transparency["10"],
      borderColorHover: colors.palettes.transparency["20"],
      borderColorActive: colors.palettes.transparency["30"],
      borderColorDisabled: colors.palettes.transparency["10"],
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    }
  },
  text: {
    default: {
      background: "transparent",
      backgroundHover: colors.palettes.transparency["5"],
      backgroundActive: colors.palettes.transparency["10"],
      backgroundDisabled: "transparent",
      color: colors.palettes.brand,
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: "transparent",
      borderColorHover: "transparent",
      borderColorActive: "transparent",
      borderColorDisabled: "transparent",
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    },
    guidance: {
      background: "transparent",
      backgroundHover: colors.palettes.blue["1"],
      backgroundActive: colors.palettes.blue["2"],
      backgroundDisabled: "transparent",
      color: colors.palettes.blue["6"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: "transparent",
      borderColorHover: "transparent",
      borderColorActive: "transparent",
      borderColorDisabled: "transparent",
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    },
    alert: {
      background: "transparent",
      backgroundHover: colors.palettes.red["1"],
      backgroundActive: colors.palettes.red["2"],
      backgroundDisabled: "transparent",
      color: colors.palettes.red["6"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: "transparent",
      borderColorHover: "transparent",
      borderColorActive: "transparent",
      borderColorDisabled: "transparent",
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    },
    status: {
      background: colors.palettes.blue["1"],
      backgroundHover: colors.palettes.blue["2"],
      backgroundActive: colors.palettes.blue["3"],
      backgroundDisabled: colors.palettes.transparency["5"],
      color: colors.palettes.blue["6"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none",
      borderColor: "transparent",
      borderColorHover: "transparent",
      borderColorActive: "transparent",
      borderColorDisabled: "transparent",
      fontWeight: 500,
      colorHover: colors.palettes.gray["0"],
      colorActive: colors.palettes.gray["0"],
      colorDisabled: colors.palettes.gray["0"]
    }
  },
  small: {
    height: "28px",
    padding: "4px 12px",
    fontSize: "13px",
    lineHeight: "20px",
    borderRadius: "4px",
    iconSize: { width: "14px", height: "14px" },
    iconGap: "4px"
  },
  medium: {
    height: "32px",
    padding: "6px 16px",
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "4px",
    iconSize: { width: "16px", height: "16px" },
    iconGap: "6px"
  },
  large: {
    height: "36px",
    padding: "8px 20px",
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "4px",
    iconSize: { width: "16px", height: "16px" },
    iconGap: "6px"
  },
  extraLarge: {
    height: "40px",
    padding: "10px 24px",
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "4px",
    iconSize: { width: "16px", height: "16px" },
    iconGap: "8px"
  }
};

// src/light/components/toast.ts
var toast = {
  padding: "12px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  success: {
    background: colors.palettes.green["1"],
    borderColor: colors.palettes.green["2"],
    icon: {
      url: "",
      size: { width: "20px", height: "20px" }
    },
    button: {
      fontSize: "14px",
      fontWeight: 500,
      color: colors.palettes.green["6"],
      gap: "8px"
    }
  },
  info: {
    background: colors.palettes.blue["1"],
    borderColor: colors.palettes.blue["2"],
    icon: {
      url: "",
      size: { width: "20px", height: "20px" }
    },
    button: {
      fontSize: "14px",
      fontWeight: 500,
      color: colors.palettes.blue["6"],
      gap: "8px"
    }
  },
  error: {
    background: colors.palettes.red["1"],
    borderColor: colors.palettes.red["2"],
    icon: {
      url: "",
      size: { width: "20px", height: "20px" }
    },
    button: {
      fontSize: "14px",
      fontWeight: 500,
      color: colors.palettes.red["6"],
      gap: "8px"
    }
  },
  warn: {
    background: colors.palettes.yellow["1"],
    borderColor: colors.palettes.yellow["2"],
    icon: {
      url: "",
      size: { width: "20px", height: "20px" }
    },
    button: {
      fontSize: "14px",
      fontWeight: 500,
      color: colors.palettes.yellow["7"],
      gap: "8px"
    }
  }
};

// src/light/components/input.ts
var input = {
  icons: {
    search: {
      url: "",
      size: { width: "16px", height: "16px" }
    },
    clear: {
      url: "",
      size: { width: "16px", height: "16px" }
    }
  },
  outlined: {
    state: {
      borderColor: colors.palettes.transparency["10"],
      borderColorHover: colors.palettes.transparency["20"],
      borderColorActive: colors.palettes.transparency["30"],
      borderColorDisabled: colors.palettes.transparency["10"],
      borderColorError: colors.palettes.red["6"],
      borderColorReadonly: colors.palettes.transparency["10"],
      background: colors.palettes.gray["0"],
      backgroundHover: colors.palettes.gray["0"],
      backgroundActive: colors.palettes.gray["0"],
      backgroundDisabled: colors.palettes.gray["5"],
      backgroundReadonly: colors.palettes.gray["2"]
    },
    mini: {
      borderRadius: "4px",
      iconSize: { width: "12px", height: "12px" },
      padding: "2px 4px",
      height: "20px",
      fontSize: "12px",
      lineHeight: "20px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      boxShadowDisabled: "none"
    },
    small: {
      borderRadius: "4px",
      iconSize: { width: "14px", height: "14px" },
      padding: "2px 4px",
      height: "24px",
      fontSize: "12px",
      lineHeight: "20px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      boxShadowDisabled: "none"
    },
    medium: {
      borderRadius: "4px",
      iconSize: { width: "18px", height: "18px" },
      padding: "4px 8px",
      height: "32px",
      fontSize: "13px",
      lineHeight: "20px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      boxShadowDisabled: "none"
    },
    large: {
      borderRadius: "4px",
      iconSize: { width: "18px", height: "18px" },
      padding: "4px 8px",
      height: "32px",
      fontSize: "13px",
      lineHeight: "20px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      boxShadowDisabled: "none"
    },
    extraLarge: {
      borderRadius: "4px",
      iconSize: { width: "20px", height: "20px" },
      padding: "6px 12px",
      height: "40px",
      fontSize: "14px",
      lineHeight: "24px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      boxShadowDisabled: "none"
    }
  },
  underlined: {
    state: {
      borderColor: colors.palettes.transparency["10"],
      borderColorHover: colors.palettes.transparency["20"],
      borderColorActive: colors.palettes.transparency["30"],
      borderColorDisabled: colors.palettes.transparency["10"],
      borderColorError: colors.palettes.red["6"],
      borderColorReadonly: colors.palettes.transparency["10"],
      background: "transparent",
      backgroundHover: "transparent",
      backgroundActive: "transparent",
      backgroundDisabled: "transparent",
      backgroundReadonly: "transparent"
    },
    mini: {
      borderRadius: "0",
      iconSize: { width: "12px", height: "12px" },
      padding: "2px 0",
      height: "20px",
      fontSize: "12px",
      lineHeight: "20px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none"
    },
    small: {
      borderRadius: "0",
      iconSize: { width: "14px", height: "14px" },
      padding: "2px 0",
      height: "24px",
      fontSize: "12px",
      lineHeight: "20px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none"
    },
    medium: {
      borderRadius: "0",
      iconSize: { width: "18px", height: "18px" },
      padding: "4px 0",
      height: "32px",
      fontSize: "13px",
      lineHeight: "20px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none"
    },
    large: {
      borderRadius: "0",
      iconSize: { width: "18px", height: "18px" },
      padding: "4px 0",
      height: "32px",
      fontSize: "13px",
      lineHeight: "20px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none"
    },
    extraLarge: {
      borderRadius: "0",
      iconSize: { width: "20px", height: "20px" },
      padding: "6px 0",
      height: "40px",
      fontSize: "14px",
      lineHeight: "24px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "none",
      boxShadowDisabled: "none"
    }
  }
};

// src/light/components/radio.ts
var radio = {
  unchecked: {
    borderColor: colors.palettes.transparency["30"],
    borderColorHover: colors.palettes.brand,
    borderColorActive: colors.palettes.brand,
    borderColorDisabled: colors.palettes.transparency["10"],
    background: colors.palettes.gray["0"],
    backgroundHover: colors.palettes.gray["0"],
    backgroundDisabled: colors.palettes.gray["5"]
  },
  checked: {
    borderColor: colors.palettes.brand,
    borderColorHover: colors.palettes.brand,
    borderColorActive: colors.palettes.brand,
    borderColorDisabled: colors.palettes.transparency["10"],
    background: colors.palettes.brand,
    backgroundHover: colors.palettes.brand,
    backgroundDisabled: colors.palettes.gray["5"]
  },
  small: {
    size: "16px",
    dotSize: "8px",
    fontSize: "14px",
    gap: "8px"
  }
};

// src/light/components/checkbox.ts
var checkbox = {
  icons: {
    checked: "",
    indeterminate: ""
  },
  unchecked: {
    borderColor: colors.palettes.transparency["30"],
    borderColorHover: colors.palettes.brand,
    borderColorActive: colors.palettes.brand,
    borderColorDisabled: colors.palettes.transparency["10"],
    background: colors.palettes.gray["0"],
    backgroundHover: colors.palettes.gray["0"],
    backgroundDisabled: colors.palettes.gray["5"]
  },
  checked: {
    borderColor: colors.palettes.brand,
    borderColorHover: colors.palettes.brand,
    borderColorActive: colors.palettes.brand,
    borderColorDisabled: colors.palettes.transparency["10"],
    background: colors.palettes.brand,
    backgroundHover: colors.palettes.brand,
    backgroundDisabled: colors.palettes.gray["5"]
  },
  indeterminate: {
    borderColor: colors.palettes.brand,
    borderColorHover: colors.palettes.brand,
    borderColorActive: colors.palettes.brand,
    borderColorDisabled: colors.palettes.transparency["10"],
    background: colors.palettes.brand,
    backgroundHover: colors.palettes.brand,
    backgroundDisabled: colors.palettes.gray["5"]
  },
  small: {
    size: "16px",
    borderRadius: "4px",
    iconSize: { width: "12px", height: "12px" },
    fontSize: "14px",
    gap: "8px"
  }
};

// src/light/components/switch.ts
var switchComponent = {
  off: {
    track: {
      background: colors.palettes.transparency["20"],
      backgroundHover: colors.palettes.transparency["30"],
      backgroundDisabled: colors.palettes.transparency["30"],
      boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.10) inset",
      boxShadowHover: "0 0 2px 0 rgba(0, 0, 0, 0.10) inset",
      boxShadowDisabled: "0 0 2px 0 rgba(0, 0, 0, 0.10) inset"
    },
    thumb: {
      background: colors.palettes.gray["8"],
      backgroundHover: colors.palettes.gray["0"],
      backgroundDisabled: colors.palettes.gray["8"],
      borderColor: colors.palettes.transparency["10"],
      borderColorHover: colors.palettes.transparency["10"],
      borderColorActive: colors.palettes.transparency["10"],
      borderColorDisabled: colors.palettes.transparency["10"],
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
      boxShadowHover: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
      boxShadowDisabled: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
    }
  },
  on: {
    track: {
      background: colors.base.notice,
      backgroundHover: colors.base.notice,
      backgroundDisabled: colors.palettes.transparency["10"],
      boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.10) inset",
      boxShadowHover: "0 0 2px 0 rgba(0, 0, 0, 0.10) inset",
      boxShadowDisabled: "0 0 2px 0 rgba(0, 0, 0, 0.10) inset"
    },
    thumb: {
      background: colors.palettes.gray["0"],
      backgroundHover: colors.palettes.gray["0"],
      backgroundDisabled: colors.palettes.gray["0"],
      borderColor: colors.palettes.transparency["10"],
      borderColorHover: colors.palettes.transparency["10"],
      borderColorActive: colors.palettes.transparency["10"],
      borderColorDisabled: colors.palettes.transparency["10"],
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
      boxShadowHover: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
      boxShadowDisabled: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
    }
  },
  // Smooth transition animation
  transition: "all 0.5s ease",
  small: {
    container: {
      width: "28px",
      height: "16px"
    },
    track: {
      width: "24px",
      height: "10px",
      borderRadius: "8px",
      boxShadow: "inset 0px 0px 2px 0px rgba(0, 0, 0, 0.1)"
    },
    thumb: {
      size: "14px",
      borderRadius: "50%",
      borderWidth: "1px",
      offset: "1px"
    }
  },
  medium: {
    container: {
      width: "42px",
      height: "24px"
    },
    track: {
      width: "38px",
      height: "16px",
      borderRadius: "10px",
      boxShadow: "inset 0px 0px 2px 0px rgba(0, 0, 0, 0.1)"
    },
    thumb: {
      size: "22px",
      borderRadius: "50%",
      borderWidth: "1px",
      offset: "1px"
    }
  },
  large: {
    container: {
      width: "56px",
      height: "32px"
    },
    track: {
      width: "48px",
      height: "20px",
      borderRadius: "12px",
      boxShadow: "inset 0px 0px 2px 0px rgba(0, 0, 0, 0.1)"
    },
    thumb: {
      size: "28px",
      borderRadius: "50%",
      borderWidth: "1px",
      offset: "2px"
    }
  }
};

// src/light/components/dropdown.ts
var dropdown = {
  icons: {
    arrow: {
      url: "",
      size: { width: "12px", height: "12px" },
      expandedRotateAngel: "180deg"
    },
    check: {
      url: "",
      size: { width: "14px", height: "14px" }
    }
  },
  button: {
    trigger: {
      borderColor: colors.palettes.transparency["20"],
      borderColorHover: colors.palettes.transparency["30"],
      borderColorActive: colors.palettes.transparency["30"],
      borderColorDisabled: colors.palettes.transparency["10"],
      background: colors.palettes.gray["0"],
      backgroundHover: colors.palettes.gray["0"],
      backgroundActive: colors.palettes.gray["0"],
      backgroundDisabled: colors.palettes.gray["5"],
      color: colors.palettes.brand,
      colorDisabled: colors.palettes.transparency["30"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      boxShadowDisabled: "none"
    },
    menu: {
      background: colors.palettes.gray["0"],
      borderColor: colors.palettes.transparency["10"],
      borderRadius: "8px",
      padding: "4px",
      boxShadow: "0 8px 18px 0 rgba(0, 0, 0, 0.06)",
      maxHeight: "280px"
    },
    menuItem: {
      background: "transparent",
      backgroundHover: colors.palettes.transparency["5"],
      backgroundDisabled: "transparent",
      backgroundSelected: colors.palettes.transparency["8"],
      color: colors.palettes.brand,
      colorDisabled: colors.palettes.transparency["30"],
      padding: "8px 12px"
    }
  },
  input: {
    trigger: {
      borderColor: colors.palettes.transparency["10"],
      borderColorHover: colors.palettes.transparency["20"],
      borderColorActive: colors.palettes.transparency["30"],
      borderColorDisabled: colors.palettes.transparency["10"],
      background: colors.palettes.gray["0"],
      backgroundHover: colors.palettes.gray["0"],
      backgroundActive: colors.palettes.gray["0"],
      backgroundDisabled: colors.palettes.gray["5"],
      color: colors.palettes.brand,
      colorDisabled: colors.palettes.transparency["30"],
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      boxShadowDisabled: "none"
    },
    menu: {
      background: colors.palettes.gray["0"],
      borderColor: colors.palettes.transparency["10"],
      borderRadius: "8px",
      padding: "4px",
      boxShadow: "0 8px 18px 0 rgba(0, 0, 0, 0.06)",
      maxHeight: "280px"
    },
    menuItem: {
      background: "transparent",
      backgroundHover: colors.palettes.transparency["5"],
      backgroundDisabled: "transparent",
      backgroundSelected: colors.palettes.transparency["8"],
      color: colors.palettes.brand,
      colorDisabled: colors.palettes.transparency["30"],
      padding: "8px 12px"
    }
  },
  large: {
    height: "36px",
    padding: "8px 12px",
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "4px",
    fontWeight: 400,
    iconSize: { width: "16px", height: "16px" }
  }
};

// src/light/components/tab.ts
var tab = {
  line: {
    item: {
      background: "transparent",
      backgroundHover: "transparent",
      backgroundActive: "transparent",
      backgroundDisabled: "transparent",
      borderColor: "transparent",
      borderColorHover: "transparent",
      borderColorActive: colors.palettes.brand,
      borderColorDisabled: "transparent",
      color: colors.palettes.transparency["60"],
      colorHover: colors.palettes.brand,
      colorActive: colors.palettes.brand,
      colorDisabled: colors.palettes.transparency["30"]
    },
    layout: {
      gap: "24px"
    }
  },
  card: {
    item: {
      background: "transparent",
      backgroundHover: colors.palettes.transparency["5"],
      backgroundActive: colors.palettes.gray["0"],
      backgroundDisabled: "transparent",
      borderColor: "transparent",
      borderColorHover: "transparent",
      borderColorActive: colors.palettes.transparency["10"],
      borderColorDisabled: "transparent",
      color: colors.palettes.transparency["60"],
      colorHover: colors.palettes.brand,
      colorActive: colors.palettes.brand,
      colorDisabled: colors.palettes.transparency["30"]
    },
    layout: {
      gap: "0"
    }
  },
  large: {
    height: "40px",
    padding: "10px 16px",
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "4px",
    fontWeight: 500
  }
};

// src/light/components/slider.ts
var slider = {
  thumb: {
    background: colors.palettes.gray["0"],
    backgroundHover: colors.palettes.gray["0"],
    backgroundActive: colors.palettes.gray["0"],
    backgroundDisabled: colors.palettes.gray["0"],
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
    boxShadowHover: "0 2px 6px rgba(0, 0, 0, 0.2)",
    boxShadowActive: "0 2px 6px rgba(0, 0, 0, 0.2)",
    boxShadowDisabled: "none",
    borderColor: colors.palettes.brand,
    borderColorHover: colors.palettes.brand,
    borderColorActive: colors.palettes.brand,
    borderColorDisabled: colors.palettes.transparency["20"]
  },
  track: {
    background: colors.palettes.transparency["10"],
    backgroundDisabled: colors.palettes.transparency["5"],
    filledBackground: colors.palettes.brand,
    height: "4px",
    width: "100%",
    borderRadius: "2px"
  },
  large: {
    height: "20px",
    thumbSize: "16px",
    thumbOffset: "0"
  }
};

// src/light/components/inputNumber.ts
var inputNumber = {
  icons: {
    increment: "",
    decrement: "",
    url: "",
    size: { width: "12px", height: "12px" },
    opacity: 0.6,
    hoverOpacity: 1,
    disabledOpacity: 0.3
  },
  input: {
    borderColor: colors.palettes.transparency["10"],
    borderColorHover: colors.palettes.transparency["20"],
    borderColorActive: colors.palettes.transparency["30"],
    borderColorDisabled: colors.palettes.transparency["10"],
    borderColorError: colors.palettes.red["6"],
    borderColorReadonly: colors.palettes.transparency["10"],
    background: colors.palettes.gray["0"],
    backgroundHover: colors.palettes.gray["0"],
    backgroundActive: colors.palettes.gray["0"],
    backgroundDisabled: colors.palettes.gray["5"],
    backgroundReadonly: colors.palettes.gray["2"],
    color: colors.palettes.brand,
    colorDisabled: colors.palettes.transparency["30"]
  },
  button: {
    borderColor: colors.palettes.transparency["10"],
    borderColorHover: colors.palettes.transparency["20"],
    borderColorActive: colors.palettes.transparency["30"],
    borderColorDisabled: colors.palettes.transparency["10"],
    borderColorError: colors.palettes.red["6"],
    borderColorReadonly: colors.palettes.transparency["10"],
    background: colors.palettes.gray["0"],
    backgroundHover: colors.palettes.transparency["5"],
    backgroundActive: colors.palettes.transparency["10"],
    backgroundDisabled: colors.palettes.gray["5"]
  },
  small: {
    button: { width: "28px" },
    input: {
      width: "60px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      boxShadowDisabled: "none"
    },
    height: "28px",
    borderRadius: "4px"
  },
  large: {
    button: { width: "36px" },
    input: {
      width: "80px",
      boxShadow: "none",
      boxShadowHover: "none",
      boxShadowActive: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      boxShadowDisabled: "none"
    },
    height: "36px",
    borderRadius: "4px"
  }
};

// src/light/components/tooltip.ts
var tooltip = {
  arrow: {
    size: { width: "8px", height: "8px" },
    borderRadius: "2px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
  },
  black: {
    background: colors.palettes.gray["100"],
    borderColor: "transparent",
    color: colors.palettes.gray["0"],
    borderRadius: "4px",
    padding: "6px 12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400,
    maxWidth: "280px"
  },
  white: {
    small: {
      background: colors.palettes.gray["0"],
      borderColor: colors.palettes.transparency["10"],
      color: colors.palettes.brand,
      borderRadius: "4px",
      padding: "4px 8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: 400
    },
    large: {
      background: colors.palettes.gray["0"],
      borderColor: colors.palettes.transparency["10"],
      color: colors.palettes.brand,
      borderRadius: "8px",
      padding: "12px 16px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400
    }
  }
};

// src/light/components/index.ts
var components = {
  toast,
  input,
  radio,
  checkbox,
  switch: switchComponent,
  button,
  dropdown,
  tab,
  slider,
  inputNumber,
  tooltip
};

// src/light/index.ts
var lightTheme = {
  name: "sm-light",
  mode: ThemeMode.LIGHT,
  colors,
  boxShadow,
  borderRadius,
  typography,
  components
};

// src/index.ts
var theme = lightTheme;

exports.lightTheme = lightTheme;
exports.theme = theme;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map