import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'alert',
    initialState: '',
    reducers: {
        setAlert: (state, action) => {
            return state = action.payload
        }
    }
})

export const { setAlert } = errorSlice.actions;

export default errorSlice.reducer;