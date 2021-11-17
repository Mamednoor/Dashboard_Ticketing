import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
	DashboardOutlined,
	TeamOutlined,
	AppstoreOutlined,
	CloudOutlined,
	BarChartOutlined,
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'

const { Sider } = Layout

export const LayoutSider = () => {
	const [collapsed, setCollapsed] = useState(true)
	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}
			style={{
				overflow: 'auto',
				height: '100vh',
				position: 'sticky',
				top: 10,
				left: 0,
			}}
		>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
				<Menu.Item key="1">
					<Link to="/">
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
					<Link to="/reporting">
						<CloudOutlined />
						<span className="nav-text">Reporting</span>
					</Link>
				</Menu.Item>

				<Menu.Item key="5">
					<Link to="/userslist">
						<TeamOutlined />
						<span className="nav-text">UserList</span>
					</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}
