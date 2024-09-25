import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CounterSlice {
    value: number;
}

const initialState: CounterSlice = {
    value: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
    //     increment
        incremented(state) {
            state.value++;
        },
        amountAdded(state, action:PayloadAction<number>) {
            state.value += action.payload;
        }
    //     decrement
    //     reset etc
    }
})

export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;