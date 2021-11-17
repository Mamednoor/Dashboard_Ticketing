import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { LayoutSider } from './LayoutSider'
import { LayoutFooter } from './LayoutFooter'

const { Content } = Layout

export const MainLayout = ({ children }) => {
	return (
		<Layout>
			<LayoutSider />
			<Layout>
				<Content
					style={{
						minHeight: '90vh',

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
