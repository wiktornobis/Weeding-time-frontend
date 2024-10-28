import { configureStore } from '@reduxjs/toolkit';
import colorModeReducer from '@/redux/reducers/colorMode/colorModeSlice.ts';
import counterReducer from '@/redux/reducers/counter/counter-slice.ts';
import userReducer from '@/redux/reducers/user/user-slice.ts';
import authReducer from '@/redux/reducers/auth/checkUserAuth-slice.ts';

const store = configureStore({
    reducer: {
        colorMode: colorModeReducer,
        counter: counterReducer,
        user: userReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
