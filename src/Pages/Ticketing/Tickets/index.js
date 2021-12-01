import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Alert } from 'antd'
import {
	fetchDetails,
	fetchTicketDetails,
	ticketStatusClose,
} from './ticketsActions'

import { TicketMessageInit } from './ticketsSlice'
import formatDate from '../../../utils'

import MessageHistory from './MessageHistory'
import ReplyTicket from './UpdateTicket'

import { Centered } from '../../../Components/Centered'
import { P } from '../../../Components/P'
import { Flex } from '../../../Components/Flex'
import { Btn } from '../../../Components/Button'
import { ContentCard } from '../../../Components/Card'
import { Spin } from '../../../Components/Spin'
import Space from '../../../Components/Space'
import { ContentHeader } from '../../../Components/ContentHeader'

export const Ticket = () => {
	const { ticketID } = useParams()
	const dispatch = useDispatch()
	const {
		isLoading,
		error,
		ticketSelected,
		ticketMessageSuccess,
		ticketMessageError,
		statusClose,
	} = useSelector((state) => state.tickets)
	const { isAdmin } = useSelector((state) => state.user.user)

	useEffect(() => {
		if (isAdmin === true) {
			return (
				dispatch(fetchDetails(ticketID)) &&
				setTimeout(() => {
					dispatch(TicketMessageInit())
				}, 2000)
			)
		}
		if (isAdmin === false) {
			return (
				dispatch(fetchTicketDetails(ticketID)) &&
				setTimeout(() => {
					dispatch(TicketMessageInit())
				}, 2000)
			)
		}
	}, [
		dispatch,
		isAdmin,
		statusClose,
		ticketID,
		ticketMessageError,
		ticketMessageSuccess,
	])

	return (
		<>
			<ContentHeader
				breadcrumbItems={[
					{
						name: 'Listes des Tickets',
						path: `/ticketing`,
					},
					{
						name: 'Détails',
					},
				]}
			/>
			<Centered style={{ flexDirection: 'column' }}>
				{error && (
					<Centered style={{ paddingTop: '10px' }}>
						<Alert
							message="L'opération à échouée"
							description={ticketMessageError}
							type="error"
							showIcon
						/>
					</Centered>
				)}

				{statusClose && (
					<Centered style={{ paddingTop: '10px' }}>
						<Alert
							message="Ce ticket à été fermé"
							description={statusClose.message}
							type="info"
							showIcon
						/>
					</Centered>
				)}

				{ticketMessageSuccess && (
					<Centered style={{ paddingTop: '10px' }}>
						<Alert
							message="Votre message a été envoyé avec succes"
							type="success"
							showIcon
						/>
					</Centered>
				)}

				{isLoading ? (
					<Centered>
						<Spin />
					</Centered>
				) : (
					<>
						<Flex className="action-container">
							<Space
								style={{
									flexDirection: 'column',
									alignItems: 'flex-start',
								}}
							>
								<P>
									<strong>Sujet :</strong> {ticketSelected?.subject}
								</P>
								<P>
									<strong>Ticket ouvert le :</strong>{' '}
									{formatDate(ticketSelected?.createdOn)}
								</P>
								<P>
									<strong>Statut :</strong> {ticketSelected?.status}
								</P>
							</Space>
							{isAdmin === true && (
								<Space>
									{ticketSelected?.status === 'Fermé' ? (
										<Btn style={{ padding: '0.5rem 1.5rem' }} disabled>
											Fermer le ticket
										</Btn>
									) : (
										<Btn
											style={{ padding: '0.5rem 1.5rem' }}
											onClick={() => dispatch(ticketStatusClose(ticketID))}
										>
											Fermer le ticket
										</Btn>
									)}
								</Space>
							)}
						</Flex>

						<Centered style={{ flexDirection: 'column' }}>
							<ContentCard>
								{ticketSelected?.conversations && (
									<MessageHistory message={ticketSelected?.conversations} />
								)}
							</ContentCard>
						</Centered>

						<Centered>
							<Space>
								<ReplyTicket ticketID={ticketID} />
							</Space>
						</Centered>
					</>
				)}
			</Centered>
		</>
	)
}
