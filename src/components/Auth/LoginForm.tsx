import Input from '../ui/Input'
import Label from '../ui/Label'
import Button from '../ui/Button'
import { Login } from '../../Auth'
import Heading from '../ui/Heading'
import { FC, useState } from 'react'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'
import { Link } from 'react-router-dom'
import Notification from '../ui/Notification'

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
			await Login(email, password)
		} catch (error: any) {
			setError(error.response.data.message)
		} finally {
			setIsLoading(false)
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
					htmlFor='Email'>
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
					htmlFor='Password'>
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
