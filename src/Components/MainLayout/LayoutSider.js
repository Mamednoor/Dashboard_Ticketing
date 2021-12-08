import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../../api'
import { loginInit } from '../Auth/Login/loginSlice'

import { Layout, Menu, Button } from 'antd'
import {
	DashboardOutlined,
	TeamOutlined,
	AppstoreOutlined,
	FolderOutlined,
	// BarChartOutlined,
	UserOutlined,
	LogoutOutlined,
} from '@ant-design/icons'

import { Wrapper } from '../Wrapper'

import logo from '../../Assets/logo-MAK.png'

const { Sider } = Layout

export const LayoutSider = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { isAdmin } = useSelector((state) => state.user.user)

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
				<Link to="/">
					<img src={logo} alt="Logo de la societé MAK" />
				</Link>
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
					<Link to="/ticketing">
						<FolderOutlined />
						<span className="nav-text">Ticketing</span>
					</Link>
				</Menu.Item>

				{isAdmin && (
					<>
						{/* <Menu.Item key="4">
							<Link to="/chart">
								<BarChartOutlined />
								<span className="nav-text">Statistique</span>
							</Link>
						</Menu.Item> */}

						<Menu.Item key="4">
							<Link to="/userslist">
								<TeamOutlined />
								<span className="nav-text">UserList</span>
							</Link>
						</Menu.Item>
					</>
				)}

				<Menu.Item key="5">
					<Link to="/profil">
						<UserOutlined />
						<span className="nav-text">Profil</span>
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
