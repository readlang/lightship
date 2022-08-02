import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import tracksReducer from './slices/tracksSlice'
import actionsReducer from './slices/actionsSlice'

export default configureStore({
    reducer: {
        counter: counterReducer, 
        user: userReducer,
        tracks: tracksReducer, 
        actions: actionsReducer,
    },
})