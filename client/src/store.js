import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import tracksReducer from './slices/tracksSlice'

export default configureStore({
    reducer: {
        counter: counterReducer, 
        user: userReducer,
        tracks: tracksReducer
    },
})