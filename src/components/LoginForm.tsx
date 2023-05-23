import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const response = await axios.post('http://localhost:8080/v1/auth/login', {
				email: email,
				password: password,
			})

			localStorage.setItem('user', JSON.stringify(response.data.user))
			localStorage.setItem('token', response.data.token)
			window.location.href = '/'
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className='text-slate-800 dark:text-slate-200'>
			<div className='flex flex-col items-center justify-center lg:min-h-full lg:flex-row '>
				<main
					aria-label='Main'
					className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
					<div className='max-w-xl lg:max-w-2xl'>
						<h1 className='mt-6 text-center text-2xl font-semibold  sm:text-3xl md:text-4xl'>Sign In</h1>

						<form
							onSubmit={handleSubmit}
							className='center mt-8 flex w-96 flex-col gap-6'>
							<div className='flex-grow'>
								<label
									htmlFor='Email'
									className='block text-center text-sm font-medium'>
									Email
								</label>

								<input
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									type='email'
									id='Email'
									name='email'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl shadow ring-white dark:bg-slate-700 dark:text-slate-300 dark:outline-none dark:focus:ring-2'
								/>
							</div>

							<div className='flex-grow'>
								<label
									htmlFor='Password'
									className='block text-center text-sm font-medium '>
									Password
								</label>

								<input
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									type='password'
									id='Password'
									name='password'
									className='mt-1 w-full rounded-md bg-white p-2 text-xl text-slate-700 shadow ring-white dark:bg-slate-700 dark:text-slate-300 dark:outline-none dark:focus:ring-2'
								/>
							</div>

							<div className='flex flex-grow-0 flex-col sm:items-center sm:gap-6'>
								<button className='inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none active:scale-95 dark:bg-white dark:text-black'>
									Sign In
								</button>

								<p className='mt-4 text-center text-sm text-slate-500 dark:text-slate-400 sm:mt-0'>
									Don't have an account? {''}
									<Link
										to='/auth/register'
										className='font-semibold text-slate-700 dark:text-slate-300'>
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
