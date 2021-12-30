import React from 'react'
import PropTypes from 'prop-types'

import { Tag } from 'antd'

import { P } from '../P'
import { Flex } from '../Flex'

function UserCount({ usersList }) {
  const verifiedUser = usersList?.filter((elm) => elm?.isVerified === true)
  const pendingUser = usersList?.filter((elm) => elm?.isVerified === false)

  return (
    <Flex
      style={{
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      <P style={{ fontWeight: 'bold' }}>
        <Tag>Nombre d‘utilisateur: {usersList?.length}</Tag>
      </P>
      <P style={{ fontWeight: 'bold' }}>
        <Tag color="green">
          Nombre d‘utilisateur validé: {verifiedUser?.length}
        </Tag>
      </P>
      <P style={{ fontWeight: 'bold' }}>
        <Tag color="volcano">
          Nombre d‘utilisateur en attente: {pendingUser?.length}
        </Tag>
      </P>
    </Flex>
  )
}
export default UserCount

UserCount.propTypes = {
  usersList: PropTypes.array.isRequired,
}
