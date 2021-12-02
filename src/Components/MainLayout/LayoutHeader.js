import React from 'react'
import { useSelector } from 'react-redux'

import { Layout } from 'antd'

import { Centered } from '../Centered'

const { Header } = Layout

export const LayoutHeader = () => {
	const { firstname, lastname } = useSelector((state) => state.user.user)

	return (
		<Header
			style={{
				width: '100%',
				background: '#002140',
			}}
		>
			<Centered style={{ color: 'white' }}>
				Bonjour {firstname} {lastname}
			</Centered>
		</Header>
	)
}
