import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  status: '',
  message: '',
}

const profilSlice = createSlice({
  name: 'profil',
  initialState,
  reducers: {
    profilPending: (state) => {
      state.isLoading = true
    },
    profilSuccess: (state, { payload }) => {
      state.isLoading = false
      state.status = 'success'
      state.message = payload
    },
    profilError: (state, { payload }) => {
      state.isLoading = false
      state.status = 'error'
      state.message = payload
    },
    profilInit: (state) => {
      state.isLoading = false
      state.status = ''
      state.message = ''
    },
  },
})

const { reducer, actions } = profilSlice

export const { profilPending, profilSuccess, profilError, profilInit } = actions
export default reducer
