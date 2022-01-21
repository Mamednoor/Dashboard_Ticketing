import React from 'react'
import PropTypes from 'prop-types'

import { P } from '../P'
import { Flex } from '../Flex'

import { Tag } from 'antd'

function TicketCount({ tickets }) {
  const pendingTicket = tickets?.filter(
    // eslint-disable-next-line eqeqeq
    (ticket) => ticket?.status == 'En Attente',
  )
  const inProgressTicket = tickets?.filter(
    // eslint-disable-next-line eqeqeq
    (ticket) => ticket?.status == 'En Cours',
  )
  // eslint-disable-next-line eqeqeq
  const closeTicket = tickets?.filter((ticket) => ticket?.status == 'Fermé')

  return (
    <Flex
      style={{
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      <P style={{ fontWeight: 'bold' }}>
        <Tag>Nombre de tickets total: {tickets?.length}</Tag>
      </P>
      <P style={{ fontWeight: 'bold' }}>
        <Tag color="geekblue">
          Nombre de tickets en attente: {pendingTicket?.length}
        </Tag>
      </P>
      <P style={{ fontWeight: 'bold' }}>
        <Tag color="green">
          Nombre de tickets en cours: {inProgressTicket?.length}
        </Tag>
      </P>
      <P style={{ fontWeight: 'bold' }}>
        <Tag color="volcano">
          Nombre de tickets en fermé: {closeTicket?.length}
        </Tag>
      </P>
    </Flex>
  )
}
export default TicketCount

TicketCount.propTypes = {
  tickets: PropTypes.array.isRequired,
}
