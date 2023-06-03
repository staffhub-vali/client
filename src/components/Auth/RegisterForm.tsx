import axios from 'axios'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'
import Notification from '../ui/Notification'
import { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface RegisterFormProps {
	setMessage: React.Dispatch<React.SetStateAction<null>>
}

const RegisterForm: FC<RegisterFormProps> = ({ setMessage }) => {
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setName(`${firstName} ${lastName}`)
	}, [firstName, lastName])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		if (password === confirmPassword) {
			try {
				const response = await axios.post('http://localhost:8080/v1/auth/register', {
					name: name,
					email: email,
					password: password,
				})

				setMessage(response.data.message)
				setIsLoading(false)
				navigate('/auth/login')
			} catch (error: any) {
				console.log(error)
				setIsLoading(false)
				setError('An error occurred. Please try again later.')
			}
		} else {
			setIsLoading(false)
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
						isLoading={isLoading}
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
