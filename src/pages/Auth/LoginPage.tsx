import { useEffect, useState } from 'react'
import Container from '../../components/ui/Container.js'
import LoginForm from '../../components/Auth/LoginForm.js'

const LoginPage = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)

	useEffect(() => {
		let timeoutId: any = null

		clearTimeout(timeoutId)

		timeoutId = setTimeout(() => {
			setError(null)
			setMessage(null)
		}, 4000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [error, message])

	return (
		<Container
			size={'lg'}
			className='overflow-y-hidden'>
			<LoginForm
				error={error}
				message={message}
				setError={setError}
				setLoading={setLoading}
			/>
		</Container>
	)
}

export default LoginPage
