import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { replyTicketMessage, replyMessage } from '../ticketsActions'

import { Form, Input } from 'antd'
import { FormItem } from '../../../../Components/FormItem'
import { Btn } from '../../../../Components/Button'
import { Flex } from '../../../../Components/Flex'
import { P } from '../../../../Components/P'

function ReplyTicket({ ticketID }) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { firstname, lastname, isAdmin } = useSelector(
    (state) => state.user.user,
  )
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  const handleSubmit = () => {
    const issueObjt = {
      sender: `${firstname} ${lastname}`,
      message,
    }
    if (isAdmin === true) {
      dispatch(replyMessage(ticketID, issueObjt))
    }
    if (isAdmin === false) {
      dispatch(replyTicketMessage(ticketID, issueObjt))
    }
  }
  return (
    <Form layout="horizontal" size="large" form={form} onFinish={handleSubmit}>
      <Flex style={{ alignItems: 'flex-start' }}>
        <P>Veuillez écrire votre réponse dans le champs ci-dessous</P>
      </Flex>
      <FormItem
        name="message"
        rules={[
          {
            required: true,
            message: 'Champ requis, 10 caractères minimum',
            min: 10,
            max: 500,
          },
        ]}
      >
        <Input.TextArea
          style={{ width: '45vw' }}
          maxLength="500"
          value={message}
          onChange={handleChange}
          placeholder="Réponse"
          showCount
        />
      </FormItem>
      <Flex style={{ justifyContent: 'flex-start' }}>
        <Btn
          style={{
            padding: '0.5rem 0.5rem',
            marginTop: '15px',
            marginBottom: '15px',
          }}
          htmlType="submit"
        >
          Envoyer
        </Btn>
      </Flex>
    </Form>
  )
}

export default ReplyTicket

ReplyTicket.propTypes = {
  ticketID: PropTypes.string.isRequired,
}
