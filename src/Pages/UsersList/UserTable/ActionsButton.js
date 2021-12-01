import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import React from 'react'
import { deletingUser } from '../usersListActions'

export function EraseUser({ userID }) {
	const dispatch = useDispatch()

	return (
		<>
			<Button type="link">Modifier</Button>
			<Button danger type="link" onClick={() => dispatch(deletingUser(userID))}>
				Suppression
			</Button>
		</>
	)
}
