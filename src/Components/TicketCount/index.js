import React from 'react'
import { P } from '../P'
import { Centered } from '../Centered'

import { Tag } from 'antd'

function TicketCount({ tickets }) {
	// eslint-disable-next-line eqeqeq
	const pendingTicket = tickets?.filter((elm) => elm?.status == 'En Attente')
	// eslint-disable-next-line eqeqeq
	const inProgressTicket = tickets?.filter((elm) => elm?.status == 'En Cours')
	// eslint-disable-next-line eqeqeq
	const closeTicket = tickets?.filter((elm) => elm?.status == 'Fermé')

	return (
		<Centered style={{ justifyContent: 'space-around' }}>
			<P style={{ fontWeight: 'bold' }}>
				<Tag>Nombre de tickets total: {tickets?.length}</Tag>
			</P>
			<P style={{ fontWeight: 'bold' }}>
				<Tag color="geekblue">
					Nombre de tickets en attente: {pendingTicket?.length}
				</Tag>
			</P>
			<P style={{ fontWeight: 'bold' }}>
				<Tag color="green">
					Nombre de tickets en cours: {inProgressTicket?.length}
				</Tag>
			</P>
			<P style={{ fontWeight: 'bold' }}>
				<Tag color="volcano">
					Nombre de tickets en fermé: {closeTicket?.length}
				</Tag>
			</P>
		</Centered>
	)
}
export default TicketCount
