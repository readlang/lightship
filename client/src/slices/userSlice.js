import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",

    initialState: {
        value: {},
    },

    reducers: {
        loadUser: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { loadUser } = userSlice.actions

export default userSlice.reducer