import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../../components/Auth/LoginForm'
import RegisterForm from '../../components/Auth/RegisterForm'
import Container from '../../components/ui/Container'

interface AuthPageProps {}

const AuthPage: FC<AuthPageProps> = ({}) => {
	const location = useLocation()
	const [message, setMessage] = useState<string>('')

	const isLoginForm: boolean = location.pathname.includes('/login')
	const isRegisterForm: boolean = location.pathname.includes('/register')

	return (
		<Container size={'lg'}>
			{isLoginForm && <LoginForm message={message} />}
			{isRegisterForm && <RegisterForm setMessage={setMessage} />}
		</Container>
	)
}

export default AuthPage
