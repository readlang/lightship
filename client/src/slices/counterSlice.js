import {createSlice} from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  // name of "slice" of the store - a piece of the larger store
  // comprised of the initial state and reducers which are actions defining how the state should change

  name: 'counter', 

  initialState: {
    value: 0,
  },

  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },

})
  
// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
