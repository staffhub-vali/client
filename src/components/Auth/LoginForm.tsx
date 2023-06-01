import axios from 'axios'
import Button from '../ui/Button'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Heading from '../ui/Heading'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'

interface LoginFormProps {
	message: string | null
}

const LoginForm: FC<LoginFormProps> = ({ message }) => {
	const [error, setError] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			const response = await axios.post('http://localhost:8080/v1/auth/login', {
				email: email,
				password: password,
			})
			setIsLoading(false)
			localStorage.setItem('user', JSON.stringify(response.data.user))
			localStorage.setItem('token', response.data.token)
			window.location.href = '/'
		} catch (error: any) {
			setIsLoading(false)
			setError(error.response.data.message)
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
					className='text-center'
					id='Email'>
					Email
				</Label>
				<Input
					size='lg'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					type='email'
					id='Email'
					name='email'
				/>
				<Label
					className='text-center'
					id='Password'>
					Password
				</Label>
				<Input
					size='lg'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					type='password'
					id='Password'
					name='password'
				/>

				<Button
					className='mx-auto mb-3 mt-1 w-fit'
					isLoading={isLoading}
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

			{message && (
				<div className='absolute left-0 right-0 top-28 mx-auto w-fit rounded bg-green-500 px-4 py-2 text-2xl text-white'>
					{message}
				</div>
			)}
			{error && (
				<div className='absolute left-0 right-0 top-28 mx-auto w-fit rounded bg-red-400 px-4 py-2 text-2xl text-white'>
					{error}
				</div>
			)}
		</Container>
	)
}

export default LoginForm
