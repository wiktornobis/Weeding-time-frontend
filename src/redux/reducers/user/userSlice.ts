import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuthenticated: boolean;
    userInfo: {
        id: string | null;
        name: string | null;
    };
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: {
        id: null,
        name: null,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: string; name: string }>) => {
            state.isAuthenticated = true;
            state.userInfo.id = action.payload.id;
            state.userInfo.name = action.payload.name;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = {
                id: null,
                name: null,
            };
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
