import {createSlice} from '@reduxjs/toolkit'
import { loadErrors } from './errorsSlice'

export const membersSlice = createSlice({
    name: "members",

    initialState: {
        groupMembers: []
    },

    reducers: {
        loadMemberships: (state, action) => {state.groupMembers = action.payload},
        addMembershipRx: (state, action) => {state.groupMembers.push(action.payload)},
       
        deleteMembershipRx: (state, action) => {state.groupMembers = state.groupMembers.filter(x => x.id !== action.payload)}
    },
})

export const { loadMemberships, addMembershipRx, deleteMembershipRx } = membersSlice.actions

export default membersSlice.reducer

export const getMembershipsForGroup = (groupId) => (dispatch) => { //this returns memberships
    fetch(`/groups/${groupId}/memberships`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadMemberships(data))
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
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(addMembershipRx(data))
    })
}

// no edit for this slice

export const deleteMember = ( membershipId ) => (dispatch) => { // this returns a membership not a user...
    fetch(`/memberships/${membershipId}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(deleteMembershipRx(membershipId)) // how does this work?
    })
}