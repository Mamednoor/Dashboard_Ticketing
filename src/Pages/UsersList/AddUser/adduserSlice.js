import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoading: false,
	status: '',
	message: '',
}

const createUserSlice = createSlice({
	name: 'addNewUser',
	initialState,
	reducers: {
		createUserPending: (state) => {
			state.isLoading = true
		},
		createUserSuccess: (state, { payload }) => {
			state.isLoading = false
			state.status = 'success'
			state.message = payload
		},
		createUserError: (state, { payload }) => {
			state.isLoading = false
			state.status = 'error'
			state.message = payload
		},
		createUserInit: (state) => {
			state.isLoading = false
			state.status = ''
		},
	},
})

const { reducer, actions } = createUserSlice

export const {
	createUserPending,
	createUserSuccess,
	createUserError,
	createUserInit,
} = actions
export default reducer
