import React, { useState } from 'react'
import { Route, Switch } from 'react-router'
import PrivateRoute from './Components/Auth/PrivateRoute'
import Login from './Components/Auth/Login'
import Registration from './Components/Auth/Registration'
import ResetPassword from './Components/Auth/ResetPassword/ResetPassword'
import UpdatePassword from './Components/Auth/ResetPassword/UpdatePassword'
import AccountValidation from './Components/Auth/AccountValidation/AccountValidation'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Ticketing from './Pages/Ticketing'
//import Chart from './Pages/Chart'
import UsersList from './Pages/UsersList'
import NotFound from './Components/404'

import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyle } from './Theme/index'

import './App.css'
import 'antd/dist/antd.css'
import AddTicket from './Pages/Ticketing/AddTicket'
import { Ticket } from './Pages/Ticketing/Tickets'
import UserDetails from './Pages/UsersList/UserDetails'
import AddUser from './Pages/UsersList/AddUser'
import Profil from './Pages/Profil'
import UpdateUser from './Pages/UsersList/UserDetails/UpdateUser'

function App() {
	const [theme] = useState('light')

	return (
		<>
			<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
				<GlobalStyle />
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					<Route exact path="/registration">
						<Registration />
					</Route>
					<Route exact path="/forget-password">
						<ResetPassword />
					</Route>
					<Route exact path="/reset-password/:_id/:email">
						<UpdatePassword />
					</Route>
					<Route exact path="/validation/:_id/:email">
						<AccountValidation />
					</Route>

					<PrivateRoute exact path="/home">
						<Home />
					</PrivateRoute>
					<PrivateRoute exact path="/dashboard">
						<Dashboard />
					</PrivateRoute>
					{/* <PrivateRoute exact path="/chart">
						<Chart />
					</PrivateRoute> */}
					<PrivateRoute exact path="/ticketing">
						<Ticketing />
					</PrivateRoute>
					<PrivateRoute exact path="/ticket/:ticketID">
						<Ticket />
					</PrivateRoute>
					<PrivateRoute exact path="/add-ticket">
						<AddTicket />
					</PrivateRoute>
					<PrivateRoute exact path="/userslist">
						<UsersList />
					</PrivateRoute>
					<PrivateRoute exact path="/user/:userID">
						<UserDetails />
					</PrivateRoute>
					<PrivateRoute exact path="/adduser">
						<AddUser />
					</PrivateRoute>
					<PrivateRoute exact path="/profil">
						<Profil />
					</PrivateRoute>
					<PrivateRoute exact path="/update-user/:userID">
						<UpdateUser />
					</PrivateRoute>

					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</ThemeProvider>
		</>
	)
}

export default App
