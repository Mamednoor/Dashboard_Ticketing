import React from 'react'
import PropTypes from 'prop-types'

import { Tag } from 'antd'

export const StatusTag = ({ status }) => {
	return (
		<>
			{status === 'En Attente' && (
				<Tag color="geekblue" key={status} style={{ fontWeight: 'bold' }}>
					{status}
				</Tag>
			)}
			{status === 'En Cours' && (
				<Tag color="green" key={status} style={{ fontWeight: 'bold' }}>
					{status}
				</Tag>
			)}
			{status === 'Fermé' && (
				<Tag color="volcano" key={status} style={{ fontWeight: 'bold' }}>
					{status}
				</Tag>
			)}
		</>
	)
}

export const PriorityTag = ({ priority }) => {
	return (
		<>
			{priority === 'Basse' && (
				<Tag color="geekblue" key={priority} style={{ fontWeight: 'bold' }}>
					{priority}
				</Tag>
			)}
			{priority === 'Normal' && (
				<Tag color="green" key={priority} style={{ fontWeight: 'bold' }}>
					{priority}
				</Tag>
			)}
			{priority === 'Haute' && (
				<Tag color="volcano" key={priority} style={{ fontWeight: 'bold' }}>
					{priority}
				</Tag>
			)}
		</>
	)
}

StatusTag.propTypes = {
	status: PropTypes.object.isRequired,
}

PriorityTag.propTypes = {
	priority: PropTypes.object.isRequired,
}
