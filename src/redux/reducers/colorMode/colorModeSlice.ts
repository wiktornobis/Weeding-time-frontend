import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ColorMode = 'light' | 'dark';

interface ColorModeState {
    mode: ColorMode;
}

const initialState: ColorModeState = {
    mode: (localStorage.getItem('color-mode') as ColorMode) || 'light',
};

const colorModeSlice = createSlice({
    name: 'colorMode',
    initialState,
    reducers: {
        toggleColorMode(state) {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('color-mode', state.mode);
        },
        setColorMode(state, action: PayloadAction<ColorMode>) {
            state.mode = action.payload;
            localStorage.setItem('color-mode', state.mode);
        },
    },
});

export const { toggleColorMode, setColorMode } = colorModeSlice.actions;

export default colorModeSlice.reducer;
