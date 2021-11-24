import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { userLogout } from '../../api'
import { loginInit } from '../Auth/Login/loginSlice'

import { Layout, Menu, Button } from 'antd'
import {
	DashboardOutlined,
	TeamOutlined,
	AppstoreOutlined,
	CloudOutlined,
	BarChartOutlined,
	LogoutOutlined,
} from '@ant-design/icons'

import { Wrapper } from '../Wrapper'

import logo from '../../Assets/logo-MAK.png'

const { Sider } = Layout

export const LayoutSider = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const [collapsed, setCollapsed] = useState(true)

	const logOut = () => {
		userLogout()
		dispatch(loginInit())
		history.push('/')
	}

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}
			style={{
				overflow: 'auto',
				height: '100vh',
				position: 'sticky',
				top: 0,
				left: 0,
			}}
		>
			<Wrapper className="index-logo">
				<a href="/">
					<img src={logo} alt="Logo de la societé MAK" />
					<h1>App</h1>
				</a>
			</Wrapper>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
				<Menu.Item key="1">
					<Link to="/home">
						<AppstoreOutlined />
						<span className="nav-text">Acceuil</span>
					</Link>
				</Menu.Item>

				<Menu.Item key="2">
					<Link to="/dashboard">
						<DashboardOutlined />
						<span className="nav-text">Dashboard</span>
					</Link>
				</Menu.Item>

				<Menu.Item key="3">
					<Link to="/chart">
						<BarChartOutlined />
						<span className="nav-text">Statistique</span>
					</Link>
				</Menu.Item>

				<Menu.Item key="4">
					<Link to="/ticketing">
						<CloudOutlined />
						<span className="nav-text">Ticketing</span>
					</Link>
				</Menu.Item>

				<Menu.Item key="5">
					<Link to="/userslist">
						<TeamOutlined />
						<span className="nav-text">UserList</span>
					</Link>
				</Menu.Item>

				<Menu.Item key="6">
					<Button style={{ padding: 0 }} onClick={() => logOut()} type="link">
						<LogoutOutlined />
						<span className="nav-text">Déconnexion</span>
					</Button>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}
