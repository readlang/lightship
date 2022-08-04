import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import tracksReducer from './slices/tracksSlice'
import actionsReducer from './slices/actionsSlice'
import groupsReducer from './slices/groupsSlice'

export default configureStore({
    reducer: {
        counter: counterReducer, 
        user: userReducer,
        tracks: tracksReducer, 
        actions: actionsReducer,
        groups: groupsReducer
    },
})