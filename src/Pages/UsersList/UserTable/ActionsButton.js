import React from 'react'

import { useDispatch } from 'react-redux'
import { deletingUser } from '../usersListActions'

import { Button } from 'antd'

export function EraseUser({ userID }) {
	const dispatch = useDispatch()

	return (
		<>
			<Button danger type="link" onClick={() => dispatch(deletingUser(userID))}>
				Suppression
			</Button>
		</>
	)
}
