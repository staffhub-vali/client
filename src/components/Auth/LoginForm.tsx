import Input from '../ui/Input.tsx'
import Label from '../ui/Label.tsx'
import Button from '../ui/Button.tsx'
import { Login } from '../../Auth.tsx'
import Heading from '../ui/Heading.tsx'
import { Link } from 'react-router-dom'
import Container from '../ui/Container.tsx'
import Paragraph from '../ui/Paragraph.tsx'
import Notification from '../ui/Notification.tsx'
import { googleLogout } from '@react-oauth/google'
import { useGoogleLogin } from '@react-oauth/google'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import axios from 'axios'

interface LoginFormProps {
	loading: boolean
	error: string | null
	message: string | null
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
}

const LoginForm: FC<LoginFormProps> = ({ message, error, setError, loading, setLoading }) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

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
