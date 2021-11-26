import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { H2 } from '../../Components/H'
import { SearchFieldUser } from '../../Components/InputSearch'
import UserCount from '../../Components/UserCount'
import { fetchAllUsers } from './usersListActions'
import UserTable from './UserTable'

function UserList() {
	const dispatch = useDispatch()
	const { usersList } = useSelector((state) => state.userList)

	useEffect(() => {
		dispatch(fetchAllUsers())
	}, [dispatch])

	return (
		<>
			<H2 style={{ padding: '10px' }}>Liste des utilisateurs</H2>
			<SearchFieldUser />
			<UserCount usersList={usersList} />
			<UserTable />
		</>
	)
}

export default UserList
