import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    profile: null,
    draftProfile: null,
    bot: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.profile = action.payload?.profile || null
      state.draftProfile = action.payload?.draftProfile || null
      state.bot = action.payload?.bot || null
    },
    setToken: (state, action) => {
      if (action.payload)
        state.token = action.payload
      else state.token = null
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setDraftProfile: (state, action) => {
      state.draftProfile = action.payload
    },
    setBot: (state, action) => {
      state.bot = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, setProfile, setDraftProfile, setBot } = appSlice.actions

export default appSlice.reducer