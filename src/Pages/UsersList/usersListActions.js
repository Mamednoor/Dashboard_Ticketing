import { getUsersList, getUserDetails, deleteUser } from '../../api'

import {
	fetchUsersLoading,
	fetchUsersSuccess,
	fetchUsersError,
	fetchUserDetailsLoading,
	fetchUserDetailsSuccess,
	fetchUserDetailsError,
	deleteUserLoading,
	deleteUserSuccess,
	deleteUserError,
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

export const deletingUser = (userID, _id) => async (dispatch) => {
	dispatch(deleteUserLoading())

	try {
		const result = await (deleteUser(userID) && getUsersList())
		if (result.status === 'error') {
			return dispatch(deleteUserError(result.message))
		}

		dispatch(fetchUserInfo(userID))
		dispatch(deleteUserSuccess(result.message))
	} catch (error) {
		dispatch(deleteUserError(error.message))
	}
}

export const searchingUser = (searchTerm) => (dispatch) => {
	dispatch(searchUser(searchTerm))
}
