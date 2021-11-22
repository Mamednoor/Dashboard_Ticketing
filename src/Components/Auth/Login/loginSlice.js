import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoading: false,
	isAuth: false,
	error: false,
}

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		loginPending: (state) => {
			state.isLoading = true
		},
		loginSuccess: (state) => {
			state.isLoading = false
			state.isAuth = true
			state.error = false
		},
		loginError: (state, { payload }) => {
			state.isLoading = false
			state.error = true
			state.message = payload
		},
		loginInit: (state) => {
			state.isLoading = false
			state.isAuth = false
		},
	},
})

const { reducer, actions } = loginSlice

export const { loginPending, loginSuccess, loginError, loginInit } = actions
export default reducer
