import {createSlice} from '@reduxjs/toolkit'

export const tracksSlice = createSlice({
    name: "tracks",

    initialState: {
        userTracks: [],
        groupTracks: [],
    },

    reducers: {
        loadUserTracks: (state, action) => {state.userTracks = action.payload },
        loadGroupTracks: (state, action)=> {state.groupTracks = action.payload },
        addUserTrack: (state, action) => { state.userTracks.push(action.payload) }, 
        addGroupTrack: (state, action)=> { state.groupTracks.push(action.payload) },
        editUserTrack: (state, action) => { state.userTracks[state.userTracks.findIndex(x => x.id === action.payload.id)] = action.payload },
        deleteUserTrack: (state, action) => { state.userTracks = state.userTracks.filter(track=>(track.id !== action.payload ))}
    },
})

export const { loadUserTracks, loadGroupTracks, addUserTrack, addGroupTrack, editUserTrack, deleteUserTrack } = tracksSlice.actions

export default tracksSlice.reducer

export const getTracksForUser = (user) => (dispatch) => {
    fetch(`/users/${user.id}/tracks`)
    .then(resp => resp.json())
    .then(data => dispatch(loadUserTracks(data)) )
}

export const getTracksForGroup = (groupId) => (dispatch) => {
    fetch(`/groups/${groupId}/tracks`)
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

export const addTrackToGroup = ( trackId, groupId ) => (dispatch) => {
    fetch(`/tracks/${trackId}`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ group_id: groupId })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

export const editTrack = (
    trackId, title, activity, minmax, number, unit, interval, notes 
    ) => (dispatch) => {
    console.log("editTrack Action")
    fetch(`/tracks/${trackId}`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({title: title, activity: activity, minmax: minmax,
            number: number, unit: unit, interval: interval, notes: notes }) // group id?
    })
    .then(resp => resp.json())
    .then(data => dispatch(editUserTrack(data)) )
} 
 
export const deleteTrack = (trackId) => (dispatch) => {
    console.log("deleteAction")
    fetch(`/tracks/${trackId}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then( dispatch(deleteUserTrack(trackId)) ) 
}

