/**
 * SmartDorm AI Studio - Shared Tailwind Config
 * Material Design 3 color tokens + typography scale
 * Dùng chung cho tất cả 4 trang thiết kế HTML
 *
 * Load trước Tailwind CDN:
 *   <script src="shared-tailwind-config.js"></script>
 *   <script src="https://cdn.tailwindcss.com"></script>
 */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary
        "primary": "#0037b0",
        "primary-container": "#1d4ed8",
        "on-primary": "#ffffff",
        "on-primary-container": "#cad3ff",
        "primary-fixed": "#dce1ff",
        "primary-fixed-dim": "#b7c4ff",
        "on-primary-fixed": "#001551",
        "on-primary-fixed-variant": "#0039b5",
        "inverse-primary": "#b7c4ff",
        // Secondary
        "secondary": "#006591",
        "secondary-container": "#39b8fd",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#004666",
        "secondary-fixed": "#c9e6ff",
        "secondary-fixed-dim": "#89ceff",
        "on-secondary-fixed": "#001e2f",
        "on-secondary-fixed-variant": "#004c6e",
        // Tertiary
        "tertiary": "#5311bc",
        "tertiary-container": "#6b38d4",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#ddcdff",
        "tertiary-fixed": "#e9ddff",
        "tertiary-fixed-dim": "#d0bcff",
        "on-tertiary-fixed": "#23005c",
        "on-tertiary-fixed-variant": "#5516be",
        // Error
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        // Surface
        "background": "#faf8ff",
        "on-background": "#131b2e",
        "surface": "#faf8ff",
        "surface-dim": "#d2d9f4",
        "surface-bright": "#faf8ff",
        "surface-variant": "#dae2fd",
        "surface-tint": "#2151da",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f3ff",
        "surface-container": "#eaedff",
        "surface-container-high": "#e2e7ff",
        "surface-container-highest": "#dae2fd",
        "on-surface": "#131b2e",
        "on-surface-variant": "#434655",
        "inverse-surface": "#283044",
        "inverse-on-surface": "#eef0ff",
        // Outline
        "outline": "#747686",
        "outline-variant": "#c4c5d7",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "space-xs":  "0.25rem",
        "space-sm":  "0.5rem",
        "space-md":  "1rem",
        "space-lg":  "1.5rem",
        "space-xl":  "2rem",
        "space-2xl": "3rem",
        "gutter-sm": "1rem",
        "gutter":    "1.5rem",
        "gutter-lg": "2rem",
        "margin-mobile":  "1rem",
        "margin-tablet":  "1.5rem",
        "margin":         "2rem",
      },
      fontFamily: {
        "display-lg":         ["Be Vietnam Pro"],
        "display-lg-mobile":  ["Be Vietnam Pro"],
        "headline-xl":        ["Be Vietnam Pro"],
        "headline-xl-mobile": ["Be Vietnam Pro"],
        "headline-lg":        ["Be Vietnam Pro"],
        "headline-md":        ["Be Vietnam Pro"],
        "headline-sm":        ["Be Vietnam Pro"],
        "label-lg":           ["Be Vietnam Pro"],
        "label-md":           ["Be Vietnam Pro"],
        "label-sm":           ["Be Vietnam Pro"],
        "body-lg":            ["Be Vietnam Pro"],
        "body-md":            ["Be Vietnam Pro"],
        "body-sm":            ["Be Vietnam Pro"],
        "code-md":            ["JetBrains Mono"],
      },
      fontSize: {
        "display-lg":         ["36px", { lineHeight: "44px", letterSpacing: "-0.02em",  fontWeight: "700" }],
        "display-lg-mobile":  ["28px", { lineHeight: "36px", letterSpacing: "-0.02em",  fontWeight: "700" }],
        "headline-xl":        ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-xl-mobile": ["22px", { lineHeight: "30px", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-lg":        ["22px", { lineHeight: "30px", letterSpacing: "-0.01em",  fontWeight: "600" }],
        "headline-md":        ["18px", { lineHeight: "26px", letterSpacing: "-0.005em", fontWeight: "600" }],
        "headline-sm":        ["16px", { lineHeight: "24px",                            fontWeight: "600" }],
        "label-lg":           ["14px", { lineHeight: "20px", letterSpacing: "0.01em",   fontWeight: "600" }],
        "label-md":           ["12px", { lineHeight: "16px", letterSpacing: "0.02em",   fontWeight: "500" }],
        "label-sm":           ["11px", { lineHeight: "14px", letterSpacing: "0.04em",   fontWeight: "600" }],
        "body-lg":            ["16px", { lineHeight: "26px",                            fontWeight: "400" }],
        "body-md":            ["14px", { lineHeight: "22px",                            fontWeight: "400" }],
        "body-sm":            ["13px", { lineHeight: "20px",                            fontWeight: "400" }],
        "code-md":            ["13px", { lineHeight: "18px",                            fontWeight: "500" }],
      },
    },
  },
};
