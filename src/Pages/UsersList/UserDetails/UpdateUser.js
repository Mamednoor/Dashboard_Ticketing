import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { fetchUserInfo } from '../usersListActions'
import { updateProfilbyAdmin } from './updateUserActions'
import { profilUpdateInit } from './updateUserSlice'

import { Alert, Checkbox, Form, Input, message as ANTDmessage } from 'antd'
import { Btn } from '../../../Components/Button'
import { Centered } from '../../../Components/Centered'
import { ContentHeader } from '../../../Components/ContentHeader'
import { Flex } from '../../../Components/Flex'
import { FormItem } from '../../../Components/FormItem'
import { Spin } from '../../../Components/Spin'
import Space from '../../../Components/Space'

const layout = {
  layout: 'horizontal',
  labelAlign: 'left',
  labelCol: { span: 9 },
}

const VerificationError = {
  isPhoneLenthy: true,
  isPhoneValide: true,
}

function UpdateUser() {
  const { userID } = useParams()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [validationError, setValidationError] = useState(VerificationError)

  const { isLoading, userselected } = useSelector((state) => state.userList)

  const { condition } = useSelector((state) => state.profilUpdate)

  useEffect(() => {
    dispatch(fetchUserInfo(userID))
    if (condition === 'success') {
      return setTimeout(() => {
        dispatch(profilUpdateInit()) && window.location.reload()
      }, 2000)
    }
  }, [dispatch, condition, userID])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'newPhone') {
      const isPhoneLenthy = value.length === 10
      const isPhoneValide = /^(0[6-7])(?:[ _.-]?(\d{2})){4}$/.test(value)
      setValidationError({
        ...validationError,
        isPhoneLenthy,
        isPhoneValide,
      })
    }
  }

  const onFinishFailed = () => {
    ANTDmessage.error(
      "Des informations sont manquantes ou n'ont pas été validés, seul les numéros mobiles commençant par 06 ou 07 sont acceptés",
    )
  }

  const handleSubmit = (values) => {
    dispatch(
      updateProfilbyAdmin({
        _id: userID,
        newFirstname: values.newFirstname,
        newLastname: values.newLastname,
        newCompany: values.newCompany,
        newAddress: values.newAddress,
        newPhone: values.newPhone,
        newEmail: values.newEmail,
        newisAdmin: values.newisAdmin,
        newisVerified: values.newisVerified,
      }),
    )
  }

  return (
    <>
      <ContentHeader
        breadcrumbItems={[
          {
            name: 'Dashboard',
            path: '/dashboard',
          },
          {
            name: 'Liste des utilisateurs',
            path: `/userslist`,
          },
          {
            name: `Profil de ${userselected?.firstname} ${userselected?.lastname}`,
            path: `/user/${userID}`,
          },
          {
            name: "Modification de l'utilisateur",
          },
        ]}
      />

      <Centered style={{ paddingTop: '30px' }}>
        {condition === 'error' && (
          <Alert
            message="Ooops... Une erreur est survenue"
            description="Les caractères spéciaux ne sont pas autorisé dans vos noms et prénoms"
            type="error"
            showIcon
          />
        )}

        {condition === 'success' && (
          <Alert
            message="La modification a été effectuée"
            type="success"
            showIcon
          />
        )}
      </Centered>

      {isLoading ? (
        <Centered>
          <Spin />
        </Centered>
      ) : (
        <Centered style={{ paddingTop: ' 80px' }}>
          <Space>
            <Flex style={{ padding: '40px', border: '1px solid' }}>
              <Form
                style={{ width: '500px' }}
                autoComplete="off"
                onFinish={handleSubmit}
                form={form}
                onFinishFailed={onFinishFailed}
                {...layout}
                initialValues={{
                  newFirstname: userselected?.firstname,
                  newLastname: userselected?.lastname,
                  newEmail: userselected?.email,
                  newPhone: userselected?.phone,
                  newCompany: userselected?.company,
                  newAddress: userselected?.address,
                  newisAdmin: userselected?.isAdmin,
                  newisVerified: userselected?.isVerified,
                }}
              >
                <FormItem
                  name="newFirstname"
                  label="Prénom"
                  rules={[
                    {
                      required: true,
                      message:
                        'Veuillez renseigner un prénom avec au minimum 4 caractères et 30 maximun',
                      min: 4,
                      max: 30,
                    },
                  ]}
                >
                  <Input name="newFirstname" placeholder="Prénom" />
                </FormItem>

                <FormItem
                  name="newLastname"
                  label="Nom"
                  rules={[
                    {
                      required: true,
                      message:
                        'Veuillez renseigner un nom avec au minimum 4 caractères et 30 maximun',
                      min: 2,
                      max: 30,
                    },
                  ]}
                >
                  <Input name="newLastname" placeholder="Nom" />
                </FormItem>

                <FormItem
                  name="newCompany"
                  label="Société"
                  rules={[
                    {
                      required: true,
                      message:
                        'Veuillez renseigner votre société au minimum 3 caractères et 50 maximun',
                      min: 3,
                      max: 50,
                    },
                  ]}
                >
                  <Input name="newCompany" placeholder="Société" />
                </FormItem>

                <FormItem
                  name="newAddress"
                  label="Adresse"
                  rules={[
                    {
                      required: true,
                      message: 'Veuillez renseigner une adresse',
                    },
                  ]}
                >
                  <Input.TextArea
                    name="newAddress"
                    placeholder="Adresse de la société"
                  />
                </FormItem>

                <FormItem
                  name="newPhone"
                  label="Mobile"
                  disabled
                  rules={[
                    {
                      required: true,
                      message: 'Veuillez renseigner un numéro valide',
                      min: 10,
                    },
                  ]}
                  onChange={handleChange}
                >
                  <Input name="newPhone" placeholder="Numéro de téléphone" />
                </FormItem>

                <FormItem
                  name="newEmail"
                  label="Adresse Mail"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                    },
                  ]}
                >
                  <Input name="newEmail" placeholder="Email" />
                </FormItem>
                <FormItem
                  name="newisAdmin"
                  label="Admin"
                  valuePropName="checked"
                >
                  <Checkbox name="newisAdmin" />
                </FormItem>
                <FormItem
                  name="newisVerified"
                  label="Compte validé"
                  valuePropName="checked"
                >
                  <Checkbox name="newisVerified" />
                </FormItem>

                {Object.values(validationError).every(
                  (item) => item === true,
                ) ? (
                  isLoading ? (
                    <Centered>
                      <Spin />
                    </Centered>
                  ) : (
                    <Btn
                      type="submit"
                      style={{
                        padding: '0.5rem 1rem',
                        width: '100%',
                        marginTop: '15px',
                      }}
                    >
                      Modifier
                    </Btn>
                  )
                ) : isLoading ? (
                  <Centered>
                    <Spin />
                  </Centered>
                ) : (
                  <Btn
                    type="button"
                    style={{
                      padding: '0.5rem 1rem',
                      width: '100%',
                      marginTop: '15px',
                    }}
                    onClick={() => onFinishFailed()}
                  >
                    Modifier
                  </Btn>
                )}
              </Form>
            </Flex>
          </Space>
        </Centered>
      )}
    </>
  )
}

export default UpdateUser
