import {
	getAllTickets,
	TicketDetails,
	getUserTickets,
	getTicketDetails,
	updateTicketMessage,
	closeTicket,
	progressTicket,
	deleteTicket,
} from '../../../api'

import {
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
} from './ticketsSlice'

export const fetchAllTickets = () => async (dispatch) => {
	dispatch(fetchTicketsLoading())

	try {
		const result = await getAllTickets()
		dispatch(fetchTicketsSuccess(result.data?.result))
	} catch (error) {
		dispatch(fetchTicketsError(error.message))
	}
}

export const fetchDetails = (_id) => async (dispatch) => {
	dispatch(fetchTicketsDetailsLoading())

	try {
		const result = await TicketDetails(_id)
		dispatch(
			fetchTicketsDetailsSuccess(
				result.data?.result?.length && result.data?.result?.[0],
			),
		)
	} catch (error) {
		dispatch(fetchTicketsDetailsError(error.message))
	}
}

export const fetchUserTickets = () => async (dispatch) => {
	dispatch(fetchTicketsLoading())

	try {
		const result = await getUserTickets()
		dispatch(fetchTicketsSuccess(result.data?.result))
	} catch (error) {
		dispatch(fetchTicketsError(error.message))
	}
}

export const fetchTicketDetails = (_id) => async (dispatch) => {
	dispatch(fetchTicketsDetailsLoading())

	try {
		const result = await getTicketDetails(_id)
		dispatch(
			fetchTicketsDetailsSuccess(
				result.data?.result?.length && result.data?.result?.[0],
			),
		)
	} catch (error) {
		dispatch(fetchTicketsDetailsError(error.message))
	}
}

export const replyTicketMessage =
	(ticketID, message, sender) => async (dispatch) => {
		dispatch(updateTicketMessageLoading())

		try {
			const result = await updateTicketMessage(ticketID, message, sender)
			if (result.status === 'error') {
				return dispatch(updateTicketMessageError(result.message.status))
			}
			dispatch(fetchTicketDetails(ticketID))
			dispatch(updateTicketMessageSuccess())
		} catch (error) {
			dispatch(updateTicketMessageError(error.message))
		}
	}

export const ticketStatusClose = (ticketID, _id) => async (dispatch) => {
	dispatch(ticketStatusCloseLoading())

	try {
		const result = await closeTicket(ticketID)
		if (result.status === 'error') {
			return dispatch(ticketStatusCloseError(result.message))
		}

		dispatch(fetchTicketDetails(ticketID))
		dispatch(ticketStatusCloseSuccess(result.message))
	} catch (error) {
		dispatch(ticketStatusCloseError(error.message))
	}
}

export const ticketStatusProgress = (ticketID, _id) => async (dispatch) => {
	dispatch(ticketStatusProgressLoading())

	try {
		const result = await progressTicket(ticketID)
		if (result.status === 'error') {
			return dispatch(ticketStatusProgressError(result.message))
		}

		dispatch(fetchTicketDetails(ticketID))
		dispatch(ticketStatusProgressSuccess(result.message))
	} catch (error) {
		dispatch(ticketStatusProgressError(error.message))
	}
}

export const deletingTicket = (ticketID, _id) => async (dispatch) => {
	dispatch(deleteTicketLoading())

	try {
		const result = await deleteTicket(ticketID)
		if (result.status === 'error') {
			return dispatch(deleteTicketError(result.message))
		}

		dispatch(fetchTicketDetails(ticketID))
		dispatch(deleteTicketSuccess(result.message))
	} catch (error) {
		dispatch(deleteTicketError(error.message))
	}
}

export const searchingTicket = (searchTerm) => (dispatch) => {
	dispatch(searchTicket(searchTerm))
}
