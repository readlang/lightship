import {createSlice} from '@reduxjs/toolkit'

export const actionsSlice = createSlice({
    name: "actions",

    initialState: {
        trackActions: []
    },

    reducers: {
        loadTrackActions: (state, action) => {state.trackActions = action.payload},

        addTrackAction: (state, action) => { state.trackActions.push(action.payload) }, 
        editTrackAction: (state, action) => { state.trackActions[state.trackActions.findIndex(x => x.id === action.payload.id)] = action.payload },
        deleteTrackAction: (state, action) => { state.trackActions = state.trackActions.filter(x=>(x.id !== action.payload ))}
    },
})

export const { loadTrackActions, addTrackAction, editTrackAction, deleteTrackAction } = actionsSlice.actions

export default actionsSlice.reducer

export const getActionsForTrack = (trackId) => (dispatch) => {
    fetch(`/tracks/${trackId}/actions`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        dispatch(loadTrackActions(data))} )
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
        console.log(data)
        dispatch(addTrackAction(data))} ) 
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
        console.log(data)
        dispatch(editTrackAction(data))} )
} 
 
export const deleteAction = (action_id) => (dispatch) => {
    
    fetch(`/actions/${action_id}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then(resp => resp.json())
    .then((data)=> {
        console.log("delete actionslice:", data)
        dispatch(deleteTrackAction(action_id))
    } ) 
}

