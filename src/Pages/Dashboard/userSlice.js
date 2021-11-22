import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {},
	isLoading: false,
	error: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userPending: (state) => {
			state.isLoading = true
		},
		userSuccess: (state, { payload }) => {
			state.user = payload
			state.isLoading = false
			state.error = ''
		},
		userError: (state, { payload }) => {
			state.isLoading = false
			state.error = payload
		},
		userLogout: (state, { payload }) => {
			state.user = ''
			state.isLoading = false
			state.error = payload
		},
	},
})

const { reducer, actions } = userSlice
export const { userPending, userSuccess, userError, userLogout } = actions
export default reducer
