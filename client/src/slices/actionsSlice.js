import {createSlice} from '@reduxjs/toolkit'
import { loadErrors } from './errorsSlice'

export const actionsSlice = createSlice({
    name: "actions",

    initialState: {
        trackActions: [], // trackActions are Actions related to the User's selected Track
        groupActions: [], // groupActions are Actions related to a selected Group
    },

    reducers: {
        loadTrackActions: (state, action) => {state.trackActions = action.payload},
        loadGroupActions: (state, action) => {state.groupActions = action.payload},
        addTrackAction: (state, action) => { state.trackActions.push(action.payload) }, 
        editTrackAction: (state, action) => { state.trackActions[
            state.trackActions.findIndex(x => x.id === action.payload.id)] = action.payload },
        deleteTrackAction: (state, action) => { state.trackActions = state.trackActions.filter(x=>(x.id !== action.payload ))}
    },
})

export const { loadTrackActions, loadGroupActions, addTrackAction, editTrackAction, deleteTrackAction } = actionsSlice.actions

export default actionsSlice.reducer

export const getActionsForTrack = (trackId) => (dispatch) => {
    fetch(`/tracks/${trackId}/actions`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadTrackActions(data))
    })
}

export const getActionsForGroup = (groupId) => (dispatch) => {
    fetch(`/groups/${groupId}/actions`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadGroupActions(data))
    })
}

export const createAction = (
    track_id, date_time, number, difficulty, comment
    ) => (dispatch) => {
    fetch("/actions", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({track_id: track_id, date_time: date_time,
        number: number, difficulty: difficulty, comment: comment}) 
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(addTrackAction(data))
    }) 
}

export const editAction = (
    action_id, date_time, number, difficulty, comment 
    ) => (dispatch) => {
    
    fetch(`/actions/${action_id}`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({date_time: date_time, number: number, difficulty: difficulty, comment: comment}) 
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(editTrackAction(data))
    })
} 
 
export const deleteAction = (action_id) => (dispatch) => {
    
    fetch(`/actions/${action_id}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then(resp => resp.json())
    .then((data)=> {
        // console.log("delete actionslice:", data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(deleteTrackAction(action_id))
    } ) 
}

