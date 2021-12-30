/* eslint-disable no-async-promise-executor */
import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

// Ticket Part

export const getUserTickets = () => {
  const URL = `${baseURL}/tickets/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')

      const result = await axios.get(URL, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const getTicketDetails = (_id) => {
  const URL = `${baseURL}/tickets/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')
      const result = await axios.get(URL + _id, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const openNewIssue = (formData) => {
  const URL = `${baseURL}/tickets/add-ticket`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')
      const result = await axios.post(URL, formData, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result.data)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const updateTicketMessage = (ticketID, issueObjt) => {
  const URL = `${baseURL}/tickets/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')
      const result = await axios.put(URL + ticketID, issueObjt, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result.data)
    } catch (error) {
      reject(error.message)
    }
  })
}

// Registration Part

export const registrationUser = (formData) => {
  const URL = `${baseURL}/users/`
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(URL, formData)

      resolve(res.data)

      if (res.data.status === 'success') {
        resolve(res.data)
      }
    } catch (error) {
      reject(error.message)
    }
  })
}

// Accounte verification Part

export const UserVerificationAccount = (formData) => {
  const URL = `${baseURL}/users/validation/`
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(URL, formData)

      resolve(res.data)
      if (res.data.status === 'success') {
        resolve(res.data)
      }
    } catch (error) {
      reject({ status: 'error', message: error.error })
    }
  })
}

// User Part

export const userLogin = (loginData) => {
  const URL = `${baseURL}/users/login`
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(URL, loginData)
      if (res.data.status === 'success') {
        sessionStorage.setItem('accessToken', res.data.accessToken)
        sessionStorage.setItem('refreshToken', res.data.refreshToken)

        localStorage.setItem(
          'refreshToken',
          JSON.stringify({ refreshToken: res.data.refreshToken }),
        )
        localStorage.setItem(
          'accessToken',
          JSON.stringify({ accessToken: res.data.accessToken }),
        )
      }
      resolve(res.data)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const fetchUser = () => {
  const URL = `${baseURL}/users/profil/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')

      if (!accessToken) {
        reject("Une erreur lors de l'authentification est survenue")
      }
      const res = await axios.get(URL, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(res.data)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const userLogout = async () => {
  const URL = `${baseURL}/users/logout`

  const logInfo = [
    sessionStorage.removeItem('accessToken'),
    sessionStorage.removeItem('refreshToken'),
    localStorage.removeItem('accessToken'),
    localStorage.removeItem('refreshToken'),
  ]

  try {
    await axios.delete(URL, {
      headers: { Authorization: [...logInfo] },
    })
  } catch (error) {
    console.log(error)
  }
}

export const refreshAccessToken = () => {
  const URL = `${baseURL}/tokens`
  return new Promise(async (resolve, reject) => {
    try {
      const { refreshToken } = JSON.parse(localStorage.getItem('refreshToken'))

      if (!refreshToken) {
        reject("Une erreur lors de l'authentification est survenue")
      }
      const res = await axios.get(URL, {
        headers: {
          Authorization: refreshToken,
        },
      })

      if (res.data.status === 'success') {
        sessionStorage.setItem('accessToken', res.data.accessToken)
      }
      resolve(true)
    } catch (error) {
      // suppression de refreshToken si la valeur est mauvaise
      if (error.message === 'Request failed with status code 403') {
        localStorage.removeItem('refreshToken')
        sessionStorage.removeItem('refreshToken')
      }
      reject(false)
    }
  })
}

export const profilUpdate = (_id) => {
  const URL = `${baseURL}/users/profil/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')
      const result = await axios.patch(
        URL + _id._id,
        {
          newFirstname: _id.newFirstname,
          newLastname: _id.newLastname,
          newCompany: _id.newCompany,
          newAddress: _id.newAddress,
          newPhone: _id.newPhone,
          newEmail: _id.newEmail,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      resolve(result.data)
    } catch (error) {
      reject(error.message)
    }
  })
}

// Password Part

export const resetPasswordRequest = (email) => {
  const URL = `${baseURL}/users/forget-password`
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(URL, { email })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export const updatePasswordRequest = (formData) => {
  const URL = `${baseURL}/users/reset-password`
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(URL, formData)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

// ADMIN

export const createNewUser = (formData) => {
  const URL = `${baseURL}/users/create-user`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')

      const result = await axios.post(URL, formData, {
        headers: {
          Authorization: accessToken,
        },
      })

      resolve(result.data)

      if (result.data.status === 'success') {
        resolve(result.data)
      }
    } catch (error) {
      reject(error.message)
    }
  })
}

export const getAllTickets = () => {
  const URL = `${baseURL}/tickets/all/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')

      const result = await axios.get(URL, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const TicketDetails = (_id) => {
  const URL = `${baseURL}/tickets/all/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')
      const result = await axios.get(URL + _id, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const ReplyMessage = (ticketID, issueObjt) => {
  const URL = `${baseURL}/tickets/all/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')
      const result = await axios.put(URL + ticketID, issueObjt, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result.data)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const closeTicket = (ticketID, _id, isAdmin, status) => {
  const URL = `${baseURL}/tickets/close-ticket/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')
      const result = await axios.patch(URL + ticketID, status, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const progressTicket = (ticketID, _id, isAdmin, status) => {
  const URL = `${baseURL}/tickets/inprogress-ticket/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')

      const result = await axios.patch(URL + ticketID, status, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

// eslint-disable-next-line no-unused-vars
export const deleteTicket = (ticketID, _id, isAdmin) => {
  const URL = `${baseURL}/tickets/delete/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')

      const result = await axios.delete(URL + ticketID, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const getUsersList = () => {
  const URL = `${baseURL}/users/user-list/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')

      const result = await axios.get(URL, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const getUserDetails = (_id) => {
  const URL = `${baseURL}/users/user-details/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')
      const result = await axios.get(URL + _id, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

export const userUpdatedByAdmin = (_id) => {
  const URL = `${baseURL}/users/update-user/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')
      const result = await axios.patch(
        URL + _id._id,
        {
          newFirstname: _id.newFirstname,
          newLastname: _id.newLastname,
          newCompany: _id.newCompany,
          newAddress: _id.newAddress,
          newPhone: _id.newPhone,
          newEmail: _id.newEmail,
          newisAdmin: _id.newisAdmin,
          newisVerified: _id.newisVerified,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      resolve(result.data)
    } catch (error) {
      reject(error.message)
    }
  })
}

// eslint-disable-next-line no-unused-vars
export const deleteUser = (userID, _id) => {
  const URL = `${baseURL}/users/delete-user/`
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken')

      const result = await axios.delete(URL + userID, {
        headers: {
          Authorization: accessToken,
        },
      })
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}
