import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'

interface AuthPageProps {}

const AuthPage: FC<AuthPageProps> = ({}) => {
	const location = useLocation()
	const [message, setMessage] = useState(null)

	const isLoginForm = location.pathname.includes('/login')
	const isRegisterForm = location.pathname.includes('/register')

	return (
		<div className='pt-20'>
			{isLoginForm && <LoginForm message={message} />}
			{isRegisterForm && <RegisterForm setMessage={setMessage} />}
		</div>
	)
}

export default AuthPage
