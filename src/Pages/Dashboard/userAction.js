import { userPending, userSuccess, userError } from './userSlice'
import { fetchUser } from '../../api'

export const getUser = () => async (dispatch) => {
	try {
		dispatch(userPending())
		const result = await fetchUser()

		if (result.user && result.user._id)
			return dispatch(userSuccess(result.user))

		dispatch(userError("l'utilisateur n'existe pas"))
	} catch (error) {
		dispatch(userError(error))
	}
}
