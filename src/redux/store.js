
import { configureStore } from '@reduxjs/toolkit'
import ErrorReducers from '../reducers/ErrorReducers'
import loadingReducer from '../reducers/loadingReducer'
import AlertReducers from '../reducers/AlertReducers'



export const store = configureStore({
    reducer: {
        error: ErrorReducers,
        spinner:loadingReducer,
        alert:AlertReducers
    }
})
