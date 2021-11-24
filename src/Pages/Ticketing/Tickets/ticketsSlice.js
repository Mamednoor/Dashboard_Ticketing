import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	tickets: [],
	isLoading: false,
	error: '',
	ticketMessageError: '',
	ticketSelected: {},
	ticketMessageSuccess: false,
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
		updateTicketMessageSuccess: (state) => {
			state.isLoading = false
			state.error = false
			state.ticketMessageSuccess = true
		},
		updateTicketMessageError: (state, { payload }) => {
			state.isLoading = false
			state.ticketMessageError = payload
		},

		ticketStatusCloseLoading: (state) => {
			state.isLoading = true
		},
		ticketStatusCloseSuccess: (state) => {
			state.isLoading = false
			state.error = false
			state.statusClose = true
		},
		ticketStatusCloseError: (state, { payload }) => {
			state.isLoading = false
			state.error = payload
		},

		ticketStatusProgressLoading: (state) => {
			state.isLoading = true
		},
		ticketStatusProgressSuccess: (state) => {
			state.isLoading = false
			state.error = false
			state.statusProgress = true
		},
		ticketStatusProgressError: (state, { payload }) => {
			state.isLoading = false
			state.error = payload
		},

		deleteTicketLoading: (state) => {
			state.isLoading = true
		},
		deleteTicketSuccess: (state) => {
			state.isLoading = false
			state.error = false
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
	updateTicketMessageInit,
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
