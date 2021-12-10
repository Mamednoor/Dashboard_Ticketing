import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table as AntTable, Space } from 'antd'

import formatDate from '../../../utils'
import { UpdateStatus } from './ActionsButton'
import { PriorityTag, StatusTag } from '../../../Components/Tag'

const Admincolumns = [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
		width: '15%',
	},
	{
		title: 'Sujets',
		dataIndex: 'subject',
		key: '_id',
		render: (subject, tickets) => (
			<Link to={`/ticket/${tickets._id}`}>{subject}</Link>
		),
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (status) => <StatusTag status={status} />,
		filters: [
			{
				text: 'En Attente',
				value: 'En Attente',
			},
			{
				text: 'En Cours',
				value: 'En Cours',
			},
			{
				text: 'Fermé',
				value: 'Fermé',
			},
		],
		filterMultiple: false,
		onFilter: (value, record) => {
			return record.status === value
		},
	},
	{
		title: 'Priorité',
		dataIndex: 'priority',
		key: 'priority',
		render: (priority) => <PriorityTag priority={priority} />,
		filters: [
			{
				text: 'Basse',
				value: 'Basse',
			},
			{
				text: 'Normal',
				value: 'Normal',
			},
			{
				text: 'Haute',
				value: 'Haute',
			},
		],
		filterMultiple: false,
		onFilter: (value, record) => {
			return record.priority === value
		},
	},
	{
		title: 'Date de création',
		dataIndex: 'createdOn',
		key: 'createdOn',
		width: '15%',
		render: (date) => <>{formatDate(date)}</>,
	},
	{
		title: 'Actions',
		dataIndex: '_id',
		key: '_id',
		width: '25%',
		render: (_id) => (
			<Space size="middle">
				<UpdateStatus ticketID={_id} />
			</Space>
		),
	},
]

const columns = [
	{
		title: 'Sujets',
		dataIndex: 'subject',
		key: '_id',
		width: '25%',
		render: (subject, tickets, _id) => (
			<Link to={`/ticket/${tickets._id}`}>{subject}</Link>
		),
	},
	{
		title: 'Statut',
		dataIndex: 'status',
		key: 'status',
		width: '15%',
		render: (status) => <StatusTag status={status} />,
		filters: [
			{
				text: 'En Attente',
				value: 'En Attente',
				color: 'volcano',
			},
			{
				text: 'En Cours',
				value: 'En Cours',
			},
			{
				text: 'Fermé',
				value: 'Fermé',
			},
		],
		filterMultiple: false,
		onFilter: (value, record) => {
			return record.status === value
		},
	},
	{
		title: 'Priorité',
		dataIndex: 'priority',
		key: 'priority',
		width: '10%',
		render: (priority) => <PriorityTag priority={priority} />,
		filters: [
			{
				text: 'Basse',
				value: 'Basse',
			},
			{
				text: 'Normal',
				value: 'Normal',
			},
			{
				text: 'Haute',
				value: 'Haute',
			},
		],
		filterMultiple: false,
		onFilter: (value, record) => {
			return record.priority === value
		},
	},
	{
		title: 'Date de création',
		dataIndex: 'createdOn',
		key: 'createdOn',
		width: '15%',
		render: (date) => <>{formatDate(date)}</>,
	},
]

function Table() {
	const { searchTerm } = useSelector((state) => state.tickets)
	const { isAdmin } = useSelector((state) => state.user.user)

	return (
		<>
			{isAdmin === true ? (
				<AntTable
					rowKey="_id"
					columns={Admincolumns}
					dataSource={searchTerm}
					bordered
					pagination={{ position: ['bottomCenter'] }}
				/>
			) : (
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

export default Table
