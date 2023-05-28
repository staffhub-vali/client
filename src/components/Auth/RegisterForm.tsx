import axios from 'axios'
import Logout from '../../Auth'
import Button from '../ui/Button'
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
				if (error.response.status === 401) {
					Logout()
					console.error(error)
				}
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
		<section className='text-slate-800 dark:text-slate-200'>
			<div className='flex flex-col items-center justify-center lg:min-h-full lg:flex-row '>
				<aside className='min-h-full lg:w-1/2'>
					<img
						alt='Pattern'
						src='https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2139&q=80'
						className=' aspect-video  object-cover'
					/>
				</aside>
				<main
					aria-label='Main'
					className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
					<div className='max-w-xl lg:max-w-2xl'>
						<h1 className='mt-6 text-2xl font-semibold sm:text-3xl md:text-4xl'>Sign Up </h1>

						<form
							onSubmit={handleSubmit}
							className='mt-8 grid grid-cols-6 gap-6'>
							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='FirstName'
									className='block text-sm font-medium'>
									First Name
								</label>

								<input
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									type='text'
									id='FirstName'
									name='firstName'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl shadow ring-slate-100 dark:bg-slate-700 dark:outline-none dark:focus:ring-2 '
								/>
							</div>

							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='LastName'
									className='block text-sm font-medium'>
									Last Name
								</label>

								<input
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									type='text'
									id='LastName'
									name='lastName'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl shadow ring-slate-100 dark:bg-slate-700 dark:outline-none dark:focus:ring-2'
								/>
							</div>

							<div className='col-span-6'>
								<label
									htmlFor='Email'
									className='block text-sm font-medium'>
									Email
								</label>

								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									type='email'
									id='Email'
									name='email'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl shadow ring-slate-100 dark:bg-slate-700 dark:outline-none dark:focus:ring-2'
								/>
							</div>

							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='Password'
									className='block text-sm font-medium'>
									Password
								</label>

								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type='password'
									id='Password'
									name='password'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl shadow ring-slate-100 dark:bg-slate-700 dark:outline-none dark:focus:ring-2'
								/>
							</div>

							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='PasswordConfirmation'
									className='block text-sm font-medium'>
									Confirm Password
								</label>

								<input
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									type='password'
									id='PasswordConfirmation'
									name='password_confirmation'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl shadow ring-slate-100 dark:bg-slate-700 dark:outline-none dark:focus:ring-2'
								/>
							</div>

							<div className='col-span-6 '>
								<p className='text-sm'>
									By creating an account, you agree to our {''}
									<Link
										to='#'
										className='font-semibold'>
										terms and conditions {''}
									</Link>
									and {''}
									<Link
										to='#'
										className='font-semibold'>
										privacy policy
									</Link>
									.
								</p>
							</div>

							<div className='col-span-6 sm:flex sm:items-center sm:gap-4  '>
								<Button
									isLoading={isLoading}
									size={'lg'}>
									Sign Up
								</Button>

								<p className='mt-4 text-sm text-slate-500 dark:text-slate-400 sm:mt-0'>
									Already have an account? {''}
									<Link
										to='/auth/login'
										className='font-semibold text-slate-950 dark:text-slate-100'>
										Log in
									</Link>
								</p>
							</div>
						</form>
					</div>
				</main>
			</div>
			{error && (
				<div className='absolute bottom-16 left-0 right-0 mx-auto w-fit rounded bg-red-400 px-4 py-2 text-3xl text-white'>
					{error}
				</div>
			)}
		</section>
	)
}

export default RegisterForm
