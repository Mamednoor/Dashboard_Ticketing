import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

const Container = styled(Breadcrumb)`
	padding: 20px 0 20px 0;
	span {
		color: ${(props) => props.theme.text};
	}
	a {
		color: ${(props) => props.theme.links};
		transition: color ${(props) => props.theme.transitionTime};
		&:hover {
			color: #17a2b8;
		}
	}
	span:last-child a {
		color: ${(props) => props.theme.links};
	}
	span:last-child .ant-breadcrumb-separator {
		display: none;
	}
`

const Item = styled(Breadcrumb.Item)`
	padding: 0 8px;
`

export const BreadcrumbComponent = ({ items }) => {
	return (
		<Container>
			<Item>
				<Link to="/home">Acceuil</Link>
			</Item>
			{items?.map((item, i) => (
				<Item key={item.name}>
					{item.path ? <Link to={item.path}>{item.name}</Link> : item.name}
				</Item>
			))}
		</Container>
	)
}
