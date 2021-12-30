import { openNewIssue } from '../../../api'

import {
  addNewTicketPending,
  addNewTicketSuccess,
  addNewTicketError,
} from './addTicketSlice'

export const openNewTicket = (formData) => (dispatch) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(addNewTicketPending())

      const result = await openNewIssue(formData)
      if (result.status === 'error') {
        return dispatch(addNewTicketError(result.message))
      }
      dispatch(addNewTicketSuccess(result.message))
      resolve(result.message)
    } catch (error) {
      dispatch(addNewTicketError(error.message))
      reject(error)
    }
  })
}
