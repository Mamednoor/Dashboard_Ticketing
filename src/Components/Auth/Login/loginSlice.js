import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoading: false,
	isAuth: false,
	error: '',
	message: '',
}

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		loginPending: (state) => {
			state.isLoading = true
		},
		loginSuccess: (state, { payload }) => {
			state.isLoading = false
			state.isAuth = true
			state.error = payload
		},
		loginError: (state, { payload }) => {
			state.isLoading = false
			state.error = payload
			state.message = payload
		},
		loginInit: (state) => {
			state.isLoading = false
			state.isAuth = false
			state.message = ''
		},
	},
})

const { reducer, actions } = loginSlice

export const { loginPending, loginSuccess, loginError, loginInit } = actions
export default reducer
