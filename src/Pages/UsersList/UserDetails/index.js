import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchUserInfo } from '../usersListActions'

import { Alert, Tag } from 'antd'

import { H2 } from '../../../Components/H'
import { P } from '../../../Components/P'
import { UserCard } from '../../../Components/Card'
import { Centered } from '../../../Components/Centered'
import { Spin } from '../../../Components/Spin'
import { fetchAllTickets } from '../../Ticketing/Tickets/ticketsActions'

function UserDetails() {
	const dispatch = useDispatch()

	const { isLoading, error, userSelected } = useSelector(
		(state) => state.userList,
	)
	const { tickets } = useSelector((state) => state.tickets)

	const { userID } = useParams()

	useEffect(() => {
		dispatch(fetchUserInfo(userID))
		dispatch(fetchAllTickets())
	}, [dispatch, userID])

	const TotalUserTickets = tickets?.filter(
		// eslint-disable-next-line eqeqeq
		(elm) => elm?.clientId == userSelected?._id,
	)

	const TotalUserInProgressTickets = tickets?.filter(
		// eslint-disable-next-line eqeqeq
		(elm) => elm?.clientId == userSelected?._id && elm?.status == 'En Cours',
	)

	const TotalUserCloseTickets = tickets?.filter(
		// eslint-disable-next-line eqeqeq
		(elm) => elm?.clientId == userSelected?._id && elm?.status == 'Fermé',
	)

	const TotalUserPendingTickets = tickets?.filter(
		// eslint-disable-next-line eqeqeq
		(elm) => elm?.clientId == userSelected?._id && elm?.status == 'En Attente',
	)

	return (
		<>
			<H2 style={{ padding: '10px' }}>Profil utilisateur</H2>

			{error && (
				<Centered style={{ paddingTop: '10px' }}>
					<Alert
						message="Ooops... Une erreur est survenue, veuillez essayer ultérieurement"
						description={error}
						type="error"
						showIcon
					/>
				</Centered>
			)}

			{isLoading ? (
				<Centered>
					<Spin />
				</Centered>
			) : (
				<Centered
					style={{
						marginTop: '20vh',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					<UserCard
						title={
							<>
								<Tag
									color={userSelected?.isAdmin ? 'purple' : 'geekblue'}
									key={userSelected?.isAdmin}
								>
									{userSelected?.isAdmin ? 'Admin' : 'Utilisateur'}
								</Tag>

								<Tag
									color={userSelected?.isVerified ? 'green' : 'volcano'}
									key={userSelected?.isVerified}
								>
									{userSelected?.isVerified ? 'Validé' : 'En attente'}
								</Tag>
							</>
						}
					>
						<P>Prénom : {userSelected?.firstname}</P>
						<P>Nom : {userSelected?.lastname}</P>
						<P>Email : {userSelected?.email}</P>
						<P>Téléphone : {userSelected?.phone}</P>
					</UserCard>

					<UserCard title={<P>Nombre de ticket</P>}>
						<P>Nombre total de ticket : {TotalUserTickets?.length}</P>
						<P>
							Nombre de ticket en cours : {TotalUserInProgressTickets?.length}
						</P>
						<P>Nombre de ticket fermé : {TotalUserCloseTickets?.length}</P>
						<P>
							Nombre de ticket en attente : {TotalUserPendingTickets?.length}
						</P>
					</UserCard>
				</Centered>
			)}
		</>
	)
}

export default UserDetails
