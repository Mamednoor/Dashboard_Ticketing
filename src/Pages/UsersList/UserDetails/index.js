import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { fetchUserInfo } from '../usersListActions'
import { fetchAllTickets } from '../../Ticketing/Tickets/ticketsActions'

import { Alert, Tag } from 'antd'

import { P } from '../../../Components/P'
import { UserCard } from '../../../Components/Card'
import { Centered } from '../../../Components/Centered'
import { Spin } from '../../../Components/Spin'
import { Flex } from '../../../Components/Flex'
import { ContentHeader } from '../../../Components/ContentHeader'
import formatDate from '../../../utils'
import { Wrapper } from '../../../Components/Wrapper'
import Space from '../../../Components/Space'

ChartJS.register(ArcElement, Tooltip, Legend)

function UserDetails() {
  const { userID } = useParams()
  const dispatch = useDispatch()

  const { tickets } = useSelector((state) => state.tickets)
  const { isLoading, error, userselected } = useSelector(
    (state) => state.userList,
  )

  useEffect(() => {
    dispatch(fetchUserInfo(userID))
    dispatch(fetchAllTickets())
  }, [dispatch, userID])

  const TotalUserTickets = tickets?.filter(
    // eslint-disable-next-line eqeqeq
    (elm) => elm?.clientId == userID,
  )

  const TotalUserInProgressTickets = tickets?.filter(
    // eslint-disable-next-line eqeqeq
    (elm) => elm?.clientId == userID && elm?.status == 'En Cours',
  )

  const TotalUserCloseTickets = tickets?.filter(
    // eslint-disable-next-line eqeqeq
    (elm) => elm?.clientId == userID && elm?.status == 'Fermé',
  )

  const TotalUserPendingTickets = tickets?.filter(
    // eslint-disable-next-line eqeqeq
    (elm) => elm?.clientId == userID && elm?.status == 'En Attente',
  )

  const dataTickets = {
    labels: ['En Attente', 'En Cours', 'Fermé'],
    datasets: [
      {
        label: 'Status des tickets',
        data: [
          TotalUserPendingTickets?.length,
          TotalUserInProgressTickets?.length,
          TotalUserCloseTickets?.length,
        ],
        backgroundColor: ['#f0f5ff', '#f6ffed', '#fff2e8'],
        borderColor: ['#adc6ff', '#b7eb8f', '#ffbb96'],
      },
    ],
  }

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
            path: `/userslist`,
          },
          {
            name: `Profil de ${userselected?.firstname} ${userselected?.lastname}`,
          },
        ]}
      />

      {error && (
        <Centered style={{ paddingTop: '10px' }}>
          <Alert
            message="Ooops... Une erreur est survenue, veuillez essayer ultérieurement"
            description={error}
            type="error"
            showIcon
          />
        </Centered>
      )}

      {isLoading ? (
        <Centered>
          <Spin />
        </Centered>
      ) : (
        <Centered
          style={{
            marginTop: '20vh',
            justifyContent: 'space-evenly',
          }}
        >
          <UserCard
            title={
              <Flex>
                <Tag
                  color={userselected?.isAdmin ? 'purple' : 'geekblue'}
                  key={userselected?.isAdmin}
                >
                  {userselected?.isAdmin ? 'Admin' : 'Utilisateur'}
                </Tag>

                <Tag
                  color={userselected?.isVerified ? 'green' : 'volcano'}
                  key={userselected?.isVerified}
                >
                  {userselected?.isVerified ? 'Validé' : 'En attente'}
                </Tag>
                <Link to={`/update-user/${userID}`} userselected={userselected}>
                  Modifier
                </Link>
              </Flex>
            }
          >
            <P>Prénom : {userselected?.firstname}</P>
            <P>Nom : {userselected?.lastname}</P>
            <P>Email : {userselected?.email}</P>
            <P>Téléphone : {userselected?.phone}</P>
            <P>Entreprise : {userselected?.company}</P>
            <P>Adresse : {userselected?.address}</P>
            <P>Crée le : {formatDate(userselected?.createdOn)}</P>
          </UserCard>
          <Space>
            <Wrapper>
              <P>Nombre total de ticket : {TotalUserTickets?.length}</P>
              <P>
                Nombre de ticket en cours : {TotalUserInProgressTickets?.length}
              </P>
              <P>Nombre de ticket fermé : {TotalUserCloseTickets?.length}</P>
              <P>
                Nombre de ticket en attente : {TotalUserPendingTickets?.length}
              </P>
            </Wrapper>
            <Wrapper style={{ width: '300px' }}>
              <Doughnut data={dataTickets} />
            </Wrapper>
          </Space>
        </Centered>
      )}
    </>
  )
}

export default UserDetails
