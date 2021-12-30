/* eslint-disable no-async-promise-executor */
import { userUpdatedByAdmin } from '../../../api'
import {
  profilUpdatePending,
  profilUpdateSuccess,
  profilUpdateError,
} from './updateUserSlice'

export const updateProfilbyAdmin =
  (
    _id,
    newFirstname,
    newLastname,
    newCompany,
    newAddress,
    newPhone,
    newEmail,
    newisAdmin,
    newisVerified,
  ) =>
  async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(profilUpdatePending())
        const result = await userUpdatedByAdmin(
          _id,
          newFirstname,
          newLastname,
          newCompany,
          newAddress,
          newPhone,
          newEmail,
          newisAdmin,
          newisVerified,
        )
        if (result.status === 'error') {
          return dispatch(profilUpdateError(result.message))
        }
        dispatch(profilUpdateSuccess(result.message))
        resolve(result.message)
      } catch (error) {
        dispatch(profilUpdateError(error.message))
        reject(error)
      }
    })
  }
