import { useEffect, useState } from 'react'
import Container from '../../components/ui/Container.tsx'
import LoginForm from '../../components/Auth/LoginForm.tsx'

const LoginPage = () => {
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
			/>
		</Container>
	)
}

export default LoginPage
