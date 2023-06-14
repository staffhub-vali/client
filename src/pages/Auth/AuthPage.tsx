import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Container from '../../components/ui/Container.tsx'
import LoginForm from '../../components/Auth/LoginForm.tsx'
import RegisterForm from '../../components/Auth/RegisterForm.tsx'

interface AuthPageProps {}

const AuthPage: FC<AuthPageProps> = ({}) => {
	const location = useLocation()
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)

	useEffect(() => {
		let timeoutId: any = null

		clearTimeout(timeoutId)

		timeoutId = setTimeout(() => {
			setError(null)
			setMessage(null)
		}, 7000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [error, message])

	const isLoginForm: boolean = location.pathname.includes('/login')
	const isRegisterForm: boolean = location.pathname.includes('/register')

	return (
		<Container size={'lg'}>
			{isLoginForm && (
				<LoginForm
					error={error}
					message={message}
					loading={loading}
					setError={setError}
					setLoading={setLoading}
				/>
			)}
			{isRegisterForm && (
				<RegisterForm
					error={error}
					loading={loading}
					setError={setError}
					setLoading={setLoading}
					setMessage={setMessage}
				/>
			)}
		</Container>
	)
}

export default AuthPage
