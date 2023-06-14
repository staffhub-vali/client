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

	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => console.log(tokenResponse),
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			await Login(email, password)
		} catch (error: any) {
			setError(error.response.data.message)
		} finally {
			setLoading(false)
		}
	}

	const handleLogin = async (credentialResponse: any) => {
		try {
			await axios.post('http://localhost:8080/v1/auth/login', credentialResponse)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container>
			<Heading size={'sm'}>Sign In</Heading>
			<form
				onSubmit={handleSubmit}
				className='mt-12 flex w-96 flex-col'>
				<Label
					htmlFor='Email'
					className='text-center'>
					Email
				</Label>
				<Input
					size='lg'
					id='Email'
					type='email'
					name='email'
					value={email}
					placeholder='Your email address..'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Label
					htmlFor='Password'
					className='text-center'>
					Password
				</Label>
				<Input
					size='lg'
					id='Password'
					type='password'
					name='password'
					value={password}
					placeholder='Your password..'
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button
					className='mx-auto mb-3 mt-1 w-fit'
					loading={loading}
					size={'lg'}>
					Sign In
				</Button>

				<Paragraph
					size={'sm'}
					className=' text-slate-500 dark:text-slate-400 '>
					Don't have an account? {''}
					<Link
						to='/auth/register'
						className='font-semibold text-slate-700 dark:text-slate-300'>
						Sign Up
					</Link>
				</Paragraph>
			</form>

			<div className='mt-6'>
				<GoogleLogin
					onSuccess={(credentialResponse) => {
						handleLogin(credentialResponse)
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
