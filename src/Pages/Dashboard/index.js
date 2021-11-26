import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	fetchAllTickets,
	fetchUserTickets,
} from '../Ticketing/Tickets/ticketsActions'

import { H2 } from '../../Components/H'
import { P } from '../../Components/P'
import { Flex } from '../../Components/Flex'
import { fetchAllUsers } from '../UsersList/usersListActions'
import Space from '../../Components/Space'

function Dashboard() {
	const dispatch = useDispatch()
	const { tickets } = useSelector((state) => state.tickets)
	const { isAdmin } = useSelector((state) => state.user.user)
	const { usersList } = useSelector((state) => state.userList)

	console.log(usersList)
	useEffect(() => {
		if (isAdmin === true) {
			dispatch(fetchAllTickets())
			dispatch(fetchAllUsers())
		}
		if (isAdmin === false) {
			dispatch(fetchUserTickets())
		}
	}, [dispatch, isAdmin])

	// eslint-disable-next-line eqeqeq
	const pendingTicket = tickets?.filter((elm) => elm?.status == 'En Attente')
	// eslint-disable-next-line eqeqeq
	const inProgressTicket = tickets?.filter((elm) => elm?.status == 'En Cours')
	// eslint-disable-next-line eqeqeq
	const closeTicket = tickets?.filter((elm) => elm?.status == 'Fermé')
	// eslint-disable-next-line eqeqeq
	const verifiedUser = usersList?.filter((elm) => elm?.isVerified == true)
	// eslint-disable-next-line eqeqeq
	const pendingUser = usersList?.filter((elm) => elm?.isVerified == false)

	return (
		<>
			<H2 style={{ padding: '10px' }}>Dashboard</H2>

			<Flex>
				<Space>
					<div>
						<P>Nombre de tickets total: {tickets?.length}</P>
						<P>Nombre de tickets en attente: {pendingTicket?.length}</P>
						<P>Nombre de tickets en cours: {inProgressTicket?.length}</P>
						<P>Nombre de tickets en fermé: {closeTicket?.length}</P>
					</div>
				</Space>
				{isAdmin && (
					<Space>
						<div>
							<P>Nombre d'utilisateur: {usersList?.length}</P>
							<P>Nombre d'utilisateur validé: {verifiedUser?.length}</P>
							<P>Nombre d'utilisateur en attente: {pendingUser?.length}</P>
						</div>
					</Space>
				)}
			</Flex>
		</>
	)
}

export default Dashboard
