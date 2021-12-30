import React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'

const { Footer } = Layout

export const LayoutFooter = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Copyright &copy; {new Date().getFullYear()}
    </Footer>
  )
}
