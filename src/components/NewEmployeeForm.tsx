import axios from 'axios'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

interface NewEmployeeFormProps {}

const NewEmployeeForm: FC<NewEmployeeFormProps> = ({}) => {
	const [name, setName] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault()

			const token = localStorage.getItem('token')

			const response = await axios.post(
				'http://localhost:8080/v1/employees',
				{
					name: name,
					phone: phone,
					email: email,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)

			setEmail('')
			setName('')
			setPhone('')
			console.log(response.data)
		} catch (error: any) {
			console.log(error.response.data.message)
		}
	}

	return (
		<section className=''>
			<div className='flex flex-col items-center justify-center lg:min-h-full lg:flex-row '>
				<main
					aria-label='Main'
					className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
					<div className='max-w-xl lg:max-w-2xl'>
						<form
							onSubmit={handleSubmit}
							className='center flex w-96 flex-col gap-6'>
							<div className='flex-grow'>
								<label
									htmlFor='name'
									className='block text-center text-sm font-medium text-gray-700'>
									Name
								</label>

								<input
									onChange={(e) => setName(e.target.value)}
									value={name}
									type='text'
									id='name'
									name='name'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm'
								/>
							</div>
							<div className='flex-grow'>
								<label
									htmlFor='Email'
									className='block text-center text-sm font-medium text-gray-700'>
									Email
								</label>

								<input
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									type='text'
									id='email'
									name='email'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm'
								/>
							</div>
							<div className='flex-grow'>
								<label
									htmlFor='phone'
									className='block text-center text-sm font-medium text-gray-700'>
									Phone
								</label>

								<input
									onChange={(e) => {
										const re = /^[0-9+\s]*$/
										if (re.test(e.target.value)) {
											setPhone(e.target.value)
										}
									}}
									value={phone}
									type='text'
									id='phone'
									name='phone'
									className='mt-1 w-full rounded-md border-gray-200 bg-white p-2 text-xl text-gray-700 shadow-sm'
								/>
							</div>

							<div className='flex flex-grow-0 flex-col sm:items-center sm:gap-6'>
								<button className='inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none active:scale-95'>
									Add Employee
								</button>
							</div>
						</form>
					</div>
				</main>
			</div>
		</section>
	)
}

export default NewEmployeeForm
