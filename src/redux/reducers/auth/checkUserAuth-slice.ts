import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL_AUTH } from "@/ts/constants/variables.ts";
import { RoleAccount } from "@/api/Account/types.ts";

interface AuthResponse {
    userAuth: boolean;
    userRole: RoleAccount;
}
interface AuthResponse {
    userAuth: boolean;
    userRole: RoleAccount;
}

// Async thunk for checking the authentication status
export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async () => {
    const response = await fetch(BASE_URL_AUTH, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Odczytaj dane tylko raz
    const data: AuthResponse = await response.json();
    console.log('API Response:', data); // Logowanie odpowiedzi z API
    return data;
});


interface AuthState {
    userAuth: boolean | null;
    userRole: string;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    userAuth: null,
    userRole: "",
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;  // Ustaw loading na true
                state.error = null;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.userAuth = action.payload.userAuth;
                state.userRole = action.payload.userRole;
                state.loading = false; // Ustaw loading na false
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.loading = false; // Ustaw loading na false
                state.error = action.error.message || "Failed to check auth status";
            });
    },
});

export default authSlice.reducer;
