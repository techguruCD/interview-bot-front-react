import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    profile: null,
    token: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.profile = action.payload?.profile || null
    },
    setToken: (state, action) => {
      if (action.payload)
        state.token = action.payload
      else state.token = null
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, setProfile, setDraftProfile, setBot, setLoading } = appSlice.actions

export default appSlice.reducer