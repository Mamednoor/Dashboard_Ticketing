import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

export const Spinner = () => <Spin indicator={antIcon} />
