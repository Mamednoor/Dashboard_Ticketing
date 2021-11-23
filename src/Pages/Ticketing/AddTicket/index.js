import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { openNewTicket } from './addTicketActions'
import { addNewTicketInit } from './addTicketSlice'

import { Form, Input, Alert } from 'antd'
import { Centered } from '../../../Components/Centered'
import { CustomDivider } from '../../../Components/Divider'
import { Spin } from '../../../Components/Spin'
import { Btn } from '../../../Components/Button'
import { H2 } from '../../../Components/H'
import { Container } from '../../../Components/Container'

function AddTicket() {
	const dispatch = useDispatch()
	const history = useHistory()
	const { firstname, lastname } = useSelector((state) => state.user.user)
	const { isLoading, addMessage, status } = useSelector(
		(state) => state.addTicket,
	)

	const [form] = Form.useForm()
	const [subject] = useState('')
	const [message] = useState('')

	// const uploadFile = (values) => {
	// 	console.log('file values', values.file)
	// 	const data = new FormData()
	// 	data.append('picture-file', values.file?.originFileObj)
	// 	return data
	// }

	useEffect(() => {
		if (status === 'success')
			return setTimeout(() => {
				dispatch(addNewTicketInit()) && history.push('/ticketing')
			}, 2000)
	}, [dispatch, history, status])

	const handleSubmit = (values) => {
		const addIssue = {
			subject: values.subject,
			message: values.message,
			//picture: values.picture,
		}
		dispatch(openNewTicket({ ...addIssue, sender: firstname + ' ' + lastname }))

		console.log('addIssue :', addIssue)
		//console.log('value type', values.picture)
	}

	console.log('Data formulaire', form.getFieldValue())

	return (
		<>
			<H2 style={{ padding: '10px' }}>Ajouter un ticket</H2>
			<Container style={{ width: '50%', margin: '0 auto' }}>
				{status && (
					<Centered style={{ paddingBottom: '30px' }}>
						<Alert
							message={addMessage}
							type={status === 'success' ? 'success' : 'error'}
							showIcon
						/>
					</Centered>
				)}

				<CustomDivider />
				<Centered>
					<Form
						layout="vertical"
						form={form}
						onFinish={handleSubmit}
						autoComplete="off"
						style={{ paddingTop: '10px', width: '100%' }}
					>
						<Form.Item
							name="subject"
							label="Sujet"
							rules={[
								{
									required: true,
									message: 'Champ requis, 10 caractères minimum',
									min: 10,
									max: 500,
								},
							]}
						>
							<Input name="subject" value={subject} />
						</Form.Item>

						{/* 
					<Form.Item
						name="picture"
						label="Capture d'écran (facultatif)"
						extra="seul les extensions png, jpeg, jpg sont autorisées"
					>
						<Upload
							maxCount={1}
							listType="picture"
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							onChange={uploadFile}
						>
							<Btn style={{ padding: '5px' }} onChange={uploadFile}>
								Choissez votre image
							</Btn>
						</Upload>
					</Form.Item> */}

						<Form.Item
							name="message"
							label="Description"
							rules={[
								{
									required: true,
									message: 'Champ requis, 10 caractères minimum',
									min: 10,
									max: 500,
								},
							]}
						>
							<Input.TextArea
								name="message"
								value={message}
								maxLength="500"
								showCount
							/>
						</Form.Item>
						{isLoading ? (
							<Centered>
								<Spin />
							</Centered>
						) : (
							<Btn
								style={{ padding: '0.5rem', width: '100%' }}
								htmlType="submit"
							>
								Enregistrer
							</Btn>
						)}
					</Form>
				</Centered>
			</Container>
		</>
	)
}

export default AddTicket
