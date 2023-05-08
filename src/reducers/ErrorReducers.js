import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'error',
    initialState: '',
    reducers: {
        showError: (state, action) => {
            return state = action.payload
        }
    }
})

export const { showError } = errorSlice.actions;

export default errorSlice.reducer;