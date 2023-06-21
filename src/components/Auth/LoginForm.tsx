import { FC } from 'react'
import { Login } from '../../Auth.tsx'
import Heading from '../ui/Heading.tsx'
import Container from '../ui/Container.tsx'
import { GoogleLogin } from '@react-oauth/google'
import Notification from '../ui/Notification.tsx'

interface LoginFormProps {
	error: string | null
	message: string | null
}

const LoginForm: FC<LoginFormProps> = ({ message, error }) => {
	return (
		<Container>
			<Heading
				size={'sm'}
				className='slide-in-bottom'>
				Sign In with Google
			</Heading>

			<div className='slide-in-bottom mt-12'>
				<GoogleLogin
					text='continue_with'
					onSuccess={(credentialResponse) => {
						Login(credentialResponse)
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
