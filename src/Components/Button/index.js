import styled from 'styled-components'

export const Btn = styled.button`
	background: ${(props) => props.theme.Btn};
	cursor: pointer;
	transition: color ${(props) => props.theme.transitionTime};
	transition: background ${(props) => props.theme.transitionTime};
	color: white;
	border-radius: 0.25rem;
	border: 0px;
	&:hover {
		background: ${(props) => props.theme.BtnHov};
	}
`
