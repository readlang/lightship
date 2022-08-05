import {createSlice} from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
    name: "messages",

    initialState: {
        groupMessages: []
    },

    reducers: {
        loadMessages: (state, action) => {state.groupMessages = action.payload},
        addMessage: (state, action) => {state.groupMessages.push(action.payload)},
        editMessage: (state, action) => {state.groupMessages[
            state.groupMessages.findIndex(x => x.id === action.payload.id)] = action.payload },
        deleteMessage: (state, action) => {state.groupMessages = state.groupMessages.filter(x => x.id !== action.payload)}
    },
})

export const {loadMessages} = messagesSlice.actions

export default messagesSlice.reducer

export const getMessagesForGroup = (groupId) => (dispatch) => {
    fetch(`/groups/${groupId}/messages`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        dispatch(loadMessages(data))
    })
}
