import axios from 'axios'
import Logout from '../../Auth'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Button from '../ui/Button'
import { FC, useState } from 'react'

interface NewEmployeeFormProps {}

const NewEmployeeForm: FC<NewEmployeeFormProps> = ({}) => {
	const [name, setName] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault()
			setIsLoading(true)
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
			setIsLoading(false)
			setEmail('')
			setName('')
			setPhone('')
			console.log(response.data.message)
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
			setIsLoading(false)
			console.log(error.response.data.message)
		}
	}

	return (
		<>
			<div className='flex flex-col items-center justify-center lg:min-h-full lg:flex-row '>
				<main
					aria-label='Main'
					className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
					<div className='max-w-xl lg:max-w-2xl'>
						<form
							onSubmit={handleSubmit}
							className='center flex w-96 flex-col gap-6'>
							<div className='flex-grow'>
								<Label
									className='text-center'
									id='name'>
									Name
								</Label>

								<Input
									id='name'
									type='text'
									name='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className='flex-grow'>
								<Label
									className='text-center'
									id='email'>
									Email
								</Label>

								<Input
									id='email'
									type='text'
									name='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='flex-grow'>
								<Label
									className='text-center'
									id='phone'>
									Phone
								</Label>

								<Input
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
								/>
							</div>

							<div className='flex flex-grow-0 flex-col sm:items-center sm:gap-6'>
								<Button
									size={'lg'}
									isLoading={isLoading}>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</main>
			</div>
		</>
	)
}

export default NewEmployeeForm
