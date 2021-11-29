import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table as AntTable, Tag, Space } from 'antd'

import { P } from '../../../Components/P'

import formatDate from '../../../utils'
import { UpdateStatus } from './ActionsButton'

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
		width: '10%',
		render: (status) => (
			<>
				{status === 'En Attente' && (
					<Tag color="geekblue" key={status} style={{ fontWeight: 'bold' }}>
						{status}
					</Tag>
				)}
				{status === 'En Cours' && (
					<Tag color="green" key={status} style={{ fontWeight: 'bold' }}>
						{status}
					</Tag>
				)}
				{status === 'Fermé' && (
					<Tag color="volcano" key={status} style={{ fontWeight: 'bold' }}>
						{status}
					</Tag>
				)}
			</>
		),
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
		title: 'Date de création',
		dataIndex: 'createdOn',
		key: 'createdOn',
		width: '15%',
		render: (date) => <P>{formatDate(date)}</P>,
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
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		width: '15%',
		render: (status) => (
			<>
				{status === 'En Attente' && (
					<Tag color="geekblue" key={status} style={{ fontWeight: 'bold' }}>
						{status}
					</Tag>
				)}
				{status === 'En Cours' && (
					<Tag color="green" key={status} style={{ fontWeight: 'bold' }}>
						{status}
					</Tag>
				)}
				{status === 'Fermé' && (
					<Tag color="volcano" key={status} style={{ fontWeight: 'bold' }}>
						{status}
					</Tag>
				)}
			</>
		),
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
		title: 'Date de création',
		dataIndex: 'createdOn',
		key: 'createdOn',
		width: '15%',
		render: (date) => <P>{formatDate(date)}</P>,
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
