import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllUserTickets } from '../Ticketing/Tickets/ticketsActions'

import { H1 } from '../../Components/H'
import { P } from '../../Components/P'

function Dashboard() {
	const dispatch = useDispatch()
	const { tickets } = useSelector((state) => state.tickets)

	useEffect(() => {
		dispatch(fetchAllUserTickets())
	}, [dispatch])

	// eslint-disable-next-line eqeqeq
	const pendingTicket = tickets?.filter((elm) => elm?.status == 'En Attente')
	// eslint-disable-next-line eqeqeq
	const inProgressTicket = tickets?.filter((elm) => elm?.status == 'En Cours')

	return (
		<div>
			<H1>Dashboard</H1>

			<div>
				<P>Nombre de tickets total: {tickets?.length}</P>
				<P>Nombre de tickets en attente: {pendingTicket?.length}</P>
				<P>Nombre de tickets en cours: {inProgressTicket?.length}</P>
			</div>
		</div>
	)
}

export default Dashboard
