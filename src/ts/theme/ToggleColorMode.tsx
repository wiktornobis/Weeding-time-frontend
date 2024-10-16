import React, {createContext, ReactNode, useEffect, useMemo} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/redux/store';
import {toggleColorMode} from '@/redux/reducers/colorMode/colorModeSlice';
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
                        main: mode === 'light' ? "#8739F9" : "#BB86FC",
                    },
                    secondary: {
                        main: mode === 'light' ? "#ffffff" : "#F2F5F5",
                    },
                    background: {
                        default: mode === 'light' ? '#ffffff' : '#B0BEC5',
                        paper: mode === 'light' ? '#8739F9' : '#BB86FC',
                    },
                    text: {
                        primary: mode === 'light' ? '#565360' : '#F2F5F5',
                        secondary: mode === 'light' ? '#565360' : '#F2F5F5',
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
