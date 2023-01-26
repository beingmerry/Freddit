import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  id: null,
  email: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: function (state, action) {
      state.username = action.payload.username
      state.id = action.payload.id
      state.email = action.payload.email
    },
    logout: function (state) {
      state.username = null
      state.id = null
      state.email = null
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
