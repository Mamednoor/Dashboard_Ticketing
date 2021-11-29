import React from 'react'
import PropTypes from 'prop-types'

import { P } from '../P'
import { Centered } from '../Centered'

function UserCount({ usersList }) {
	const verifiedUser = usersList?.filter((elm) => elm?.isVerified === true)
	const pendingUser = usersList?.filter((elm) => elm?.isVerified === false)

	return (
		<Centered style={{ justifyContent: 'space-around' }}>
			<P>Nombre d'utilisateur: {usersList?.length}</P>
			<P>Nombre d'utilisateur validé: {verifiedUser?.length}</P>
			<P>Nombre d'utilisateur en attente: {pendingUser?.length}</P>
		</Centered>
	)
}
export default UserCount

UserCount.propTypes = {
	usersList: PropTypes.array.isRequired,
}
