// =============================================================================
// Design Tokens — "class SOFTWARE ACADÉMICO" Design System
// Tema F · Graphite & Platinum  ·  Material Design 3
// Seeds: #1F2937 primary · #475569 secondary · #92400E tertiary
// =============================================================================

export const palette = {
  seed: {
    primary:   "#1F2937",
    secondary: "#475569",
    tertiary:  "#92400E",
  },

  // ---- LIGHT SCHEME --------------------------------------------------------
  light: {
    primary:                "#1F2937",
    onPrimary:              "#FFFFFF",
    primaryContainer:       "#D1D5DB",
    onPrimaryContainer:     "#0B1220",

    secondary:              "#475569",
    onSecondary:            "#FFFFFF",
    secondaryContainer:     "#E2E8F0",
    onSecondaryContainer:   "#0F172A",

    tertiary:               "#92400E",
    onTertiary:             "#FFFFFF",
    tertiaryContainer:      "#FED7AA",
    onTertiaryContainer:    "#451A03",

    error:                  "#7F1D1D",
    onError:                "#FFFFFF",
    errorContainer:         "#FEE2E2",
    onErrorContainer:       "#450A0A",

    success:                "#166534",
    onSuccess:              "#FFFFFF",
    successContainer:       "#BBF7D0",
    onSuccessContainer:     "#052E16",

    warning:                "#B45309",
    onWarning:              "#FFFFFF",
    warningContainer:       "#FEF3C7",
    onWarningContainer:     "#451A03",

    info:                   "#1E40AF",
    onInfo:                 "#FFFFFF",
    infoContainer:          "#DBEAFE",
    onInfoContainer:        "#1E3A8A",

    background:             "#F9FAFB",
    onBackground:           "#111827",

    surface:                "#F9FAFB",
    onSurface:              "#111827",
    surfaceVariant:         "#E5E7EB",
    onSurfaceVariant:       "#374151",

    outline:                "#6B7280",
    outlineVariant:         "#D1D5DB",

    inverseSurface:         "#1F2937",
    inverseOnSurface:       "#F3F4F6",
    inversePrimary:         "#9CA3AF",
  },

  // ---- DARK SCHEME ---------------------------------------------------------
  dark: {
    primary:                "#D1D5DB",
    onPrimary:              "#0B1220",
    primaryContainer:       "#374151",
    onPrimaryContainer:     "#E5E7EB",

    secondary:              "#CBD5E1",
    onSecondary:            "#1E293B",
    secondaryContainer:     "#334155",
    onSecondaryContainer:   "#E2E8F0",

    tertiary:               "#FDBA74",
    onTertiary:             "#431407",
    tertiaryContainer:      "#9A3412",
    onTertiaryContainer:    "#FED7AA",

    error:                  "#FCA5A5",
    onError:                "#450A0A",
    errorContainer:         "#7F1D1D",
    onErrorContainer:       "#FEE2E2",

    success:                "#4ADE80",
    onSuccess:              "#052E16",
    successContainer:       "#14532D",
    onSuccessContainer:     "#BBF7D0",

    warning:                "#FCD34D",
    onWarning:              "#451A03",
    warningContainer:       "#92400E",
    onWarningContainer:     "#FEF3C7",

    info:                   "#93C5FD",
    onInfo:                 "#1E3A8A",
    infoContainer:          "#1E40AF",
    onInfoContainer:        "#DBEAFE",

    background:             "#0B1220",
    onBackground:           "#E5E7EB",

    surface:                "#0B1220",
    onSurface:              "#E5E7EB",
    surfaceVariant:         "#4B5563",
    onSurfaceVariant:       "#9CA3AF",

    outline:                "#9CA3AF",
    outlineVariant:         "#4B5563",

    inverseSurface:         "#E5E7EB",
    inverseOnSurface:       "#1F2937",
    inversePrimary:         "#1F2937",
  },
} as const;

export const typography = {
  fontFamily:
    '"Inter", "IBM Plex Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  scale: {
    displayLarge:  { size: 57, line: 64, weight: 400, tracking: -0.25 },
    displayMedium: { size: 45, line: 52, weight: 400, tracking: 0 },
    displaySmall:  { size: 36, line: 44, weight: 400, tracking: 0 },
    headlineLarge: { size: 32, line: 40, weight: 600, tracking: 0 },
    headlineMedium:{ size: 28, line: 36, weight: 600, tracking: 0 },
    headlineSmall: { size: 24, line: 32, weight: 600, tracking: 0 },
    titleLarge:    { size: 22, line: 28, weight: 500, tracking: 0 },
    titleMedium:   { size: 16, line: 24, weight: 500, tracking: 0.15 },
    titleSmall:    { size: 14, line: 20, weight: 500, tracking: 0.1 },
    bodyLarge:     { size: 16, line: 24, weight: 400, tracking: 0.5 },
    bodyMedium:    { size: 14, line: 20, weight: 400, tracking: 0.25 },
    bodySmall:     { size: 12, line: 16, weight: 400, tracking: 0.4 },
    labelLarge:    { size: 14, line: 20, weight: 500, tracking: 0.1 },
    labelMedium:   { size: 12, line: 16, weight: 500, tracking: 0.5 },
    labelSmall:    { size: 11, line: 16, weight: 500, tracking: 0.5 },
  },
};

export const shape = {
  none:       0,
  extraSmall: 4,
  small:      8,
  medium:     12,
  large:      16,
  extraLarge: 28,
  full:       9999,
};

export const elevation = {
  0: "none",
  1: "0px 1px 2px 0px rgba(0,0,0,0.30), 0px 1px 3px 1px rgba(0,0,0,0.15)",
  2: "0px 1px 2px 0px rgba(0,0,0,0.30), 0px 2px 6px 2px rgba(0,0,0,0.15)",
  3: "0px 1px 3px 0px rgba(0,0,0,0.30), 0px 4px 8px 3px rgba(0,0,0,0.15)",
  4: "0px 2px 3px 0px rgba(0,0,0,0.30), 0px 6px 10px 4px rgba(0,0,0,0.15)",
  5: "0px 4px 4px 0px rgba(0,0,0,0.30), 0px 8px 12px 6px rgba(0,0,0,0.15)",
};

export const motion = {
  easing: {
    standard:             "cubic-bezier(0.2, 0, 0, 1)",
    standardAccelerate:   "cubic-bezier(0.3, 0, 1, 1)",
    standardDecelerate:   "cubic-bezier(0, 0, 0, 1)",
    emphasized:           "cubic-bezier(0.2, 0, 0, 1)",
    emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
    emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
  },
  duration: {
    short1: 50,  short2: 100, short3: 150, short4: 200,
    medium1: 250, medium2: 300, medium3: 350, medium4: 400,
    long1: 450,  long2: 500,  long3: 550,  long4: 600,
  },
};
