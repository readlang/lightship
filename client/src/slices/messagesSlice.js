import {createSlice} from '@reduxjs/toolkit'
import { loadErrors } from './errorsSlice'

export const messagesSlice = createSlice({
    name: "messages",

    initialState: {
        groupMessages: []
    },

    reducers: {
        loadMessages: (state, action) => {state.groupMessages = action.payload},
        addMessage: (state, action) => {state.groupMessages.push(action.payload)},
        editMessageRx: (state, action) => {state.groupMessages[
            state.groupMessages.findIndex(x => x.id === action.payload.id)] = action.payload },
        deleteMessageRx: (state, action) => {state.groupMessages = state.groupMessages.filter(x => x.id !== action.payload)}
    },
})

export const { loadMessages, addMessage, editMessageRx, deleteMessageRx } = messagesSlice.actions

export default messagesSlice.reducer

export const getMessagesForGroup = (groupId) => (dispatch) => {
    fetch(`/groups/${groupId}/messages`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadMessages(data))
    })
}

export const createMessage = ( groupId, userId, text ) => (dispatch) => {
    fetch("/messages", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ group_id: groupId, user_id: userId, text: text })
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(addMessage(data))
    })
}

export const editMessage = ( messageId, text ) => (dispatch) => {
    fetch(`/messages/${messageId}/`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({text: text})
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(editMessageRx(data))
    })
}

export const deleteMessage = ( messageId ) => (dispatch) => {
    fetch(`/messages/${messageId}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(deleteMessageRx(messageId))
    })
}