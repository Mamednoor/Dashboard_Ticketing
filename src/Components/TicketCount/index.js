import React from 'react'
import { P } from '../P'
import { Centered } from '../Centered'

function TicketCount({ tickets }) {
	// eslint-disable-next-line eqeqeq
	const pendingTicket = tickets?.filter((elm) => elm?.status == 'En Attente')
	// eslint-disable-next-line eqeqeq
	const inProgressTicket = tickets?.filter((elm) => elm?.status == 'En Cours')
	// eslint-disable-next-line eqeqeq
	const closeTicket = tickets?.filter((elm) => elm?.status == 'Fermé')

	return (
		<Centered style={{ justifyContent: 'space-around' }}>
			<P>Nombre de tickets total: {tickets?.length}</P>
			<P>Nombre de tickets en attente: {pendingTicket?.length}</P>
			<P>Nombre de tickets en cours: {inProgressTicket?.length}</P>
			<P>Nombre de tickets en fermé: {closeTicket?.length}</P>
		</Centered>
	)
}
export default TicketCount
