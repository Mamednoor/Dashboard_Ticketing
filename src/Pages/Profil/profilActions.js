import { profilUpdate } from '../../api'

import { profilPending, profilSuccess, profilError } from './profilSlice'

export const updateProfilUser =
	(
		_id,
		newFirstname,
		newLastname,
		newCompany,
		newAddress,
		newPhone,
		newEmail,
	) =>
	async (dispatch) => {
		return new Promise(async (resolve, reject) => {
			try {
				dispatch(profilPending())
				const result = await profilUpdate(
					_id,
					newFirstname,
					newLastname,
					newCompany,
					newAddress,
					newPhone,
					newEmail,
				)
				if (result.status === 'error') {
					return dispatch(profilError(result.message))
				}
				dispatch(profilSuccess(result.message))
			} catch (error) {
				dispatch(profilError(error.message))
			}
		})
	}
