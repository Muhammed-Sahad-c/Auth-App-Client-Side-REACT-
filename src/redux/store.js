
import { configureStore } from '@reduxjs/toolkit'
import ErrorReducers from '../reducers/ErrorReducers'
import loadingReducer from '../reducers/loadingReducer'



export const store = configureStore({
    reducer: {
        error: ErrorReducers,
        spinner:loadingReducer
    }
})
