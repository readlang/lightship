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

// Explicit log in by typing username and password - creates session cookie
export const userLogIn = (username, password) => (dispatch) => {
    fetch("/login", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
    })
    .then(resp =>resp.json())
    .then( data => data.errors ? dispatch(loadErrors(data.errors)) : dispatch(loadUser(data)) )
}

// Log in using saved session cookie on return visit
export const userSessionLogIn = () => (dispatch) => {
    fetch("/me")
    .then(resp => resp.json())
    // doesn't load errors into state -  no need to display error if not logged in
    .then(data => data.errors ? null : dispatch(loadUser(data)) ) 
}

// New user signup - creates session cookie
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

// Explicit log out by clicking log out button - deletes session cookie
export const userLogOut = () => (dispatch) => {
    fetch("/logout", {
        method: 'delete',
        headers: {'content-type': 'application/json'}
    })
    .then( dispatch(loadUser({})) )
}

// Edit user profile info
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