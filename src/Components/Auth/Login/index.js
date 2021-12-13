import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogin } from '../../../api'
import { loginPending, loginSuccess, loginError } from '../Login/loginSlice'
import { getUser } from '../../../Pages/Dashboard/userAction'

import { Form, Input, Checkbox, Alert } from 'antd'
import { Centered } from '../../Centered'
import { CustomDivider } from '../../Divider'
import { Spin } from '../../Spin'
import { Btn } from '../../Button'
import { H2 } from '../../H'
import { Flex } from '../../Flex'
import { CenteringCard } from '../../Card'
import { CustomLink } from '../../Link'
import { FormItem } from '../../FormItem'

const layout = {
	layout: 'horizontal',
	labelAlign: 'left',
	labelCol: { span: 10 },
}

function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isLoading, isAuth, error, message } = useSelector(
		(state) => state.login,
	)

	const [form] = Form.useForm()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		sessionStorage.getItem('accessToken') && navigate('/dashboard')
	}, [navigate])

	const handleChange = (e) => {
		const { name, value } = e.target

		switch (name) {
			case 'email':
				setEmail(value)
				break
			case 'password':
				setPassword(value)
				break
			default:
				break
		}
	}

	const handleSubmit = async (e) => {
		if (!email || !password) {
			return alert('Veuillez remplir le formulaire')
		}

		dispatch(loginPending())
		try {
			const isAuth = await userLogin({ email, password })
			if (isAuth.status === 'error') {
				return dispatch(loginError(isAuth.message))
			}

			dispatch(loginSuccess())
			dispatch(getUser())
			navigate('/home')
		} catch (error) {
			dispatch(loginError(error.message))
		}
	}
	return (
		<CenteringCard>
			{error && (
				<Centered>
					<Alert
						message="Ooops... Une erreur est survenue, veuillez essayer ultérieurement"
						description={message}
						type="error"
						showIcon
					/>
				</Centered>
			)}

			{isAuth && (
				<Centered>
					<Alert message="Connexion réussie" type="success" showIcon />
				</Centered>
			)}
			<Centered>
				<H2>Connexion</H2>
			</Centered>

			<CustomDivider />
			<Centered style={{ padding: ' 20px' }}>
				<Form
					autoComplete="off"
					onFinish={handleSubmit}
					layout="horizontal"
					form={form}
					{...layout}
				>
					<FormItem
						name="email"
						label="Adresse Mail"
						rules={[
							{
								required: true,
								message: 'Veuillez renseigner votre identifiant',
							},
						]}
						onChange={handleChange}
					>
						<Input name="email" placeholder="Email" value={email} />
					</FormItem>
					<FormItem
						name="password"
						label="Mot de passe"
						rules={[
							{
								required: true,
								message: 'Veuillez renseigner votre mot de passe',
							},
						]}
						onChange={handleChange}
					>
						<Input.Password
							name="password"
							placeholder="Mot de passe"
							value={password}
						/>
					</FormItem>

					<FormItem name="remember" valuePropName="checked">
						<Checkbox>Remember me</Checkbox>
					</FormItem>

					{isLoading ? (
						<Centered>
							<Spin />
						</Centered>
					) : (
						<Btn
							type="submit"
							style={{ padding: '0.5rem 1rem', width: '100%' }}
						>
							Connexion
						</Btn>
					)}
				</Form>
			</Centered>
			<CustomDivider />

			<Flex
				style={{
					flexDirection: 'column',
					alignItems: 'flex-start',
					paddingTop: '15px',
				}}
			>
				<CustomLink to="/forget-password">
					Réinitialisation du mot de passe
				</CustomLink>
				<CustomLink to="/registration">Créer un compte</CustomLink>
			</Flex>
		</CenteringCard>
	)
}

export default Login
