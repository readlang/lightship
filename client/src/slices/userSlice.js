import {createSlice} from '@reduxjs/toolkit'
import { loadErrors } from './errorsSlice'

export const userSlice = createSlice({
    name: "user",

    initialState: {
        value: {},
    },

    reducers: {
        loadUser: (state, action) => { state.value = action.payload }
    },
})

export const { loadUser } = userSlice.actions

export default userSlice.reducer

export const userLogIn = (username, password) => (dispatch) => {
    fetch("/login", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
    })
    .then(resp =>resp.json())
    .then(data => data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadUser(data)), 
        //error => dispatch({ type: 'LOAD_DATA_FAILURE', error }) // this is for if rejected... not sure if it works
    )
}

export const userSessionLogIn = () => (dispatch) => {
    fetch("/me")
    .then(resp => resp.json())
    .then(data => data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadUser(data)) ) // REMOVE THIS LATER
}

export const userSignUp = (
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
    .then(data => data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadUser(data)) )
}

export const userLogOut = () => (dispatch) => {
    fetch("/logout", {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then( dispatch(loadUser({})) )
}

export const userEdit = ( userId, email, profileImage, city, state, country ) => (dispatch) => {
    fetch(`/users/${userId}`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ email: email, profile_image: profileImage, 
          city: city, state: state, country: country })
    })
    .then(resp => resp.json())
    .then(data => data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadUser(data)) )
}