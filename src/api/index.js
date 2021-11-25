import axios from 'axios'

/////// Ticket Part

export const getUserTickets = () => {
	const URL = 'http://localhost:8080/tickets/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const getTicketDetails = (_id) => {
	const URL = 'http://localhost:8080/tickets/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const openNewIssue = (formData) => {
	const URL = 'http://localhost:8080/tickets/add-ticket'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const updateTicketMessage = (ticketID, issueObjt) => {
	const URL = 'http://localhost:8080/tickets/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const closeTicket = (ticketID, _id, isAdmin, status) => {
	const URL = 'http://localhost:8080/tickets/close-ticket/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const progressTicket = (ticketID, _id, isAdmin, status) => {
	const URL = 'http://localhost:8080/tickets/inprogress-ticket/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const deleteTicket = (ticketID, _id, isAdmin) => {
	const URL = 'http://localhost:8080/tickets/delete/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

/////// Ticket Part

/////// Registration Part

export const createUser = (formData) => {
	const URL = 'http://localhost:8080/users/'
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(URL, formData)

			resolve(res.data)

			if (res.data.status === 'success') {
				resolve(res.data)
			}
		} catch (error) {
			reject(error)
			console.log('error message : ', error)
		}
	})
}

/////// Registration Part

/////// Accounte verification Part

export const UserVerificationAccount = (formData) => {
	const URL = 'http://localhost:8080/users/validation/'
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

/////// Accounte verification Part

/////// User Part

export const userLogin = (loginData) => {
	const URL = 'http://localhost:8080/users/login'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const fetchUser = () => {
	const URL = 'http://localhost:8080/users/profil/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const userLogout = async () => {
	const URL = 'http://localhost:8080/users/logout'

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
		console.log('error logout', error)
	}
}

export const refreshAccessToken = () => {
	const URL = 'http://localhost:8080/tokens'
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
			console.log('erreur refreshtoken : ', error.message)
			reject(false)
		}
	})
}

/////// User Part

/////// Password Part

export const resetPasswordRequest = (email) => {
	const URL = 'http://localhost:8080/users/forget-password'
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
	const URL = 'http://localhost:8080/users/reset-password'
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.patch(URL, formData)
			console.log('data resetingPassword', data)

			resolve(data)
		} catch (error) {
			reject(error)
		}
	})
}

/////// Password Part

//////////////// ADMIN /////////////////

export const getAllTickets = () => {
	const URL = 'http://localhost:8080/tickets/all/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const TicketDetails = (_id) => {
	const URL = 'http://localhost:8080/tickets/all/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

export const ReplyMessage = (ticketID, issueObjt) => {
	const URL = 'http://localhost:8080/tickets/all/'
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
			console.log('error message : ', error.message)
			reject(error.message)
		}
	})
}

//////////////// ADMIN /////////////////
