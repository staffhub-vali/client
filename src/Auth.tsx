import { googleLogout } from '@react-oauth/google'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const Login = async (credentials: any): Promise<void> => {
	try {
		const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, credentials)

		localStorage.setItem('token', data)
		window.location.href = '/'
	} catch (error: any) {
		console.log(error)
		throw error
	}
}

export const Logout = () => {
	googleLogout()
	localStorage.setItem('token', '')
	window.location.href = '/login'
}

export const UserData = () => {
	const token = localStorage.getItem('token')

	const decodedData = parseJwt(token)

	return decodedData
}

function parseJwt(token: any) {
	var base64Url = token.split('.')[1]
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	var jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join(''),
	)

	return JSON.parse(jsonPayload)
}
