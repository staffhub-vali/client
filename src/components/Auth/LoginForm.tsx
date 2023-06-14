import { Login } from '../../Auth.tsx'
import Heading from '../ui/Heading.tsx'
import Container from '../ui/Container.tsx'
import { GoogleLogin } from '@react-oauth/google'
import Notification from '../ui/Notification.tsx'
import { Dispatch, FC, SetStateAction } from 'react'

interface LoginFormProps {
	error: string | null
	message: string | null
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
}

const LoginForm: FC<LoginFormProps> = ({ message, error, setError, setLoading }) => {
	const handleSubmit = async (credentials: any) => {
		setLoading(true)
		try {
			await Login(credentials)
		} catch (error: any) {
			setError(error.response.data.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container>
			<Heading size={'sm'}>Sign In</Heading>

			<div className='mt-6'>
				<GoogleLogin
					onSuccess={(credentialResponse) => {
						handleSubmit(credentialResponse)
					}}
					onError={() => {
						console.log('Login Failed')
					}}
				/>
			</div>

			{message && (
				<Notification
					size={'lg'}
					variant={'success'}
					position={'top'}>
					{message}
				</Notification>
			)}
			{error && (
				<Notification
					size={'lg'}
					variant={'error'}
					position={'top'}>
					{error}
				</Notification>
			)}
		</Container>
	)
}

export default LoginForm
