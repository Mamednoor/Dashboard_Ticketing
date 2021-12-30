import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Space } from 'antd'

import { BreadcrumbComponent } from '../Breadcrumb'
import { CustomDivider } from '../Divider'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContentHeader = ({ breadcrumbItems = {} }) => (
  <Container>
    <Space direction="vertical" size="large">
      <BreadcrumbComponent items={breadcrumbItems} />
    </Space>
    <CustomDivider />
  </Container>
)

ContentHeader.propTypes = {
  breadcrumbItems: PropTypes.object.isRequired,
}
