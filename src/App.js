import React from 'react'
import { Route, Switch } from 'react-router'
import PrivateRoute from './Components/Auth/PrivateRoute'
import Login from './Components/Auth/Login'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Reporting from './Pages/Reporting'
import Chart from './Pages/Chart'
import UsersList from './Pages/UsersList'

import './App.css'
import 'antd/dist/antd.css'

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/login">
					<Login />
				</Route>
				<PrivateRoute exact path="/">
					<Home />
				</PrivateRoute>
				<PrivateRoute exact path="/reporting">
					<Reporting />
				</PrivateRoute>
				<PrivateRoute exact path="/chart">
					<Chart />
				</PrivateRoute>
				<PrivateRoute exact path="/userslist">
					<UsersList />
				</PrivateRoute>
				<PrivateRoute exact path="/dashboard">
					<Dashboard />
				</PrivateRoute>
			</Switch>
		</div>
	)
}

export default App
