import styled from 'styled-components'
import { Divider } from 'antd'

export const CustomDivider = styled(Divider)`
  background: ${(props) => props.theme.borderColor};
  margin: 0px;
`
