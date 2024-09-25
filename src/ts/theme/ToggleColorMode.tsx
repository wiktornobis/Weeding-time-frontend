import React, { createContext, ReactNode, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { toggleColorMode } from '@/redux/reducers/colorMode/colorModeSlice';
import '@/less/params.less';

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
                        main: mode === 'light' ? "#f9e6db" : "#cfcac6",
                        contrastText: mode === 'light' ? "#3c3631" : "#2e2b27",
                    },
                    secondary: {
                        main: mode === 'light' ? "#3c3631" : "#7A4A99",
                        contrastText: mode === 'light' ? "#ffffff" : "#e8e8e8",
                    },
                    background: {
                        default: mode === 'light' ? '#ffffff' : '#2e2b27',
                        paper: mode === 'light' ? '#f9e6db' : '#3c3631',
                    },
                    text: {
                        primary: mode === 'light' ? '#3c3631' : '#cfcac6',
                        secondary: mode === 'light' ? '#6247AA' : '#9e91a0',
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
