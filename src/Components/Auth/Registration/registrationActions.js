import { createUser } from '../../../api'

import {
	registrationPending,
	registrationSuccess,
	registrationError,
} from './registrationSlice'

export const userRegistration = (formData) => async (dispatch) => {
	try {
		dispatch(registrationPending())

		const result = await createUser(formData)

		result.status === 'success'
			? dispatch(registrationSuccess(result.message))
			: dispatch(registrationError(result.message))
	} catch (error) {
		dispatch(registrationError(error))
	}
}
