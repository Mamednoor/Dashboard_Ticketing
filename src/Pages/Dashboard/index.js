import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	fetchAllTickets,
	fetchUserTickets,
} from '../Ticketing/Tickets/ticketsActions'

import { H2 } from '../../Components/H'
import { P } from '../../Components/P'

function Dashboard() {
	const dispatch = useDispatch()
	const { tickets } = useSelector((state) => state.tickets)
	const { isAdmin } = useSelector((state) => state.user.user)

	useEffect(() => {
		if (isAdmin === true) {
			dispatch(fetchAllTickets())
		}
		if (isAdmin === false) {
			dispatch(fetchUserTickets())
		}
	}, [dispatch, isAdmin])

	// eslint-disable-next-line eqeqeq
	const pendingTicket = tickets?.filter((elm) => elm?.status == 'En Attente')
	// eslint-disable-next-line eqeqeq
	const inProgressTicket = tickets?.filter((elm) => elm?.status == 'En Cours')

	return (
		<>
			<H2 style={{ padding: '10px' }}>Dashboard</H2>

			<div>
				<P>Nombre de tickets total: {tickets?.length}</P>
				<P>Nombre de tickets en attente: {pendingTicket?.length}</P>
				<P>Nombre de tickets en cours: {inProgressTicket?.length}</P>
			</div>
		</>
	)
}

export default Dashboard
