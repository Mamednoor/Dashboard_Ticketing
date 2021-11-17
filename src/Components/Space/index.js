import React from 'react'
import Space from './components'

const SpaceComponent = ({ style, children, width, ...props }) => (
	<Space
		style={{
			display: 'flex',
			...(width ? { width } : {}),
			...style,
			padding: '25px',
		}}
		{...props}
	>
		{children}
	</Space>
)

export default SpaceComponent
