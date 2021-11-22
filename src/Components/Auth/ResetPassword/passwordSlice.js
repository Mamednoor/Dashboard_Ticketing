import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoading: false,
	status: '',
	message: '',
}

const passwordResetSlice = createSlice({
	name: 'resetPassword',
	initialState,
	reducers: {
		passwordResetPending: (state) => {
			state.isLoading = true
		},
		passwordResetSuccess: (state, { payload }) => {
			state.isLoading = false
			state.status = 'success'
			state.message = payload
		},
		passwordResetError: (state, { payload }) => {
			state.isLoading = false
			state.status = 'error'
			state.message = payload
		},
		passwordResetInit: (state) => {
			state.isLoading = false
			state.status = ''
			state.message = ''
		},
		updatePasswordPending: (state) => {
			state.isLoading = true
		},
		updatePasswordSuccess: (state, { payload }) => {
			state.isLoading = false
			state.status = 'success'
			state.message = payload
		},
		updatePasswordError: (state, { payload }) => {
			state.isLoading = false
			state.status = 'error'
			state.message = payload
		},
	},
})

const { reducer, actions } = passwordResetSlice

export const {
	passwordResetPending,
	passwordResetSuccess,
	passwordResetError,
	passwordResetInit,
	updatePasswordPending,
	updatePasswordSuccess,
	updatePasswordError,
} = actions
export default reducer
