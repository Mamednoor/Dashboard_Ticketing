import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchAllTickets } from './ticketsActions'

import { H1 } from '../../../Components/H'
import Table from '../TicketTable'

import { SearchField } from '../../../Components/InputSearch'

function Ticketing() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAllTickets())
	}, [dispatch])

	return (
		<div>
			<H1 style={{ paddingTop: '10px' }}>Ticketing</H1>

			<SearchField />

			<Table />
		</div>
	)
}

export default Ticketing
