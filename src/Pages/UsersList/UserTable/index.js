import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Table as AntTable, Tag } from 'antd'
import { Link } from 'react-router-dom'
import Space from '../../../Components/Space'

const columns = [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
		width: '25%',
	},
	{
		title: 'Nom',
		dataIndex: 'firstname',
		key: '_id',
		render: (firstname, usersList) => (
			<Link to={`/user/${usersList._id}`}>
				{firstname} {usersList?.lastname}
			</Link>
		),
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Téléphone',
		dataIndex: 'phone',
		key: 'phone',
	},
	{
		title: 'Status',
		dataIndex: 'isVerified',
		key: 'isVerified',
		render: (isVerified) => (
			<Tag color={isVerified ? 'green' : 'volcano'} key={isVerified}>
				{isVerified ? 'Validé' : 'En attente'}
			</Tag>
		),
		filters: [
			{
				text: 'Validé',
				value: true,
			},
			{
				text: 'En attente',
				value: false,
			},
		],
		filterMultiple: false,
		onFilter: (value, record) => {
			return record.isVerified === value
		},
	},
	{
		title: 'Rôle',
		dataIndex: 'isAdmin',
		key: 'isAdmin',
		render: (isAdmin) => (
			<Tag color={isAdmin ? 'purple' : 'geekblue'} key={isAdmin}>
				{isAdmin ? 'Admin' : 'Utilisateur'}
			</Tag>
		),
		filters: [
			{
				text: 'Admin',
				value: true,
			},
			{
				text: 'Utilisateur',
				value: false,
			},
		],
		filterMultiple: false,
		onFilter: (value, record) => {
			return record.isAdmin === value
		},
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record) => (
			<Space size="middle">
				<a href="!#">Invite {record.name}</a>
				<a href="!#">Delete</a>
			</Space>
		),
	},
]

function UserTable({ searchTerm }) {
	const { isAdmin } = useSelector((state) => state.user.user)
	return (
		<>
			{isAdmin && (
				<AntTable
					rowKey="_id"
					columns={columns}
					dataSource={searchTerm}
					bordered
					pagination={{ position: ['bottomCenter'] }}
				/>
			)}
		</>
	)
}

export default UserTable

UserTable.propTypes = {
	searchTerm: PropTypes.array.isRequired,
}
