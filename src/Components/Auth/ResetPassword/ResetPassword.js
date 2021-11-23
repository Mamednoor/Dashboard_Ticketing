import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { sendInitPassword } from './passwordActions'
import { passwordResetInit } from './passwordSlice'

import { Form, Input, Alert } from 'antd'
import { Centered } from '../../Centered'
import { CustomDivider } from '../../Divider'
import { Spin } from '../../Spin'
import { Btn } from '../../Button'
import { H2 } from '../../H'
import { Flex } from '../../Flex'
import { CenteringCard } from '../../Card'
import { CustomLink } from '../../Link'
import { FormItem } from '../../FormItem'

function ResetPassword() {
	const dispatch = useDispatch()
	const history = useHistory()
	const { isLoading, status, message } = useSelector(
		(state) => state.resetPassword,
	)
	const [form] = Form.useForm()
	const [email, setEmail] = useState('')

	useEffect(() => {
		if (status === 'success')
			return setTimeout(() => {
				dispatch(passwordResetInit()) && history.push('/login')
			}, 5000)
	}, [dispatch, history, status])

	const handleChange = (e) => {
		const { value } = e.target
		setEmail(value)
	}

	const handleOnResetSubmit = (values) => {
		dispatch(sendInitPassword(email))
	}

	return (
		<CenteringCard>
			{status && (
				<Centered>
					<Alert
						message={message}
						type={status === 'success' ? 'success' : 'error'}
						showIcon
					/>
				</Centered>
			)}

			<Centered>
				<H2>Réinitialisation du mot de passe</H2>
			</Centered>
			<CustomDivider />
			<Centered style={{ width: '100%', padding: ' 20px' }}>
				<Form
					autoComplete="off"
					onFinish={handleOnResetSubmit}
					layout="vertical"
					form={form}
					style={{ width: '100%' }}
				>
					<FormItem
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								type: 'email',
							},
						]}
						onChange={handleChange}
					>
						<Input
							name="email"
							placeholder="Veuillez entrez votre email"
							value={email}
						/>
					</FormItem>

					{isLoading ? (
						<Centered>
							<Spin />
						</Centered>
					) : (
						<Btn
							type="submit"
							style={{ padding: '0.5rem 1rem', marginTop: '15px' }}
						>
							Réinitialisation
						</Btn>
					)}
				</Form>
			</Centered>
			<CustomDivider />

			<Flex
				style={{
					alignItems: 'flex-start',
					paddingTop: '15px',
				}}
			>
				<CustomLink to="/">Connectez-vous</CustomLink>
			</Flex>
		</CenteringCard>
	)
}

export default ResetPassword
