import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import React from 'react'
import {
	deletingTicket,
	ticketStatusClose,
	ticketStatusProgress,
} from '../Tickets/ticketsActions'

export function UpdateStatus({ ticketID }) {
	const dispatch = useDispatch()

	return (
		<>
			<Button
				type="link"
				onClick={() => dispatch(ticketStatusProgress(ticketID))}
			>
				Prise en compte
			</Button>
			<Button type="link" onClick={() => dispatch(ticketStatusClose(ticketID))}>
				Fermeture
			</Button>
			<Button
				danger
				type="link"
				onClick={() => dispatch(deletingTicket(ticketID))}
			>
				Suppression
			</Button>
		</>
	)
}
