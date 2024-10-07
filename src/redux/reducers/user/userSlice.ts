import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleAccount } from "@/api/Account/types.ts";
// import { loginApi } from "@/ts/api/authApi";
// Interfejs użytkownika z polem roli, które może być enum lub null
interface UserState {
    isAuthenticated: boolean;
    userInfo: {
        id: string | null;
        name: string | null;
        role: RoleAccount | null;
    };
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: {
        id: null,
        name: null,
        role: null,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: string; name: string; role: RoleAccount }>) => {
            state.isAuthenticated = true;
            state.userInfo.id = action.payload.id;
            state.userInfo.name = action.payload.name;
            state.userInfo.role = action.payload.role;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = {
                id: null,
                name: null,
                role: null,
            };
        },
    },
});

export const { setUser, logout } = userSlice.actions;

// Asynchroniczna akcja logowania
export const login = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        const response = await loginApi(email, password); // Zakładamy, że loginApi zwraca dane z backendu
        const { id, name, role } = response.data;

        // Ustawienie użytkownika w stanie po pomyślnym logowaniu
        dispatch(setUser({ id, name, role }));
    } catch (error) {
        console.error("Login failed:", error);
        // Obsługa błędów, np. powiadomienie użytkownika
    }
};

export default userSlice.reducer;
