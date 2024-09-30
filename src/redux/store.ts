import { configureStore } from '@reduxjs/toolkit';
import colorModeReducer from '@/redux/reducers/colorMode/colorModeSlice.ts';
import counterReducer from '@/redux/reducers/counter/counter-slice.ts';
import userReducer from '@/redux/reducers/user/userSlice.ts';

const store = configureStore({
    reducer: {
        colorMode: colorModeReducer,
        counter: counterReducer,
        user: userReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
