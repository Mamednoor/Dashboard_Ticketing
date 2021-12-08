import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { refreshAccessToken } from '../../../api'
import { loginSuccess } from '../Login/loginSlice'

import { MainLayout } from '../../MainLayout/MainLayout'
import { Spin } from '../../Spin'
import { Centered } from '../../Centered'
import { getUser } from '../../../Pages/Dashboard/userAction'

function PrivateRoute({ children, ...rest }) {
	const dispatch = useDispatch()
	const { isLoading, isAuth } = useSelector((state) => state.login)
	const { user } = useSelector((state) => state.user)

	useEffect(() => {
		const updateToken = async () => {
			const result = await refreshAccessToken()
			result && dispatch(loginSuccess())
		}
		!user._id && dispatch(getUser())

		!sessionStorage.getItem('accessToken') &&
			localStorage.getItem('refreshToken') &&
			updateToken()

		!isAuth && sessionStorage.getItem('accessToken') && dispatch(loginSuccess())
	}, [dispatch, isAuth, user._id])

	return (
		<>
			{isLoading ? (
				<Centered>
					<Spin />
				</Centered>
			) : (
				<Route
					{...rest}
					render={({ location }) =>
						isAuth ? (
							<MainLayout> {children} </MainLayout>
						) : (
							<Redirect
								to={{
									pathname: '/',
									state: { from: location },
								}}
							/>
						)
					}
				/>
			)}
		</>
	)
}

export default PrivateRoute
