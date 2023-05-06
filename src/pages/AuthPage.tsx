import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

interface AuthPageProps {}

const AuthPage: FC<AuthPageProps> = ({}) => {
	const location = useLocation()

	const isLoginForm = location.pathname.includes('/login')
	const isRegisterForm = location.pathname.includes('/register')

	return (
		<div className='lg:pt- pt-20'>
			{isLoginForm && <LoginForm />}
			{isRegisterForm && <RegisterForm />}
		</div>
	)
}

export default AuthPage
