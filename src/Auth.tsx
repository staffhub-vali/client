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

	const decodedData = jwtDecode(token)

	return decodedData
}
