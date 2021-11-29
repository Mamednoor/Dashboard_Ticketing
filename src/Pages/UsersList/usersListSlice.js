import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	usersList: [],
	isLoading: false,
	userSelected: {},
	success: false,
	fail: '',
	error: false,
	deleting: false,
	searchTerm: [],
}

const UsersListSlice = createSlice({
	name: 'usersList',
	initialState,
	reducers: {
		fetchUsersLoading: (state) => {
			state.isLoading = true
		},
		fetchUsersSuccess: (state, { payload }) => {
			state.isLoading = false
			state.success = true
			state.usersList = payload
			state.searchTerm = payload
		},
		fetchUsersError: (state, { payload }) => {
			state.isLoading = false
			state.error = true
			state.fail = payload
		},
		fetchUserDetailsLoading: (state) => {
			state.isLoading = true
		},
		fetchUserDetailsSuccess: (state, { payload }) => {
			state.isLoading = false
			state.userSelected = payload
			state.error = false
		},
		fetchUserDetailsError: (state, { payload }) => {
			state.isLoading = false
			state.error = true
		},

		deleteUserLoading: (state) => {
			state.isLoading = true
		},
		deleteUserSuccess: (state, { payload }) => {
			state.isLoading = false
			state.error = payload
			state.deleting = true
		},
		deleteUserError: (state, { payload }) => {
			state.isLoading = false
			state.error = payload
			state.deleting = false
		},

		searchUser: (state, { payload }) => {
			state.searchTerm = state?.usersList.filter((item) => {
				if (!payload) return item
				return (
					item?.firstname.toLowerCase().includes(payload.toLowerCase()) ||
					item?.lastname.toLowerCase().includes(payload.toLowerCase())
				)
			})
		},

		UserMessageInit: (state) => {
			state.isLoading = false
			state.success = ''
			state.fail = ''
			state.error = ''
			state.deleting = ''
		},
	},
})

const { reducer, actions } = UsersListSlice

export const {
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
	UserMessageInit,
} = actions

export default reducer
