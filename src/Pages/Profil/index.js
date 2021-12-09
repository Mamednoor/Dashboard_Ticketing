import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUserInfo } from '../UsersList/usersListActions'
import { profilInit } from './profilSlice'
import { updateProfilUser } from './profilActions'

import Marquee from 'react-fast-marquee'

import { Alert, Form, Input, message as ANTDmessage } from 'antd'
import { Btn } from '../../Components/Button'
import { Centered } from '../../Components/Centered'
import { ContentHeader } from '../../Components/ContentHeader'
import { Flex } from '../../Components/Flex'
import { FormItem } from '../../Components/FormItem'
import Space from '../../Components/Space'
import { Spin } from '../../Components/Spin'

const layout = {
	layout: 'horizontal',
	labelAlign: 'left',
	labelCol: { span: 9 },
}

const VerificationError = {
	isPhoneLenthy: true,
	isPhoneValide: true,
}

function Profil() {
	const dispatch = useDispatch()

	const { _id, firstname, lastname, email, company, address, phone } =
		useSelector((state) => state.user.user)
	const { isLoading, status, message } = useSelector((state) => state.profil)
	const [form] = Form.useForm()
	const [validationError, setValidationError] = useState(VerificationError)

	useEffect(() => {
		dispatch(fetchUserInfo(_id))
		if (status === 'success') {
			return setTimeout(() => {
				dispatch(profilInit()) && window.location.reload()
			}, 2000)
		}
	}, [_id, dispatch, status])

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === 'newPhone') {
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
		ANTDmessage.error(
			"Des informations sont manquantes ou n'ont pas été validés, seul les numéros mobiles commençant par 06 ou 07 sont acceptés",
		)
	}

	const handleSubmit = (values) => {
		dispatch(
			updateProfilUser({
				_id,
				newFirstname: values.newFirstname,
				newLastname: values.newLastname,
				newCompany: values.newCompany,
				newAddress: values.newAddress,
				newPhone: values.newPhone,
				newEmail: values.newEmail,
			}),
		)
	}

	return (
		// eslint-disable-next-line no-unreachable
		<>
			<ContentHeader
				breadcrumbItems={[
					{
						name: 'Dashboard',
						path: `/dashboard`,
					},
					{
						name: 'Profil',
					},
				]}
			/>
			<Alert
				type="info"
				banner
				message={
					<Marquee pauseOnHover gradient={false}>
						Afin de modifier votre mot de passe veuillez suivre la procédure de
						réinitialisation
					</Marquee>
				}
			/>
			{status === 'error' && (
				<Centered style={{ paddingTop: '30px' }}>
					<Alert
						message="Ooops... Une erreur est survenue"
						description={message}
						type="error"
						showIcon
					/>
				</Centered>
			)}

			{status === 'success' && (
				<Centered style={{ paddingTop: '30px' }}>
					<Alert
						message="Votre compte à été crée avec succes"
						type="success"
						showIcon
					/>
				</Centered>
			)}

			{isLoading ? (
				<Centered>
					<Spin />
				</Centered>
			) : (
				<Centered style={{ paddingTop: ' 80px' }}>
					<Space>
						<Flex style={{ padding: '35px', border: '1px solid' }}>
							<Form
								style={{ width: '500px' }}
								autoComplete="off"
								onFinish={handleSubmit}
								form={form}
								onFinishFailed={onFinishFailed}
								{...layout}
								initialValues={{
									newFirstname: firstname,
									newLastname: lastname,
									newCompany: company,
									newAddress: address,
									newPhone: phone,
									newEmail: email,
								}}
							>
								<FormItem
									name="newFirstname"
									label="Prénom"
									rules={[
										{
											required: true,
											message: 'Veuillez renseigner un prénom',
											min: 4,
										},
									]}
								>
									<Input name="newFirstname" placeholder="Prénom" />
								</FormItem>

								<FormItem
									name="newLastname"
									label="Nom"
									rules={[
										{
											required: true,
											message: 'Veuillez renseigner un nom',
											min: 2,
										},
									]}
								>
									<Input name="newLastname" placeholder="Nom" />
								</FormItem>

								<FormItem
									name="newCompany"
									label="Société"
									rules={[
										{
											required: true,
											message: 'Veuillez renseigner votre société',
											min: 3,
										},
									]}
								>
									<Input name="newCompany" placeholder="Société" />
								</FormItem>

								<FormItem
									name="newAddress"
									label="Adresse"
									rules={[
										{
											required: true,
											message: 'Veuillez renseigner une adresse',
										},
									]}
								>
									<Input
										name="newAddress"
										placeholder="Adresse de la société"
									/>
								</FormItem>

								<FormItem
									name="newPhone"
									label="Mobile"
									disabled
									rules={[
										{
											required: true,
											message: 'Veuillez renseigner un numéro valide',
											min: 10,
										},
									]}
									onChange={handleChange}
								>
									<Input name="newPhone" placeholder="Numéro de téléphone" />
								</FormItem>

								<FormItem
									name="newEmail"
									label="Adresse Mail"
									rules={[
										{
											required: true,
											type: 'email',
										},
									]}
								>
									<Input name="newEmail" placeholder="Email" />
								</FormItem>

								{Object.values(validationError).every(
									(item) => item === true,
								) ? (
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
											Modifier
										</Btn>
									)
								) : isLoading ? (
									<Centered>
										<Spin />
									</Centered>
								) : (
									<Btn
										type="button"
										style={{
											padding: '0.5rem 1rem',
											width: '100%',
											marginTop: '15px',
										}}
										onClick={() => onFinishFailed()}
									>
										Modifier
									</Btn>
								)}
							</Form>
						</Flex>
					</Space>
				</Centered>
			)}
		</>
	)
}

export default Profil
