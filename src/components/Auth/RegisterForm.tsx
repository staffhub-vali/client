import axios from 'axios'
import Input from '../ui/Input.tsx'
import Button from '../ui/Button.tsx'
import Heading from '../ui/Heading.tsx'
import Paragraph from '../ui/Paragraph.tsx'
import Container from '../ui/Container.tsx'
import Notification from '../ui/Notification.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

interface RegisterFormProps {
	loading: boolean
	error: string | null
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

const RegisterForm: FC<RegisterFormProps> = ({ setMessage, loading, setLoading, setError, error }) => {
	const navigate = useNavigate()
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [firstName, setFirstName] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')

	useEffect(() => {
		setName(`${firstName} ${lastName}`)
	}, [firstName, lastName])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		if (password === confirmPassword) {
			try {
				const { data } = await axios.post('http://localhost:8080/v1/auth/register', {
					name: name,
					email: email,
					password: password,
				})

				setMessage(data.message)
				navigate('/auth/login')
			} catch (error: any) {
				setError(error.response.data.message)
			} finally {
				setLoading(false)
			}
		} else {
			setLoading(false)
			setError('Passwords do not match.')
		}
	}

	return (
		<Container>
			<Heading
				className=''
				size='sm'>
				Sign Up{' '}
			</Heading>

			<form
				className='mt-12'
				onSubmit={handleSubmit}>
				<div className='flex space-x-2'>
					<Input
						size='lg'
						placeholder='First Name'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						type='text'
						id='FirstName'
						name='firstName'
					/>

					<Input
						size='lg'
						placeholder='Last Name'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						type='text'
						id='LastName'
						name='lastName'
					/>
				</div>

				<Input
					size='lg'
					value={email}
					placeholder='Email'
					onChange={(e) => setEmail(e.target.value)}
					type='email'
					id='Email'
					name='email'
				/>
				<div className='flex space-x-2'>
					<Input
						size='lg'
						value={password}
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						id='Password'
						name='password'
					/>

					<Input
						size='lg'
						value={confirmPassword}
						placeholder='Confirm Password'
						onChange={(e) => setConfirmPassword(e.target.value)}
						type='password'
						id='PasswordConfirmation'
						name='password_confirmation'
					/>
				</div>
				<Paragraph
					size='sm'
					className='text-slate-500 dark:text-slate-400'>
					By creating an account, you agree to our {''}
					<Link
						to='#'
						className='font-semibold text-slate-800 dark:text-slate-200'>
						terms and conditions {''}
					</Link>
					and {''}
					<Link
						to='#'
						className='font-semibold text-slate-800 dark:text-slate-200'>
						privacy policy
					</Link>
					.
				</Paragraph>
				<div className='mt-6 flex flex-col items-center'>
					<Button
						loading={loading}
						size={'lg'}>
						Sign Up
					</Button>

					<Paragraph
						size='sm'
						className='mt-2 text-slate-500 dark:text-slate-400'>
						Already have an account? {''}
						<Link
							to='/auth/login'
							className='font-semibold text-slate-950 dark:text-slate-100'>
							Log in
						</Link>
					</Paragraph>
				</div>
			</form>

			{error && (
				<Notification
					size={'lg'}
					variant='error'
					position={'bottom'}>
					{error}
				</Notification>
			)}
		</Container>
	)
}

export default RegisterForm
