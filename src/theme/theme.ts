import { createTheme, type Theme } from "@mui/material/styles";
import { palette, typography, shape, elevation } from "./tokens";

// MUI palette augmentation — agrega el slot 'tertiary'
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

type ScaleEntry = {
  size: number;
  line: number;
  weight: number;
  tracking: number;
};

const toMui = (s: ScaleEntry) => ({
  fontSize: `${s.size / 16}rem`,
  lineHeight: `${s.line / s.size}`,
  fontWeight: s.weight,
  letterSpacing: `${s.tracking / 16}rem`,
});

const buildShadows = (): Theme["shadows"] => {
  const arr = Array(25).fill("none") as Theme["shadows"];
  arr[0] = "none";
  arr[1] = elevation[1];
  arr[2] = elevation[2];
  arr[3] = elevation[2];
  arr[4] = elevation[3];
  for (let i = 5; i <= 8; i++) arr[i] = elevation[3];
  for (let i = 9; i <= 16; i++) arr[i] = elevation[4];
  for (let i = 17; i <= 24; i++) arr[i] = elevation[5];
  return arr;
};

export const buildTheme = (mode: "light" | "dark" = "light") => {
  const c = mode === "light" ? palette.light : palette.dark;
  const t = typography.scale;

  return createTheme({
    palette: {
      mode,
      primary: { main: c.primary, contrastText: c.onPrimary },
      secondary: { main: c.secondary, contrastText: c.onSecondary },
      tertiary: { main: c.tertiary, contrastText: c.onTertiary },
      error: { main: c.error, contrastText: c.onError },
      warning: { main: c.warning, contrastText: c.onWarning },
      info: { main: c.info, contrastText: c.onInfo },
      success: { main: c.success, contrastText: c.onSuccess },
      background: { default: c.background, paper: c.surface },
      text: { primary: c.onBackground, secondary: c.onSurfaceVariant },
      divider: c.outlineVariant,
    },
    typography: {
      fontFamily: typography.fontFamily,
      h1: toMui(t.displaySmall),
      h2: toMui(t.headlineLarge),
      h3: toMui(t.headlineMedium),
      h4: toMui(t.headlineSmall),
      h5: toMui(t.titleLarge),
      h6: toMui(t.titleMedium),
      subtitle1: toMui(t.titleMedium),
      subtitle2: toMui(t.titleSmall),
      body1: toMui(t.bodyLarge),
      body2: toMui(t.bodyMedium),
      button: { ...toMui(t.labelLarge), textTransform: "none" as const },
      caption: toMui(t.bodySmall),
      overline: { ...toMui(t.labelSmall), textTransform: "uppercase" as const },
    },
    shape: { borderRadius: shape.small },
    shadows: buildShadows(),
    components: {
      MuiButton: {
        defaultProps: { disableElevation: false },
        styleOverrides: {
          root: {
            borderRadius: shape.extraLarge,
            padding: "10px 24px",
            fontWeight: 600,
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
            color: "#FFFFFF",
            "&:hover": {
              background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
              color: "#FFFFFF",
            },
          },
          outlinedPrimary: {
            borderColor: mode === "light" ? c.primary : "#FFFFFF",
            color: mode === "light" ? c.primary : "#FFFFFF",
            "&:hover": {
              borderColor: mode === "light" ? c.primary : "#FFFFFF",
              backgroundColor:
                mode === "light"
                  ? "rgba(31, 41, 55, 0.06)"
                  : "rgba(255, 255, 255, 0.08)",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined", size: "small" },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": { borderRadius: shape.small },
          },
        },
      },
      MuiCard: {
        styleOverrides: { root: { borderRadius: shape.large } },
      },
      MuiAppBar: {
        styleOverrides: {
          // AppBar siempre oscura (grafito) independiente del modo claro/oscuro
          root: {
            boxShadow: elevation[2],
            backgroundColor: palette.light.primary, // #1F2937 fijo
            color: palette.light.onPrimary, // #FFFFFF fijo
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-head": {
              backgroundColor: c.primary,
              color: c.onPrimary,
              fontWeight: 700,
              fontSize: "0.85rem",
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:nth-of-type(even)": {
              backgroundColor: "rgba(31, 41, 55, 0.04)",
            },
            "&:hover": {
              backgroundColor: "rgba(31, 41, 55, 0.08) !important",
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          // Sidebar siempre dark (grafito oscuro) independiente del modo
          paper: {
            backgroundColor: palette.light.primary,
            color: palette.light.onPrimary,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: { borderRadius: shape.small, margin: "2px 8px", width: "auto" },
        },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: shape.medium } },
      },
    },
  });
};

export default buildTheme("light");
