import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const response = await axios.post('http://localhost:8080/v1/auth/login', {
			email: email,
			password: password,
		})

		localStorage.setItem('user', JSON.stringify(response.data.user))
		localStorage.setItem('token', response.data.token)
		window.location.href = '/'
	}

	return (
		<section className=''>
			<div className='flex flex-col items-center justify-center lg:min-h-full lg:flex-row '>
				<main
					aria-label='Main'
					className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
					<div className='max-w-xl lg:max-w-2xl'>
						<h1 className='mt-6 text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>
							Sign In
						</h1>

						<form
							onSubmit={handleSubmit}
							className='center mt-8 flex w-96 flex-col gap-6'>
							<div className='flex-grow'>
								<label
									htmlFor='Email'
									className='block text-center text-sm font-medium text-gray-700'>
									Email
								</label>

								<input
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									type='email'
									id='Email'
									name='email'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm'
								/>
							</div>

							<div className='flex-grow'>
								<label
									htmlFor='Password'
									className='block text-center text-sm font-medium text-gray-700'>
									Password
								</label>

								<input
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									type='password'
									id='Password'
									name='password'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm'
								/>
							</div>

							<div className='flex flex-grow-0 flex-col sm:items-center sm:gap-6'>
								<button className='inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none active:scale-95'>
									Sign In
								</button>

								<p className='mt-4 text-center text-sm text-gray-500 sm:mt-0'>
									Don't have an account? {''}
									<Link
										to='/auth/register'
										className='font-semibold text-gray-700'>
										Sign Up
									</Link>
								</p>
							</div>
						</form>
					</div>
				</main>
			</div>
		</section>
	)
}

export default LoginForm
