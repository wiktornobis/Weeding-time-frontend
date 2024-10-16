import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Definiowanie typu dla stanu
interface AuthState {
    user: User | null
    token: string | null
}

// Opcjonalnie możesz zdefiniować typ dla użytkownika, jeśli masz bardziej złożoną strukturę
interface User {
    id: number
    name: string
    email: string
}

// Inicjalny stan
const initialState: AuthState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User, accessToken: string }>) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

// Selektory
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token
