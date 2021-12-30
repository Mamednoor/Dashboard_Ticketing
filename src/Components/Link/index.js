import styled from 'styled-components'

import { Link } from 'react-router-dom'

export const CustomLink = styled(Link)`
  color: ${(props) => props.theme.links};
  transition: color ${(props) => props.theme.transitionTime};
  &:hover {
    color: ##1890ff;
  }
`
