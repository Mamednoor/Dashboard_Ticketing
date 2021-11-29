import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllUsers } from './usersListActions'
import { UserMessageInit } from './usersListSlice'

import { Alert } from 'antd'

import { H2 } from '../../Components/H'
import { Centered } from '../../Components/Centered'
import { SearchFieldUser } from '../../Components/InputSearch'
import UserCount from '../../Components/UserCount'
import UserTable from './UserTable'

function UserList() {
	const dispatch = useDispatch()
	const { usersList, searchTerm, deleting } = useSelector(
		(state) => state.userList,
	)

	useEffect(() => {
		dispatch(fetchAllUsers())

		if (deleting)
			return setTimeout(() => {
				dispatch(UserMessageInit())
			}, 2000)
	}, [deleting, dispatch])

	return (
		<>
			<H2 style={{ padding: '10px' }}>Liste des utilisateurs</H2>
			{deleting && (
				<Centered style={{ paddingTop: '10px' }}>
					<Alert
						message="L'utilisateur à été supprimé, cette action est irréversible"
						type="error"
						showIcon
					/>
				</Centered>
			)}
			<SearchFieldUser />
			<UserCount usersList={usersList} />
			<UserTable searchTerm={searchTerm} />
		</>
	)
}

export default UserList
