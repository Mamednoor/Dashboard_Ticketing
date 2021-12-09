export const shortText = (str) => {
	return str.length >= 10 && str.length <= 250
}

// fonction afin de transformer le format de la date en local
export default function formatDate(date) {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear(),
		hour = d.getHours() + 1,
		minute = d.getMinutes()
	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day
	return [[day, month, year].join('/'), [hour, minute].join(':')].join(' - ')
}
// possibiliter de le faire d'une autre manière new Date (variable de la date).toLocalString()

// TODO : à utiliser pour l'upload d'une photo sur un ticket
export const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

export const codeGenerator = (length) => {
	let code = ''
	let possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*#?&'
	for (let i = 0; i < length; i++)
		code += possible.charAt(Math.floor(Math.random() * possible.length))
	return code
}
