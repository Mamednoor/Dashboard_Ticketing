import React from 'react'
import PropTypes from 'prop-types'

import { P } from '../../../../Components/P'
import { ContentBody } from '../../../../Components/ContentBody'
import { Message } from '../../../../Components/Message'
import formatDate from '../../../../utils'
import { Flex } from '../../../../Components/Flex'

function MessageHistory({ message }) {
  if (!message) return null
  return message.map((mess) => (
    <ContentBody key={mess._id}>
      <Flex>
        <P style={{ display: 'flex', flexDirection: 'column' }}>
          <span>{mess?.sender}</span>
          <span>{formatDate(mess?.msgAt)}</span>
        </P>
      </Flex>
      <Message>{mess?.message}</Message>
    </ContentBody>
  ))
}

export default MessageHistory

MessageHistory.propTypes = {
  message: PropTypes.array.isRequired,
}
