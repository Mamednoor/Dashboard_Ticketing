import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { ContentHeader } from '../../Components/ContentHeader'
import { Centered } from '../../Components/Centered'
import { H3 } from '../../Components/H'
import { fetchAllTickets } from '../Ticketing/Tickets/ticketsActions'
import { fetchAllUsers } from '../UsersList/usersListActions'

ChartJS.register(ArcElement, Tooltip, Legend)

function Chart() {
	const dispatch = useDispatch()
	const { tickets } = useSelector((state) => state.tickets)
	const { usersList } = useSelector((state) => state.userList)

	useEffect(() => {
		dispatch(fetchAllTickets())
		dispatch(fetchAllUsers())
	}, [dispatch])

	const pendingTicket = tickets?.filter(
		// eslint-disable-next-line eqeqeq
		(elm) => elm?.status == 'En Attente',
	)
	const inProgressTicket = tickets?.filter(
		// eslint-disable-next-line eqeqeq
		(elm) => elm?.status == 'En Cours',
	)
	// eslint-disable-next-line eqeqeq
	const closeTicket = tickets?.filter((elm) => elm?.status == 'Fermé')
	// eslint-disable-next-line eqeqeq
	const verifiedUser = usersList?.filter((elm) => elm?.isVerified == true)
	// eslint-disable-next-line eqeqeq
	const pendingUser = usersList?.filter((elm) => elm?.isVerified == false)

	const dataTickets = {
		labels: ['En Attente', 'En Cours', 'Fermé'],
		datasets: [
			{
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
				data: [verifiedUser.length, pendingUser.length],
				backgroundColor: ['#f6ffed', '#fff2e8'],
				borderColor: ['#b7eb8f', '#ffbb96'],
			},
		],
	}

	return (
		// eslint-disable-next-line no-unreachable
		<>
			<ContentHeader
				breadcrumbItems={[
					{
						name: 'Dashboard',
						path: `/dashboard`,
					},
					{
						name: 'Graphique',
					},
				]}
			/>

			<Centered style={{ paddingTop: '150px', justifyContent: 'space-evenly' }}>
				<div style={{ width: '400px' }}>
					<Centered>
						<H3>Tickets</H3>
					</Centered>
					<Doughnut data={dataTickets} />
				</div>
				<div style={{ width: '400px' }}>
					<Centered>
						<H3>Utilisateurs</H3>
					</Centered>
					<Doughnut data={dataUsers} />
				</div>
			</Centered>
		</>
	)
}

export default Chart
