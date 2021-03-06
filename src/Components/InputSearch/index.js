import React from 'react'
import { useDispatch } from 'react-redux'
import { searchingTicket } from '../../Pages/Ticketing/Tickets/ticketsActions'
import { searchingUser } from '../../Pages/UsersList/usersListActions'
import styled from 'styled-components'
import { Input } from 'antd'

const InputSearch = styled(Input.Search)`
  width: 550px;
  margin: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 300px;
    margin: 0px;
    padding: 0px;
  }
`

export const SearchFieldTicket = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { value } = e.target
    dispatch(searchingTicket(value))
  }
  return (
    <>
      <InputSearch
        placeholder="Rechercher..."
        name="search"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}

export const SearchFieldUser = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { value } = e.target
    dispatch(searchingUser(value))
  }
  return (
    <>
      <InputSearch
        placeholder="Rechercher..."
        name="search"
        size="large"
        onChange={handleChange}
      />
    </>
  )
}
