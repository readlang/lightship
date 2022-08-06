import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import tracksReducer from './slices/tracksSlice'
import actionsReducer from './slices/actionsSlice'
import groupsReducer from './slices/groupsSlice'
import messagesReducer from "./slices/messagesSlice"
import membersReducer from "./slices/membersSlice"


export default configureStore({
    reducer: {
        counter: counterReducer, 
        user: userReducer,
        tracks: tracksReducer, 
        actions: actionsReducer,
        groups: groupsReducer,
        messages: messagesReducer,
        members: membersReducer
    },
})