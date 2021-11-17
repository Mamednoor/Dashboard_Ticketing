import React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'

const { Footer } = Layout

export const LayoutFooter = () => {
	return (
		<Footer
			style={{
				textAlign: 'center',
				bottom: '0px',
				fontSize: '1rem',
			}}
		>
			Ant Design ©2018 Created by Ant UED
		</Footer>
	)
}
