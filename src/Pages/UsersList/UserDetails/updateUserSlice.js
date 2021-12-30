import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  condition: '',
  message: '',
}

const profilUpdateSlice = createSlice({
  name: 'profilUpdate',
  initialState,
  reducers: {
    profilUpdatePending: (state) => {
      state.isLoading = true
    },
    profilUpdateSuccess: (state, { payload }) => {
      state.isLoading = false
      state.condition = 'success'
      state.message = payload
    },
    profilUpdateError: (state, { payload }) => {
      state.isLoading = false
      state.condition = 'error'
      state.message = payload
    },
    profilUpdateInit: (state) => {
      state.isLoading = false
      state.condition = ''
      state.message = ''
    },
  },
})

const { reducer, actions } = profilUpdateSlice

export const {
  profilUpdatePending,
  profilUpdateSuccess,
  profilUpdateError,
  profilUpdateInit,
} = actions
export default reducer
