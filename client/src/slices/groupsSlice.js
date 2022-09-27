import {createSlice} from '@reduxjs/toolkit'
import { loadErrors } from './errorsSlice'

export const groupsSlice = createSlice({
    name: "groups",

    initialState: {
        memberGroups: [] // seems like this has to be nested object
    },

    reducers: {
        loadGroups: (state, action) => {state.memberGroups = action.payload},
        addGroup: (state, action) => { state.memberGroups.push(action.payload) },
        editGroupRx: (state, action) => { state.memberGroups[ 
            state.memberGroups.findIndex(x => x.id === action.payload.id) ] = action.payload },
        deleteGroupRx: (state, action) => { state.memberGroups = state.memberGroups.filter(x => x.id !== action.payload ) } // payload is group ID
    },
})

export const { loadGroups, addGroup, editGroupRx, deleteGroupRx } = groupsSlice.actions

export default groupsSlice.reducer

export const getMemberGroupsForUser = (userId) => (dispatch) => {
    fetch(`/users/${userId}/groups`) // NOTE: /owned_groups OR /groups (membership-groups)?
    .then(resp => resp.json())
    .then(data => { 
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadGroups(data)) 
    })
}

export const createGroup = (group_name, description, userId) => (dispatch) => {
    fetch("/groups", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ group_name: group_name, description: description, owner_id: userId})
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(addGroup(data))
    })
}

export const editGroup = (groupId, group_name, description) => (dispatch) => {
    fetch(`/groups/${groupId}`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({group_name: group_name, description: description})
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(editGroupRx(data))
    })
}

export const deleteGroup = (groupId) => (dispatch) => {
    fetch(`/groups/${groupId}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(deleteGroupRx(groupId))
    })
}