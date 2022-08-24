import {createSlice} from '@reduxjs/toolkit'

export const errorsSlice = createSlice({
    name: 'errors',

    initialState: {
        value: [],
    },

    reducers: {
        loadErrors: (state, action) => {state.value = action.payload }
    },
})

export const {loadErrors} = errorsSlice.actions

export default errorsSlice.reducer
