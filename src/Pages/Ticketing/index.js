import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllTickets, fetchUserTickets } from './Tickets/ticketsActions'

import { Alert } from 'antd'

import Table from './TicketTable'
import { SearchFieldTicket } from '../../Components/InputSearch'
import { Btn } from '../../Components/Button'
import Space from '../../Components/Space'
import { Link } from 'react-router-dom'
import { Centered } from '../../Components/Centered'
import { TicketMessageInit } from './Tickets/ticketsSlice'
import TicketCount from '../../Components/TicketCount'
import { ContentHeader } from '../../Components/ContentHeader'

function Ticketing() {
	const dispatch = useDispatch()
	const { tickets } = useSelector((state) => state.tickets)
	const { isAdmin } = useSelector((state) => state.user.user)
	const { statusProgress, deleting, statusClose } = useSelector(
		(state) => state.tickets,
	)
	useEffect(() => {
		if (isAdmin === true) {
			dispatch(fetchAllTickets())
		}
		if (isAdmin === false) {
			dispatch(fetchUserTickets())
		}

		if (statusProgress || statusClose || deleting)
			return setTimeout(() => {
				dispatch(TicketMessageInit())
			}, 2000)
	}, [deleting, dispatch, isAdmin, statusClose, statusProgress])

	return (
		<Centered style={{ flexDirection: 'column' }}>
			<ContentHeader
				breadcrumbItems={[
					{
						name: 'Dashboard',
						path: `/dashboard`,
					},
					{
						name: 'Listes des Tickets',
					},
				]}
			/>
			<Space style={{ flexWrap: 'wrap' }}>
				<SearchFieldTicket />
				<Link to="/add-ticket">
					<Btn style={{ padding: '0.5rem 1rem' }}>
						Ajouter un nouveau ticket
					</Btn>
				</Link>
			</Space>
			<TicketCount tickets={tickets} />

			{statusClose && (
				<Centered style={{ paddingBottom: '30px' }}>
					<Alert message="Ce ticket à été fermé" type="warning" showIcon />
				</Centered>
			)}
			{statusProgress && (
				<Centered style={{ paddingBottom: '30px' }}>
					<Alert
						message="Vous avez pris le ticket en compte"
						type="info"
						showIcon
					/>
				</Centered>
			)}
			{deleting && (
				<Centered style={{ paddingBottom: '30px' }}>
					<Alert
						message="Le ticket à été supprimé, cette action est irréversible"
						type="error"
						showIcon
					/>
				</Centered>
			)}
			<Table />
		</Centered>
	)
}

export default Ticketing
