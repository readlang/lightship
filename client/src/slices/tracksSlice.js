import {createSlice} from '@reduxjs/toolkit'

export const tracksSlice = createSlice({
    name: "tracks",

    initialState: {
        userTracks: [],
        groupTracks: [],
    },

    reducers: {
        loadUserTracks: (state, action) => {state.userTracks = action.payload},
        loadGroupTracks: (state, action) => {state.groupTracks = action.payload},
        addUserTrack: (state, action) => { state.userTracks.push(action.payload) }, 
        editUserTrack: (state, action) => { state.userTracks[state.userTracks.findIndex(x => x.id === action.payload.id)] = action.payload },
        deleteUserTrack: (state, action) => { state.userTracks = state.userTracks.filter(track=>(track.id !== action.payload ))}
    },
})

export const { loadUserTracks, loadGroupTracks, addUserTrack, editUserTrack, deleteUserTrack } = tracksSlice.actions

export default tracksSlice.reducer

export const getTracksForUser = (user) => (dispatch) => {
    fetch(`/users/${user.id}/tracks`)
    .then(resp => resp.json())
    .then(data => dispatch(loadUserTracks(data)) )
}

export const getTracksForGroup = (groupID) => (dispatch) => {
    fetch(`/groups/${groupID}/tracks`)
    .then(resp => resp.json())
    .then(data => dispatch(loadGroupTracks(data)))
}

export const createTrack = (
    user_id, title, activity, minmax, number, unit, interval, notes
    ) => (dispatch) => {
    fetch("/tracks", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({user_id: user_id, title: title, activity: activity, minmax: minmax,
        number: number, unit: unit, interval: interval, notes: notes }) 
    })
    .then(resp => resp.json())
    .then(data => dispatch(addUserTrack(data)) ) 
}

export const editTrack = (
    trackID, title, activity, minmax, number, unit, interval, notes 
    ) => (dispatch) => {
    console.log("editTrack Action")
    fetch(`/tracks/${trackID}`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({title: title, activity: activity, minmax: minmax,
            number: number, unit: unit, interval: interval, notes: notes }) // group id?
    })
    .then(resp => resp.json())
    .then(data => dispatch(editUserTrack(data)) )
} 
 
export const deleteTrack = (trackID) => (dispatch) => {
    console.log("deleteAction")
    fetch(`/tracks/${trackID}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then( dispatch(deleteUserTrack(trackID)) ) 
}

