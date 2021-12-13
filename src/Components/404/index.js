import React from 'react'
import { Link } from 'react-router-dom'
import { Result } from 'antd'

const NotFound = () => (
	<Result
		style={{
			minHeight: '70vh',
			display: 'flex',
			flexDirection: 'column',
		}}
		status="404"
		title="404"
		subTitle="Désolé, une erreur est survenue, veuiller vous connecter de nouveau"
		extra={<Link to="/">Retour à la page d‘acceuil</Link>}
	/>
)

export default NotFound
