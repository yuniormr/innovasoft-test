import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { buildTheme } from './theme';

type ColorMode = 'light' | 'dark';

interface ColorModeContextValue {
    mode: ColorMode;
    toggle: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue>({
    mode: 'light',
    toggle: () => undefined,
});

export function useColorMode(): ColorModeContextValue {
    return useContext(ColorModeContext);
}

interface AppThemeProviderProps {
    children: React.ReactNode;
}

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
    const stored = (localStorage.getItem('colorMode') ?? 'light') as ColorMode;
    const [mode, setMode] = useState<ColorMode>(stored);

    const colorModeValue = useMemo<ColorModeContextValue>(
        () => ({
            mode,
            toggle: () => {
                setMode((prev) => {
                    const next: ColorMode = prev === 'light' ? 'dark' : 'light';
                    localStorage.setItem('colorMode', next);
                    return next;
                });
            },
        }),
        [mode],
    );

    const theme = useMemo(() => buildTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorModeValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
