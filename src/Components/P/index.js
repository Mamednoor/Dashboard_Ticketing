import styled from 'styled-components'

export const P = styled.p`
	color: ${(props) => props.theme.text};
	transition: color ${(props) => props.theme.transitionTime};
	line-height: 1rem;
	font-size: 1rem;
`
