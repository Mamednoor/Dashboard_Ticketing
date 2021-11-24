import React from 'react'
import { Link } from 'react-router-dom'
import { Result } from 'antd'

const NotFound = () => (
	<Result
		status="404"
		title="404"
		subTitle="Désolé, une erreur est survenue, veuiller vous connecter de nouveau"
		extra={<Link to="/">Retour à l'ecran de connexion</Link>}
	/>
)

export default NotFound
