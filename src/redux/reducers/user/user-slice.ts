import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    message: string;
    userRole: String
}

const initialState: UserState = {
    message: '',
    userRole: '',
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ message: string; userRole: String;}>) => {
            state.message = action.payload.message;
            state.userRole = action.payload.userRole;
        },
        logout: (state) => {
            state.message = '';
            state.userRole = '';
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export const userRole = (state: { auth: { userRole: any; }; }) => state.auth.userRole
