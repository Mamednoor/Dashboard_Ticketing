import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { fetchUserInfo } from '../usersListActions'
import { updateProfilbyAdmin } from './updateUserActions'
import { profilUpdateInit } from './updateUserSlice'

import { Alert, Checkbox, Form, Input, message as ANTDmessage } from 'antd'
import { Btn } from '../../../Components/Button'
import { Centered } from '../../../Components/Centered'
import { ContentHeader } from '../../../Components/ContentHeader'
import { Flex } from '../../../Components/Flex'
import { FormItem } from '../../../Components/FormItem'
import { Spin } from '../../../Components/Spin'
import Space from '../../../Components/Space'

const layout = {
	layout: 'horizontal',
	labelAlign: 'left',
	labelCol: { span: 9 },
}

const VerificationError = {
	isPhoneLenthy: true,
	isPhoneValide: true,
}

function UpdateUser() {
	const { userID } = useParams()
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const [validationError, setValidationError] = useState(VerificationError)

	const { isLoading, userSelected } = useSelector((state) => state.userList)

	const { condition, message } = useSelector((state) => state.profilUpdate)

	useEffect(() => {
		dispatch(fetchUserInfo(userID))
		if (condition === 'success') {
			return setTimeout(() => {
				dispatch(profilUpdateInit()) && window.location.reload()
			}, 2000)
		}
	}, [dispatch, condition, userID])

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
			updateProfilbyAdmin({
				_id: userID,
				newFirstname: values.newFirstname,
				newLastname: values.newLastname,
				newCompany: values.newCompany,
				newAddress: values.newAddress,
				newPhone: values.newPhone,
				newEmail: values.newEmail,
				newisAdmin: values.newisAdmin,
				newisVerified: values.newisVerified,
			}),
		)
	}

	return (
		<>
			<ContentHeader
				breadcrumbItems={[
					{
						name: "Détails d'un l'utilisateur",
						path: `/user/${userID}`,
					},
					{
						name: "Modification de l'utilisateur",
					},
				]}
			/>

			{condition === 'error' && (
				<Centered>
					<Alert
						message="Ooops... Une erreur est survenue"
						description={message}
						type="error"
						showIcon
					/>
				</Centered>
			)}

			{condition === 'success' && (
				<Centered>
					<Alert
						message="La modification a été effectuée"
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
				<Centered style={{ paddingTop: ' 90px' }}>
					<Space>
						<Flex style={{ padding: '40px', border: '1px solid' }}>
							<Form
								style={{ width: '500px' }}
								autoComplete="off"
								onFinish={handleSubmit}
								form={form}
								onFinishFailed={onFinishFailed}
								{...layout}
								initialValues={{
									newFirstname: userSelected?.firstname,
									newLastname: userSelected?.lastname,
									newEmail: userSelected?.email,
									newPhone: userSelected?.phone,
									newCompany: userSelected?.company,
									newAddress: userSelected?.address,
									newisAdmin: userSelected?.isAdmin,
									newisVerified: userSelected?.isVerified,
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
									<Input.TextArea
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
								<FormItem
									name="newisAdmin"
									label="Admin"
									valuePropName="checked"
								>
									<Checkbox name="newisAdmin" />
								</FormItem>
								<FormItem
									name="newisVerified"
									label="Compte validé"
									valuePropName="checked"
								>
									<Checkbox name="newisVerified" />
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

export default UpdateUser