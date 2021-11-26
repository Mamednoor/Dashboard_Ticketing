import React from 'react'
import { P } from '../P'
import { Centered } from '../Centered'

function UserCount({ usersList }) {
	// eslint-disable-next-line eqeqeq
	const verifiedUser = usersList?.filter((elm) => elm?.isVerified == true)
	// eslint-disable-next-line eqeqeq
	const pendingUser = usersList?.filter((elm) => elm?.isVerified == false)

	return (
		<Centered style={{ justifyContent: 'space-around' }}>
			<P>Nombre d'utilisateur: {usersList?.length}</P>
			<P>Nombre d'utilisateur validé: {verifiedUser?.length}</P>
			<P>Nombre d'utilisateur en attente: {pendingUser?.length}</P>
		</Centered>
	)
}
export default UserCount
