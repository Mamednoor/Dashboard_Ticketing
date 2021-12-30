import { Space } from 'antd'
import styled, { css } from 'styled-components'

const justifyContentCSS = css`
  justify-content: ${(props) => props.$justifyContent};
`

const fullWidthCSS = css`
  width: 100%;
`
const toRight = css`
  margin-left: auto;
`

const CustomSpace = styled(Space)`
  ${(props) => (props.$justifyContent ? justifyContentCSS : '')};
  ${(props) => (props.$full ? fullWidthCSS : '')};
  .ant-space-item:first-child {
    ${(props) => (props.$toright ? toRight : '')};
  }
`

export default CustomSpace
