import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	usersList: [],
	isLoading: false,
	userSelected: {},
	success: false,
	fail: false,
	error: '',
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
			state.error = payload
			state.fail = true
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

		searchUser: (state, { payload }) => {
			state.searchTerm = state?.usersList.filter((item) => {
				if (!payload) return item
				return (
					item?.firstname.toLowerCase().includes(payload.toLowerCase()) ||
					item?.lastname.toLowerCase().includes(payload.toLowerCase())
				)
			})
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
	searchUser,
} = actions

export default reducer
