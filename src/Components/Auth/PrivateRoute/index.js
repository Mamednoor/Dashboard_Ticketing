import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { MainLayout } from '../../MainLayout/MainLayout'

function PrivateRoute({ children, ...rest }) {
	const isAuth = true

	return (
		<Route
			{...rest}
			render={() =>
				isAuth ? (
					<MainLayout> {children} </MainLayout>
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	)
}

export default PrivateRoute
