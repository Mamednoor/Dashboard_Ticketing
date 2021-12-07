import styled from 'styled-components'

import { Card } from 'antd'

export const ContentCard = styled(Card)`
	margin: 0 auto;
	.ant-card-body {
		border-radius: 0.25rem;
		overflow: auto;
		height: 30rem;
		width: 1400px;
		@media (max-width: 768px) {
			overflow: unset;
			height: auto;
			width: 350px;
		}
	}
	line-height: 1.5;
	font-size: 1.1rem;
	font-family: 'Roboto', sans-serif;
	font-weight: 300;
	transition: all ${(props) => props.theme.transitionTime};
`

export const CenteringCard = styled(Card)`
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(218, 218, 236, 0.33);
	.ant-card-body {
		background: white;
		border-radius: 0.25rem;
		box-shadow: 0px 0px 15px -5px ${(props) => props.theme.Shadow};
	}
	line-height: 1.5;
	font-size: 1.1rem;
	font-family: 'Roboto', sans-serif;
	font-weight: 300;
	background-color: ${(props) => props.theme.bodyBg};
	transition: all ${(props) => props.theme.transitionTime};
`
export const UserCard = styled(Card)`
	display: flex;
	flex-direction: column;
	width: 450px;
	margin: 15px;
	border: 1px solid black;
`
