import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table as AntTable, /*Tag,*/ Space } from 'antd'

import { P } from '../../../Components/P'

import formatDate from '../../../utils'
import { UpdateStatus } from './ActionsButton'

const columns = [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
		width: '25%',
	},
	{
		title: 'Sujets',
		dataIndex: 'subject',
		key: '_id',
		render: (subject, tickets, _id) => (
			<Link to={`/ticket/${tickets._id}`}>{subject}</Link>
		),
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		width: '10%',
	},
	{
		title: 'Date de création',
		dataIndex: 'createdOn',
		key: 'createdOn',
		width: '10%',
		render: (date) => <P>{formatDate(date)}</P>,
	},
	// {
	// 	title: 'Tags',
	// 	key: 'tags',
	// 	dataIndex: 'tags',
	// 	width: '20%',
	// 	render: (tags) => (
	// 		<>
	// 			{tags.map((tag) => {
	// 				let color = tag.length > 5 ? 'geekblue' : 'green'
	// 				if (tag === 'loser') {
	// 					color = 'volcano'
	// 				}
	// 				return (
	// 					<Tag color={color} key={tag}>
	// 						{tag.toUpperCase()}
	// 					</Tag>
	// 				)
	// 			})}
	// 		</>
	// 	),
	// },
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

function Table() {
	const { searchTerm } = useSelector((state) => state.tickets)

	console.log('search term', searchTerm)
	return (
		<AntTable
			dispatch
			columns={columns}
			dataSource={searchTerm}
			bordered
			pagination={{ position: ['bottomCenter'] }}
		/>
	)
}

export default Table
