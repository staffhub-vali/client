const Logout = () => {
	localStorage.setItem('user', '')
	localStorage.setItem('token', '')
	window.location.href = '/auth/login'
}

export default Logout
