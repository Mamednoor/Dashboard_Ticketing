import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllUsers } from './usersListActions'
import { UserMessageInit } from './usersListSlice'

import { Alert } from 'antd'

import { Centered } from '../../Components/Centered'
import { SearchFieldUser } from '../../Components/InputSearch'
import UserCount from '../../Components/UserCount'
import UserTable from './UserTable'
import { ContentHeader } from '../../Components/ContentHeader'
import { Link } from 'react-router-dom'
import { Btn } from '../../Components/Button'
import Space from '../../Components/Space'

function UserList() {
  const dispatch = useDispatch()
  const { usersList, searchTerm, deleting } = useSelector(
    (state) => state.userList,
  )

  useEffect(() => {
    dispatch(fetchAllUsers())

    if (deleting)
      return setTimeout(() => {
        dispatch(UserMessageInit())
      }, 2000)
  }, [deleting, dispatch])

  return (
    <>
      <ContentHeader
        breadcrumbItems={[
          {
            name: 'Dashboard',
            path: `/dashboard`,
          },
          {
            name: 'Liste des utilisateurs',
          },
        ]}
      />

      {deleting && (
        <Centered style={{ paddingTop: '10px' }}>
          <Alert
            message="L'utilisateur à été supprimé, cette action est irréversible"
            type="error"
            showIcon
          />
        </Centered>
      )}
      <Space style={{ flexWrap: 'wrap' }}>
        <SearchFieldUser />
        <Link to="/adduser">
          <Btn style={{ padding: '0.5rem 1rem' }}>
            Ajouter un nouvel utilisateur
          </Btn>
        </Link>
      </Space>
      <UserCount usersList={usersList} />
      <UserTable searchTerm={searchTerm} />
    </>
  )
}

export default UserList
