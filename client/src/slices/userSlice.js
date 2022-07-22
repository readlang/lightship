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

export const userFetchLogIn = (username, password) => (dispatch) => {
    fetch("/login", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
    })
    .then(resp =>resp.json())
    .then(data => dispatch(loadUser(data)), 
        // error => dispatch({ type: 'LOAD_DATA_FAILURE', error }) // this is for if rejected...
    )
}

export const userFetchSignUp = (
    username, password, passwordConfirm, email, profileImage, city, state, country
    ) => (dispatch) => {
    fetch("/signup", {
        method: "post",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({username: username, password: password, 
          password_confirmation: passwordConfirm, email: email, profile_image: profileImage, 
          city: city, state: state, country: country})
    })
    .then(resp => resp.json())
    .then(data => dispatch(loadUser(data)) )
}

export default userSlice.reducer