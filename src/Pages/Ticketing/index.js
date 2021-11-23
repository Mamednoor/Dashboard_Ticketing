import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchAllUserTickets } from './Tickets/ticketsActions'

import { H2 } from '../../Components/H'
import Table from './TicketTable'

import { SearchField } from '../../Components/InputSearch'
import { Btn } from '../../Components/Button'
import Space from '../../Components/Space'
import { Link } from 'react-router-dom'

function Ticketing() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAllUserTickets())
	}, [dispatch])

	return (
		<>
			<H2 style={{ padding: '10px' }}>Listes des tickets</H2>
			<Space>
				<SearchField />
				<Link to="/add-ticket">
					<Btn style={{ padding: '0.5rem 1rem' }}>
						Ajouter un nouveau ticket
					</Btn>
				</Link>
			</Space>
			<Table />
		</>
	)
}

export default Ticketing
