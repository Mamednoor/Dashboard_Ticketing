import { openNewIssue } from '../../../api'

import {
	addNewTicketPending,
	addNewTicketSuccess,
	addNewTicketError,
} from './addTicketSlice'

export const openNewTicket = (formData) => (dispatch) => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch(addNewTicketPending())

			const result = await openNewIssue(formData)
			if (result.status === 'error') {
				return dispatch(addNewTicketError(result.message))
			}
			dispatch(addNewTicketSuccess(result.message))
		} catch (error) {
			dispatch(addNewTicketError(error.message))
		}
	})
}
