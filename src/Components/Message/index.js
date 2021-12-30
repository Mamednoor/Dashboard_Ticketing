import styled from 'styled-components'

export const Message = styled.p`
  padding: 1rem;
  width: 65%;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: ${(props) => props.theme.text};
  transition: color ${(props) => props.theme.transitionTime};
`
