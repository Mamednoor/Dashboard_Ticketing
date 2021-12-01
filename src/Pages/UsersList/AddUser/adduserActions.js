import { createNewUser } from '../../../api'

import {
	createUserPending,
	createUserSuccess,
	createUserError,
} from './adduserSlice'

export const addingUser = (formData) => async (dispatch) => {
	try {
		dispatch(createUserPending())

		const result = await createNewUser(formData)

		result.status === 'success'
			? dispatch(createUserSuccess(result.message))
			: dispatch(createUserError(result.message))
	} catch (error) {
		dispatch(createUserError(error))
	}
}
