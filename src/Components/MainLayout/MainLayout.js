import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { LayoutSider } from './LayoutSider'
import { LayoutFooter } from './LayoutFooter'
import LayoutHeader from './LayoutHeader'

const { Content } = Layout

export const MainLayout = ({ children }) => {
	return (
		<Layout>
			<LayoutSider />
			<Layout>
				<LayoutHeader />
				<Content
					style={{
						minHeight: '83vh',

						margin: '24px 16px 0',
						overflow: 'initial',
						background: '#fff',
					}}
				>
					{children}
				</Content>
				<LayoutFooter />
			</Layout>
		</Layout>
	)
}
