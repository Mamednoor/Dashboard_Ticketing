import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import { LayoutHeader } from './LayoutHeader'
import { LayoutSider } from './LayoutSider'
import { LayoutFooter } from './LayoutFooter'

import 'antd/dist/antd.css'

const { Content } = Layout

export const MainLayout = ({ children, keyPath }) => {
  return (
    <Layout>
      <LayoutSider keyPath={keyPath} />
      <Layout>
        <LayoutHeader />
        <Content
          style={{
            minHeight: '83vh',
            margin: '24px 16px 0',
            overflow: 'initial',
            background: '#fff',
          }}
        >
          {children}
        </Content>
        <LayoutFooter />
      </Layout>
    </Layout>
  )
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  keyPath: PropTypes.string,
}
