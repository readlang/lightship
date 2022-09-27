import {createSlice} from '@reduxjs/toolkit'
import {loadErrors} from './errorsSlice'

export const relationshipsSlice = createSlice({
    name: "relationships",

    initialState: {
        userRelationships: []
    },

    reducers: {
        loadRelationships: (state, action) => {state.userRelationships = action.payload},
        addRelationship: (state, action) => {state.userRelationships.push(action.payload)},
        editRelationshipRx: (state, action) => {state.userRelationships[
            state.userRelationships.findIndex(x => x.id === action.payload.id)] = action.payload },
        deleteRelationshipRx: (state, action) => {state.userRelationships = state.userRelationships.filter(x => x.id !== action.payload)}
    },
})

export const { loadRelationships, addRelationship, editRelationshipRx, deleteRelationshipRx } = relationshipsSlice.actions

export default relationshipsSlice.reducer

export const getRelationshipsForUser = (userId) => (dispatch) => { // this returns relationships, not friends (not users)
    fetch(`/users/${userId}/relationships`)
    .then(resp => resp.json())
    .then(data => {
        //console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadRelationships(data))
    })
}

export const createRelationship = ( userId, friendId ) => (dispatch) => {
    fetch("/relationships", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ user_id: userId, friend_id: friendId })
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(addRelationship(data))
    })
}
/*
export const editRelationship = (  ) => (dispatch) => {
    fetch(`/relationships/${  }/`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({  })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        dispatch(editRelationshipRx(data))
    })
}
*/
export const deleteRelationship = ( relaId ) => (dispatch) => {
    fetch(`/relationships/${relaId}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(deleteRelationshipRx(relaId))
    })
}
