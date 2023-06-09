import axios from 'axios'

export const Login = async (email: string, password: string): Promise<void> => {
	try {
		const { data } = await axios.post('http://localhost:8080/v1/auth/login', {
			email: email,
			password: password,
		})
		localStorage.setItem('user', JSON.stringify(data.user))
		localStorage.setItem('token', data.token)
		window.location.href = '/'
	} catch (error: any) {
		console.log(error)
		throw error
	}
}

export const Logout = () => {
	localStorage.setItem('user', '')
	localStorage.setItem('token', '')
	window.location.href = '/auth/login'
}
