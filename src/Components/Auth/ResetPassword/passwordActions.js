import {
  passwordResetPending,
  passwordResetSuccess,
  updatePasswordSuccess,
  passwordResetError,
} from './passwordSlice'

import { resetPasswordRequest, updatePasswordRequest } from '../../../api'

export const sendInitPassword = (email) => async (dispatch) => {
  try {
    dispatch(passwordResetPending())

    const { status, message } = await resetPasswordRequest(email)

    if (status === 'success') {
      return dispatch(passwordResetSuccess(message))
    }
    dispatch(passwordResetError(message))
  } catch (error) {
    dispatch(passwordResetError(error.message))
  }
}

export const updatePassword = (formData) => async (dispatch) => {
  try {
    dispatch(passwordResetPending())

    const { status, message } = await updatePasswordRequest(formData)

    if (status === 'success') {
      return dispatch(updatePasswordSuccess(message))
    }

    dispatch(passwordResetError(message))
  } catch (error) {
    dispatch(passwordResetError(error.message))
  }
}
