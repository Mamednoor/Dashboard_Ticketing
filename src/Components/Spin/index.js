import { Spin as AntSpin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

export const Spin = () => <AntSpin indicator={antIcon} />
