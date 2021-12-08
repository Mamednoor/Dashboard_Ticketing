import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import {
	fetchAllTickets,
	fetchUserTickets,
} from '../Ticketing/Tickets/ticketsActions'

import { P } from '../../Components/P'
import { Flex } from '../../Components/Flex'
import { fetchAllUsers } from '../UsersList/usersListActions'
import Space from '../../Components/Space'
import { ContentHeader } from '../../Components/ContentHeader'
import { Centered } from '../../Components/Centered'
import { Wrapper } from '../../Components/Wrapper'

ChartJS.register(ArcElement, Tooltip, Legend)

function Dashboard() {
	const dispatch = useDispatch()
	const { tickets } = useSelector((state) => state.tickets)
	const { isAdmin } = useSelector((state) => state.user.user)
	const { usersList } = useSelector((state) => state.userList)

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
	const verifiedUser = usersList?.filter((users) => users?.isVerified == true)
	// eslint-disable-next-line eqeqeq
	const pendingUser = usersList?.filter((users) => users?.isVerified == false)

	const dataTickets = {
		labels: ['En Attente', 'En Cours', 'Fermé'],
		datasets: [
			{
				label: 'Tickets',
				data: [
					pendingTicket.length,
					inProgressTicket.length,
					closeTicket.length,
				],
				backgroundColor: ['#f0f5ff', '#f6ffed', '#fff2e8'],
				borderColor: ['#adc6ff', '#b7eb8f', '#ffbb96'],
			},
		],
	}

	const dataUsers = {
		labels: ['Compte activé', "En attente d'activation"],
		datasets: [
			{
				label: 'Utilisateurs',
				data: [verifiedUser.length, pendingUser.length],
				backgroundColor: ['#f6ffed', '#fff2e8'],
				borderColor: ['#b7eb8f', '#ffbb96'],
			},
		],
	}

	return (
		<>
			<ContentHeader
				breadcrumbItems={[
					{
						name: 'Dashboard',
					},
				]}
			/>
			<Centered
				style={{
					marginTop: '20vh',
					justifyContent: 'space-evenly',
					flexWrap: 'wrap',
				}}
			>
				<Space>
					<Wrapper>
						<P>Nombre de tickets total: {tickets?.length}</P>
						<P>Nombre de tickets en attente: {pendingTicket?.length}</P>
						<P>Nombre de tickets en cours: {inProgressTicket?.length}</P>
						<P>Nombre de tickets en fermé: {closeTicket?.length}</P>
					</Wrapper>
					<Wrapper style={{ width: '300px' }}>
						<Doughnut data={dataTickets} />
					</Wrapper>
				</Space>

				{isAdmin && (
					<Space>
						<Wrapper>
							<P>Nombre d'utilisateur: {usersList?.length}</P>
							<P>Nombre d'utilisateur validé: {verifiedUser?.length}</P>
							<P>Nombre d'utilisateur en attente: {pendingUser?.length}</P>
						</Wrapper>
						<Wrapper style={{ width: '300px' }}>
							<Doughnut data={dataUsers} />
						</Wrapper>
					</Space>
				)}
			</Centered>
		</>
	)
}

export default Dashboard
