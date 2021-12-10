import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { openNewTicket } from './addTicketActions'
import { addNewTicketInit } from './addTicketSlice'

import { Form, Input, Alert, Select } from 'antd'
import { Btn } from '../../../Components/Button'
import { Centered } from '../../../Components/Centered'
import { ContentHeader } from '../../../Components/ContentHeader'
import { Flex } from '../../../Components/Flex'
import { FormItem } from '../../../Components/FormItem'
import { Spin } from '../../../Components/Spin'

const { Option } = Select

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
	const [priority] = useState('Normal')

	useEffect(() => {
		if (status === 'success')
			return setTimeout(() => {
				dispatch(addNewTicketInit()) && history.push('/ticketing')
			}, 2000)
	}, [dispatch, history, status])

	const handleSubmit = (values) => {
		const formData = {
			subject: values.subject,
			message: values.message,
			priority: values.priority,
		}
		console.log('formData', formData)
		dispatch(openNewTicket({ ...formData, sender: firstname + ' ' + lastname }))
	}

	return (
		<>
			<ContentHeader
				breadcrumbItems={[
					{
						name: 'Liste des tickets',
						path: `/ticketing`,
					},
					{
						name: 'Ajouter un ticket',
					},
				]}
			/>

			<Centered style={{ paddingTop: '30px' }}>
				{status && (
					<Alert
						message={
							status === 'success'
								? 'Opération réussie'
								: 'Ooops... Une erreur est survenue'
						}
						description={addMessage}
						type={status === 'success' ? 'success' : 'error'}
						showIcon
					/>
				)}
			</Centered>

			<Centered style={{ paddingTop: ' 120px' }}>
				<Flex style={{ padding: '50px', border: '1px solid' }}>
					<Form
						layout="vertical"
						form={form}
						onFinish={handleSubmit}
						autoComplete="off"
						style={{ width: '500px' }}
					>
						<FormItem
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
						</FormItem>

						<FormItem name="priority" label="Priorité">
							<Select defaultValue="Normal" value={priority}>
								<Option value="Basse">Basse</Option>
								<Option value="Normal">Normal</Option>
								<Option value="Haute">Haute</Option>
							</Select>
						</FormItem>

						<FormItem
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
								style={{ width: '500px' }}
							/>
						</FormItem>
						{isLoading ? (
							<Centered>
								<Spin />
							</Centered>
						) : (
							<Btn
								style={{
									padding: '0.5rem 1rem',
									width: '100%',
									marginTop: '25px',
								}}
								htmlType="submit"
							>
								Enregistrer
							</Btn>
						)}
					</Form>
				</Flex>
			</Centered>
		</>
	)
}

export default AddTicket
