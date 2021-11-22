import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserVerificationAccount } from '../../../api'

import { Alert } from 'antd'
import { Centered } from '../../Centered'
import { CenteringCard } from '../../Card'
import { CustomDivider } from '../../Divider'
import { H2 } from '../../H'
import { Spin } from '../../Spin'
import { CustomLink } from '../../Link'

function AccountValidation() {
	const [response, setResponse] = useState({
		status: '',
		message: '',
	})
	const { _id, email } = useParams()

	const dataAccount = { _id, email }

	useEffect(() => {
		const apiCall = async () => {
			const result = await UserVerificationAccount(dataAccount)

			setResponse(result)
		}

		!response.status && apiCall()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response])

	return (
		<CenteringCard style={{ minHeight: '100vh' }}>
			<Centered>
				<H2>Activation de votre compte</H2>
			</Centered>
			<CustomDivider />
			<Centered style={{ padding: ' 20px' }}>
				{!response.status && <Spin />}

				{response.status && (
					<Alert
						type={response.status === 'success' ? 'success' : 'error'}
						message={response.message}
						description={<CustomLink to="/">Page de connexion</CustomLink>}
					/>
				)}
			</Centered>
			<CustomDivider />
		</CenteringCard>
	)
}

export default AccountValidation
