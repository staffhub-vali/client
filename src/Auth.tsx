import axios from 'axios'

export const Login = async (credentials: any): Promise<void> => {
	try {
		const { data } = await axios.post('http://localhost:8080/v1/auth/login', credentials)

		localStorage.setItem('token', data)
		window.location.href = '/'
	} catch (error: any) {
		console.log(error)
		throw error
	}
}

export const Logout = () => {
	localStorage.setItem('token', '')
	window.location.href = '/login'
}
