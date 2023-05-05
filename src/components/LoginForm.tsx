import { FC } from 'react'
import { Link } from 'react-router-dom'

interface LoginhtmlFormProps {}

const LoginForm: FC<LoginhtmlFormProps> = ({}) => {
	return (
		<section className=''>
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
						<h1 className='mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>Sign Up </h1>

						<p className='mt-4 leading-relaxed text-gray-500'>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
							quibusdam aperiam voluptatum.
						</p>

						<form
							action='#'
							className='mt-8 grid grid-cols-6 gap-6'>
							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='FirstName'
									className='block text-sm font-medium text-gray-700'>
									First Name
								</label>

								<input
									type='text'
									id='FirstName'
									name='first_name'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm '
								/>
							</div>

							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='LastName'
									className='block text-sm font-medium text-gray-700'>
									Last Name
								</label>

								<input
									type='text'
									id='LastName'
									name='last_name'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm'
								/>
							</div>

							<div className='col-span-6'>
								<label
									htmlFor='Email'
									className='block text-sm font-medium text-gray-700'>
									Email
								</label>

								<input
									type='email'
									id='Email'
									name='email'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm'
								/>
							</div>

							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='Password'
									className='block text-sm font-medium text-gray-700'>
									Password
								</label>

								<input
									type='password'
									id='Password'
									name='password'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm'
								/>
							</div>

							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='PasswordConfirmation'
									className='block text-sm font-medium text-gray-700'>
									Confirm Password
								</label>

								<input
									type='password'
									id='PasswordConfirmation'
									name='password_confirmation'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm'
								/>
							</div>

							<div className='col-span-6'>
								<p className='text-sm text-gray-500'>
									By creating an account, you agree to our {''}
									<Link
										to='#'
										className='font-semibold text-gray-700'>
										terms and conditions {''}
									</Link>
									and {''}
									<Link
										to='#'
										className='font-semibold text-gray-700'>
										privacy policy
									</Link>
									.
								</p>
							</div>

							<div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
								<button className='inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none active:scale-95'>
									Create an account
								</button>

								<p className='mt-4 text-sm text-gray-500 sm:mt-0'>
									Already have an account? {''}
									<Link
										to='#'
										className='font-semibold text-gray-700'>
										Log in
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
