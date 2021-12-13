import React, { useState } from 'react'
import { Routes, Route } from 'react-router'
import PrivateRoute from './Components/Auth/PrivateRoute'
import Login from './Components/Auth/Login'
import Registration from './Components/Auth/Registration'
import ResetPassword from './Components/Auth/ResetPassword/ResetPassword'
import UpdatePassword from './Components/Auth/ResetPassword/UpdatePassword'
import AccountValidation from './Components/Auth/AccountValidation/AccountValidation'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Ticketing from './Pages/Ticketing'
import UsersList from './Pages/UsersList'
import NotFound from './Components/404'

import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyle } from './Theme/index'

import AddTicket from './Pages/Ticketing/AddTicket'
import { Ticket } from './Pages/Ticketing/Tickets'
import UserDetails from './Pages/UsersList/UserDetails'
import AddUser from './Pages/UsersList/AddUser'
import Profil from './Pages/Profil'
import UpdateUser from './Pages/UsersList/UserDetails/UpdateUser'

import './App.css'
import 'antd/dist/antd.css'

function App() {
	const [theme] = useState('light')

	return (
		<>
			<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
				<GlobalStyle />
				<Routes>
					<Route exact path="/" element={<Login />} />
					<Route exact path="/registration" element={<Registration />} />
					<Route exact path="/forget-password" element={<ResetPassword />} />
					<Route
						exact
						path="/reset-password/:_id/:email"
						element={<UpdatePassword />}
					/>
					<Route
						exact
						path="/validation/:_id/:email"
						element={<AccountValidation />}
					/>
					<Route
						exact
						path="/home"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/ticketing"
						element={
							<PrivateRoute>
								<Ticketing />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/ticket/:ticketID"
						element={
							<PrivateRoute>
								<Ticket />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/add-ticket"
						element={
							<PrivateRoute>
								<AddTicket />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/userslist"
						element={
							<PrivateRoute>
								<UsersList />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/user/:userID"
						element={
							<PrivateRoute>
								<UserDetails />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/adduser"
						element={
							<PrivateRoute>
								<AddUser />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/profil"
						element={
							<PrivateRoute>
								<Profil />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/update-user/:userID"
						element={
							<PrivateRoute>
								<UpdateUser />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ThemeProvider>
		</>
	)
}

export default App
