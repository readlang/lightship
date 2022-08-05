import {createSlice} from '@reduxjs/toolkit'

export const membersSlice = createSlice({
    name: "members",

    initialState: {
        groupMembers: []
    },

    reducers: {
        loadMembers: (state, action) => {state.groupMembers = action.payload},
        addMemberRx: (state, action) => {state.groupMembers.push(action.payload)},
       
        deleteMemberRx: (state, action) => {state.groupMembers = state.groupMembers.filter(x => x.id !== action.payload)}
    },
})

export const { loadMembers, addMemberRx, deleteMemberRx } = membersSlice.actions

export default membersSlice.reducer

export const getUsersForGroup = (groupId) => (dispatch) => { //this returns users...
    fetch(`/groups/${groupId}/users`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        dispatch(loadMembers(data))
    })
}

export const addMember = ( groupId, userId ) => (dispatch) => { //this returns a membership not a user
    fetch("/memberships", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ group_id: groupId, user_id: userId })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        dispatch(addMemberRx(data))
    })
}

// no edit for this slice

export const deleteMember = ( memberId ) => (dispatch) => { // this returns a membership not a user...
    fetch(`/memberships/${memberId}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        dispatch(deleteMemberRx(memberId)) // how does this work?
    })
}