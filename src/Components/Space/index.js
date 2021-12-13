import React from 'react'
import PropTypes from 'prop-types'

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

SpaceComponent.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	style: PropTypes.object,
	width: PropTypes.object,
}
