import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { addingUser } from './adduserActions'
import { createUserInit } from './adduserSlice'

import { Btn } from '../../../Components/Button'
import { Centered } from '../../../Components/Centered'
import { ContentHeader } from '../../../Components/ContentHeader'
import { Flex } from '../../../Components/Flex'
import { FormItem } from '../../../Components/FormItem'
import Space from '../../../Components/Space'
import { Spin } from '../../../Components/Spin'

import {
	Alert,
	Form,
	Input,
	Typography,
	message as antdMessage,
	Checkbox,
} from 'antd'

const layout = {
	layout: 'horizontal',
	labelAlign: 'left',
	labelCol: { span: 9 },
}

const { Text } = Typography

const VerificationError = {
	isLenthy: false,
	hasUpper: false,
	hasLower: false,
	hasNumber: false,
	hasSpclChr: false,
	isPhoneLenthy: false,
	isPhoneValide: false,
}

function AddUser() {
	const dispatch = useDispatch()
	const history = useHistory()
	const { isLoading, status, message } = useSelector(
		(state) => state.addNewUser,
	)
	const [form] = Form.useForm()
	const [validationError, setValidationError] = useState(VerificationError)

	useEffect(() => {
		if (status === 'success') {
			return setTimeout(() => {
				dispatch(createUserInit()) && history.push('/userlist')
			}, 2000)
		}
	}, [dispatch, history, status])

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === 'password') {
			const isLenthy = value.length >= 8
			const hasUpper = /[A-Z]/.test(value)
			const hasLower = /[a-z]/.test(value)
			const hasNumber = /[0-9]/.test(value)
			const hasSpclChr = /[@,#,$,%,&,*]/.test(value)

			setValidationError({
				...validationError,
				isLenthy,
				hasUpper,
				hasLower,
				hasNumber,
				hasSpclChr,
			})
		}
		if (name === 'phone') {
			const isPhoneLenthy = value.length === 10
			const isPhoneValide = /^(0[6-7])(?:[ _.-]?(\d{2})){4}$/.test(value)
			setValidationError({
				...validationError,
				isPhoneLenthy,
				isPhoneValide,
			})
		}
	}

	const onFinishFailed = () => {
		antdMessage.error(
			"Des informations sont manquantes ou n'ont pas été validés",
		)
	}

	const handleSubmit = (values) => {
		const formData = {
			firstname: values.firstname,
			lastname: values.lastname,
			company: values.company,
			address: values.address,
			phone: values.phone,
			email: values.email,
			password: values.password,
			isAdmin: values.isAdmin,
		}
		dispatch(addingUser({ ...formData }))
	}

	return (
		// eslint-disable-next-line no-unreachable
		<>
			<ContentHeader
				breadcrumbItems={[
					{
						name: 'Liste des utilisateurs',
						path: `/userlist`,
					},
					{
						name: 'Ajouter un utilisateur',
					},
				]}
			/>
			{status === 'error' && (
				<Centered>
					<Alert
						message="Ooops... Une erreur est survenue"
						description={message}
						type="error"
						showIcon
					/>
				</Centered>
			)}

			{status === 'success' && (
				<Centered>
					<Alert
						message="Votre compte à été crée avec succes"
						type="success"
						showIcon
					/>
				</Centered>
			)}

			<Centered style={{ paddingTop: ' 90px' }}>
				<Space>
					<Flex style={{ padding: '35px', border: '1px solid' }}>
						<Form
							autoComplete="off"
							onFinish={handleSubmit}
							onFinishFailed={onFinishFailed}
							form={form}
							{...layout}
						>
							<FormItem
								name="firstname"
								label="Prénom"
								rules={[
									{
										required: true,
										message: 'Veuillez renseigner un prénom',
										min: 4,
									},
								]}
							>
								<Input name="firstname" placeholder="Prénom" />
							</FormItem>

							<FormItem
								name="lastname"
								label="Nom"
								rules={[
									{
										required: true,
										message: 'Veuillez renseigner un nom',
										min: 2,
									},
								]}
							>
								<Input name="lastname" placeholder="Nom" />
							</FormItem>

							<FormItem
								name="company"
								label="Société"
								rules={[
									{
										required: true,
										message: 'Veuillez renseigner votre société',
										min: 3,
									},
								]}
							>
								<Input name="company" placeholder="Société" />
							</FormItem>

							<FormItem
								name="address"
								label="Adresse"
								rules={[
									{
										required: true,
										message: 'Veuillez renseigner une adresse',
									},
								]}
							>
								<Input name="address" placeholder="Adresse de la société" />
							</FormItem>

							<FormItem
								name="phone"
								label="Mobile"
								rules={[
									{
										required: true,
										message: 'Veuillez renseigner un numéro valide',
										min: 10,
									},
								]}
								onChange={handleChange}
							>
								<Input name="phone" placeholder="Numéro de téléphone" />
							</FormItem>

							<FormItem
								name="email"
								label="Adresse Mail"
								rules={[
									{
										required: true,
										type: 'email',
									},
								]}
							>
								<Input name="email" placeholder="Email" />
							</FormItem>
							<FormItem
								name="password"
								label="Mot de passe"
								rules={[
									{
										required: true,
										message: 'Veuillez renseigner un mot de passe valide',
										min: 8,
									},
								]}
								hasFeedback
								onChange={handleChange}
							>
								<Input.Password name="password" placeholder="Mot de passe" />
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
											if (!value || getFieldValue('password') === value) {
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
							<FormItem name="isAdmin" label="Admin" valuePropName="checked">
								<Checkbox name="isAdmin">Admin</Checkbox>
							</FormItem>

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
					</Flex>
				</Space>

				<Space>
					<Flex
						style={{
							flexDirection: 'column',
							alignItems: 'flex-start',
							padding: '10px',
							width: '400px',
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
						<Text
							strong
							style={{ fontSize: '12px' }}
							type={
								validationError.isPhoneValide && validationError.isPhoneLenthy
									? 'success'
									: 'danger'
							}
						>
							Le format du numéro de téléphone est valide
						</Text>
					</Flex>
				</Space>
			</Centered>
		</>
	)
}

export default AddUser
