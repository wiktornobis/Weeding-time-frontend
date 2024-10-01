import React, { createContext, ReactNode, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { toggleColorMode } from '@/redux/reducers/colorMode/colorModeSlice';
import '@/style/params.scss';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
    toggleColorMode: () => void;
    mode: ColorMode;
}

export const ColorModeContext = createContext<ColorModeContextType>({
    toggleColorMode: () => {},
    mode: 'light',
});

interface ToggleColorModeProps {
    children: ReactNode;
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ children }) => {
    const dispatch: AppDispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.colorMode.mode);

    const theme = useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: 'Lato, Helvetica Neue, Arial, sans-serif',
                },
                palette: {
                    mode,
                    primary: {
                        main: mode === 'light' ? "#ffefd5" : "#b58b6b", // pastelowy beż, elegancki
                        contrastText: mode === 'light' ? "#5a3e36" : "#fff5e6", // czekoladowy brąz lub jasny kremowy
                    },
                    secondary: {
                        main: mode === 'light' ? "#f4c2c2" : "#8b5e83", // pastelowy róż lub elegancki fiolet
                        contrastText: mode === 'light' ? "#ffffff" : "#f1e7dd", // biały kontrastujący z fioletem
                    },
                    background: {
                        default: mode === 'light' ? '#ffffff' : '#4b3832', // biały lub elegancki ciemny brąz
                        paper: mode === 'light' ? '#ffe4e1' : '#2e2b27', // różowy do delikatnych akcentów lub ciemny do formalnych
                    },
                    text: {
                        primary: mode === 'light' ? '#fff' : '#ffefd5', // ciemny brąz lub pastelowy beż
                        secondary: mode === 'light' ? '#b76e79' : '#d4af37', // ciemniejszy róż lub złoty akcent
                    },
                }
            }),
        [mode]
    );

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(mode);
    }, [mode]);

    const colorModeContextValue = useMemo(
        () => ({
            toggleColorMode: () => dispatch(toggleColorMode()),
            mode,
        }),
        [dispatch, mode]
    );

    return (
        <ColorModeContext.Provider value={colorModeContextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ToggleColorMode;
