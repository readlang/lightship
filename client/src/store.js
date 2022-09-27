import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import tracksReducer from './slices/tracksSlice'
import actionsReducer from './slices/actionsSlice'
import groupsReducer from './slices/groupsSlice'
import messagesReducer from "./slices/messagesSlice"
import membersReducer from "./slices/membersSlice"
import goalsReducer from "./slices/goalsSlice"
import relationshipsReducer from "./slices/relationshipsSlice"
import errorsReducer from "./slices/errorsSlice"


export default configureStore({
    reducer: {
        user: userReducer,
        tracks: tracksReducer, 
        actions: actionsReducer,
        groups: groupsReducer,
        messages: messagesReducer,
        members: membersReducer,
        goals: goalsReducer,
        relationships: relationshipsReducer,
        errors: errorsReducer,
    },
})