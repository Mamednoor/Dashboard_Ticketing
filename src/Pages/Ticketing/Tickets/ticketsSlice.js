import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickets: [],
  isLoading: false,
  error: '',
  ticketMessageError: false,
  ticketMessageSuccess: false,
  ticketSelected: {},
  statusClose: false,
  statusProgress: false,
  deleting: false,
  searchTerm: [],
}

const listTicketsSlice = createSlice({
  name: 'ticketsList',
  initialState,
  reducers: {
    fetchTicketsLoading: (state) => {
      state.isLoading = true
    },
    fetchTicketsSuccess: (state, { payload }) => {
      state.tickets = payload
      state.searchTerm = payload
      state.isLoading = false
    },
    fetchTicketsError: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },

    fetchTicketsDetailsLoading: (state) => {
      state.isLoading = true
    },
    fetchTicketsDetailsSuccess: (state, { payload }) => {
      state.ticketSelected = payload
      state.isLoading = false
      state.error = false
    },
    fetchTicketsDetailsError: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },

    updateTicketMessageLoading: (state) => {
      state.isLoading = true
    },
    updateTicketMessageSuccess: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      state.ticketMessageSuccess = true
    },
    updateTicketMessageError: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      state.ticketMessageError = true
    },
    ticketStatusCloseLoading: (state) => {
      state.isLoading = true
    },
    ticketStatusCloseSuccess: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      state.statusClose = true
    },
    ticketStatusCloseError: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },

    ticketStatusProgressLoading: (state) => {
      state.isLoading = true
    },
    ticketStatusProgressSuccess: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      state.statusProgress = true
    },
    ticketStatusProgressError: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },

    deleteTicketLoading: (state) => {
      state.isLoading = true
    },
    deleteTicketSuccess: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      state.deleting = true
    },
    deleteTicketError: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },

    searchTicket: (state, { payload }) => {
      state.searchTerm = state?.tickets.filter((item) => {
        if (!payload) return item

        return item?.subject.toLowerCase().includes(payload.toLowerCase())
      })
    },

    TicketMessageInit: (state) => {
      state.isLoading = false
      state.error = ''
      state.ticketMessageSuccess = ''
      state.ticketMessageError = ''
      state.statusClose = ''
      state.statusProgress = ''
      state.deleting = ''
    },
  },
})

const { reducer, actions } = listTicketsSlice

export const {
  fetchTicketsLoading,
  fetchTicketsSuccess,
  fetchTicketsError,
  fetchTicketsDetailsLoading,
  fetchTicketsDetailsSuccess,
  fetchTicketsDetailsError,
  updateTicketMessageLoading,
  updateTicketMessageSuccess,
  updateTicketMessageError,
  ticketStatusCloseLoading,
  ticketStatusCloseSuccess,
  ticketStatusCloseError,
  ticketStatusProgressLoading,
  ticketStatusProgressSuccess,
  ticketStatusProgressError,
  deleteTicketLoading,
  deleteTicketSuccess,
  deleteTicketError,
  searchTicket,
  TicketMessageInit,
} = actions

export default reducer
