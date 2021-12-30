import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  addMessage: '',
  status: '',
}

const addTicketSlice = createSlice({
  name: 'addNewTicket',
  initialState,
  reducers: {
    addNewTicketPending: (state) => {
      state.isLoading = true
    },
    addNewTicketSuccess: (state, { payload }) => {
      state.isLoading = false
      state.addMessage = payload
      state.status = 'success'
    },
    addNewTicketError: (state, { payload }) => {
      state.isLoading = false
      state.addMessage = payload
      state.status = 'error'
    },
    addNewTicketInit: (state) => {
      state.isLoading = false
      state.message = ''
      state.status = ''
    },
  },
})

const { reducer, actions } = addTicketSlice

export const {
  addNewTicketPending,
  addNewTicketSuccess,
  addNewTicketError,
  addNewTicketInit,
} = actions

export default reducer
