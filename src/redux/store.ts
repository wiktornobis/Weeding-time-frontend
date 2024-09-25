import { configureStore } from '@reduxjs/toolkit';
import colorModeReducer from '@/redux/reducers/colorMode/colorModeSlice.ts';
import counterReducer from '@/redux/reducers/counter/counter-slice.ts';

const store = configureStore({
    reducer: {
        colorMode: colorModeReducer,
        counter: counterReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
