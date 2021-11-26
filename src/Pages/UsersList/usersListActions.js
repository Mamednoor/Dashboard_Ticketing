import { getUsersList, getUserDetails } from '../../api'

import {
	fetchUsersLoading,
	fetchUsersSuccess,
	fetchUsersError,
	fetchUserDetailsLoading,
	fetchUserDetailsSuccess,
	fetchUserDetailsError,
	searchUser,
} from './usersListSlice'

export const fetchAllUsers = () => async (dispatch) => {
	dispatch(fetchUsersLoading())

	try {
		const result = await getUsersList()
		dispatch(fetchUsersSuccess(result.data?.result))
	} catch (error) {
		dispatch(fetchUsersError(error.message))
	}
}

export const fetchUserInfo = (_id) => async (dispatch) => {
	dispatch(fetchUserDetailsLoading())

	try {
		const result = await getUserDetails(_id)
		dispatch(
			fetchUserDetailsSuccess(
				result.data?.result?.length && result.data?.result?.[0],
			),
		)
	} catch (error) {
		dispatch(fetchUserDetailsError(error.message))
	}
}

export const searchingUser = (searchTerm) => (dispatch) => {
	dispatch(searchUser(searchTerm))
}
