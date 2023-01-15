import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import apiSlice from './slice'

export const store = configureStore({
    reducer: {
        api: apiSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),

})