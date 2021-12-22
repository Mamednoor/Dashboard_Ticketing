import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from './passwordActions'
import { passwordResetInit } from './passwordSlice'

import { Form, Input, Typography, Alert, message as ANTDmessage } from 'antd'
import { CenteringCard } from '../../Card'
import { Btn } from '../../Button'
import { Centered } from '../../Centered'
import { CustomDivider } from '../../Divider'
import { CustomLink } from '../../Link'
import { FormItem } from '../../FormItem'
import { Flex } from '../../Flex'
import { H2 } from '../../H'
import { Spin } from '../../Spin'

const layout = {
	layout: 'horizontal',
	labelAlign: 'left',
	labelCol: { span: 11 },
}

const { Text } = Typography

const VerificationError = {
	isLenthy: false,
	hasUpper: false,
	hasLower: false,
	hasNumber: false,
	hasSpclChr: false,
}

function UpdatePassword() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [form] = Form.useForm()
	const [validationError, setValidationError] = useState(VerificationError)
	const { isLoading, message, status } = useSelector(
		(state) => state.resetPassword,
	)
	const { email } = useParams()

	useEffect(() => {
		if (status === 'success')
			return setTimeout(() => {
				dispatch(passwordResetInit()) && navigate('/')
			}, 2000)
	}, [dispatch, navigate, status])

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === 'newPassword') {
			const isLenthy = value.length >= 8
			const hasUpper = /[A-Z]/.test(value)
			const hasLower = /[a-z]/.test(value)
			const hasNumber = /[0-9]/.test(value)
			const hasSpclChr = /[@,$,!,%,*,#,?,&]/.test(value)

			setValidationError({
				...validationError,
				isLenthy,
				hasUpper,
				hasLower,
				hasNumber,
				hasSpclChr,
			})
		}
	}

	const onFinishFailed = () => {
		ANTDmessage.error('Les informations renseignées sont incorrectes')
	}

	const handleSubmit = (values) => {
		const formData = {
			resetCode: values.resetCode,
			newPassword: values.newPassword,
			email,
		}
		dispatch(updatePassword({ ...formData }))
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
				<H2>Modification du mot de passe</H2>
			</Centered>
			<CustomDivider />
			<Centered style={{ padding: ' 20px' }}>
				<Form
					autoComplete="off"
					onFinish={handleSubmit}
					onFinishFailed={onFinishFailed}
					form={form}
					{...layout}
				>
					<FormItem
						name="resetCode"
						label="Code de réinitialisation"
						rules={[
							{
								required: true,
								message: 'Veuillez renseigner le code de réinitialisation',
								min: 15,
							},
						]}
						onChange={handleChange}
					>
						<Input name="resetCode" placeholder="code de réinitialisation" />
					</FormItem>

					<FormItem
						name="newPassword"
						label="Mot de passe"
						rules={[
							{
								required: true,
								message: 'Veuillez renseigner un mot de passe valide',
								min: 8,
							},
						]}
						onChange={handleChange}
					>
						<Input.Password name="newPassword" placeholder="Mot de passe" />
					</FormItem>

					<FormItem
						name="confirmPassword"
						label="Confirmation"
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Merci de confirmer votre mot de passe',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('newPassword') === value) {
										return Promise.resolve()
									}

									return Promise.reject(
										new Error('Les mots de passe ne sont pas identiques'),
									)
								},
							}),
						]}
					>
						<Input.Password placeholder="Confirmation du mot de passe" />
					</FormItem>
					<CustomDivider />

					<Flex
						style={{
							flexDirection: 'column',
							alignItems: 'flex-start',
							padding: '10px',
						}}
					>
						<Text strong style={{ fontSize: '12px' }} type="info">
							Validation du formulaire :
						</Text>
						<Text
							strong
							style={{ fontSize: '12px' }}
							type={validationError.hasUpper ? 'success' : 'danger'}
						>
							Mot de passe avec au moins un caractère majuscule
						</Text>
						<Text
							strong
							style={{ fontSize: '12px' }}
							type={validationError.hasLower ? 'success' : 'danger'}
						>
							Mot de passe avec au moins un caractère minuscule
						</Text>
						<Text
							strong
							style={{ fontSize: '12px' }}
							type={validationError.hasNumber ? 'success' : 'danger'}
						>
							Mot de passe avec au moins un chiffre
						</Text>
						<Text
							strong
							style={{ fontSize: '12px' }}
							type={validationError.hasSpclChr ? 'success' : 'danger'}
						>
							Mot de passe avec au moins un de ces caractères spéciale
						</Text>
					</Flex>
					<CustomDivider />

					{/* <Btn
						type="submit"
						style={{
							padding: '0.5rem 1rem',
							width: '100%',
							marginTop: '15px',
						}}
					>
						Modifier
					</Btn> */}

					{Object.values(validationError).every((item) => item === true) ? (
						isLoading ? (
							<Centered>
								<Spin />
							</Centered>
						) : (
							<Btn
								type="submit"
								style={{
									padding: '0.5rem 1rem',
									width: '100%',
									marginTop: '15px',
								}}
							>
								Enregistrer
							</Btn>
						)
					) : isLoading ? (
						<Centered>
							<Spin />
						</Centered>
					) : (
						<Btn
							type="submit"
							style={{
								padding: '0.5rem 1rem',
								width: '100%',
								marginTop: '15px',
							}}
							disabled
						>
							Enregistrer
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

export default UpdatePassword
