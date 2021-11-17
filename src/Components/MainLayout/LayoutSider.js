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
				top: 0,
				left: 0,
			}}
		>
			<div className="logo" />
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
				<Menu.Item key="1">
					<DashboardOutlined />
					<span className="nav-text">Dashboard</span>
				</Menu.Item>
				<Menu.Item key="2">
					<BarChartOutlined />
					<span className="nav-text">Statistique</span>
				</Menu.Item>
				<Menu.Item key="3">
					<CloudOutlined />
					<span className="nav-text">Reporting</span>
				</Menu.Item>
				<Menu.Item key="4">
					<AppstoreOutlined />
					<span className="nav-text">Un truc à voir</span>
				</Menu.Item>
				<Menu.Item key="5">
					<TeamOutlined />
					<span className="nav-text">Un autre truc</span>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}
