import React from 'react'
import { H2 } from '../../Components/H'
import UserTable from './UserTable'

function UserList() {
	return (
		<>
			<H2 style={{ padding: '10px' }}>Liste des utilisateurs</H2>
			<UserTable />
		</>
	)
}

export default UserList
