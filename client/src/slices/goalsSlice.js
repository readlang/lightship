import {createSlice} from '@reduxjs/toolkit'
import { loadErrors } from './errorsSlice'

export const goalsSlice = createSlice({
    name: "goals",

    initialState: {
        userGoals: []
    },

    reducers: {
        loadGoals: (state, action) => {state.userGoals = action.payload},
        addGoal: (state, action) => {state.userGoals.push(action.payload)},
        editGoalRx: (state, action) => {state.userGoals[
            state.userGoals.findIndex(x => x.id === action.payload.id)] = action.payload },
        deleteGoalRx: (state, action) => {state.userGoals = state.userGoals.filter(x => x.id !== action.payload)}
    },
})

export const { loadGoals, addGoal, editGoalRx, deleteGoalRx } = goalsSlice.actions

export default goalsSlice.reducer

export const getGoalsForUser = (userId) => (dispatch) => {
    fetch(`/users/${userId}/goals`)
    .then(resp => resp.json())
    .then(data => {
        //console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadGoals(data))
    })
}

export const createGoal = ( userId, title, description, why ) => (dispatch) => {
    fetch("/goals", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ user_id: userId, title: title, description: description, why: why })
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(addGoal(data))
    })
}

export const editGoal = ( goalId, title, description, why ) => (dispatch) => {
    fetch(`/goals/${goalId}/`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ title: title, description: description, why: why })
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(editGoalRx(data))
    })
}

export const deleteGoal = ( goalId ) => (dispatch) => {
    fetch(`/goals/${goalId}`, {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        data.errors ? dispatch(loadErrors(data.errors)) : dispatch(deleteGoalRx(goalId))
    })
}