import axios from 'axios'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Button from '../ui/Button'
import { Logout } from '../../Auth'
import { FC, useState } from 'react'
import Container from '../ui/Container'
import Notification from '../ui/Notification'

interface NewEmployeeFormProps {}

const NewEmployeeForm: FC<NewEmployeeFormProps> = ({}) => {
	const [name, setName] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [message, setMessage] = useState<string>('')
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
			setError('')
			setMessage(response.data.message)
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
			setIsLoading(false)
			setMessage('')
			setError(error.response.data.message)
		}
	}

	return (
		<Container
			className='p-0'
			size={'lg'}>
			<form
				onSubmit={handleSubmit}
				className='center mb-16 mt-12 flex w-96 flex-col gap-2'>
				<Label
					className='text-center'
					htmlFor='name'>
					Name
				</Label>

				<Input
					size='lg'
					id='name'
					type='text'
					name='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<Label
					className='text-center'
					htmlFor='email'>
					Email
				</Label>

				<Input
					size='lg'
					id='email'
					type='text'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Label
					className='text-center'
					htmlFor='phone'>
					Phone
				</Label>

				<Input
					size='lg'
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

				<Button
					size={'lg'}
					className='mx-auto w-fit'
					isLoading={isLoading}>
					Submit
				</Button>
			</form>
			{error && (
				<Notification
					size={'lg'}
					variant='error'>
					{error}
				</Notification>
			)}
			{message && (
				<Notification
					size={'lg'}
					variant='success'>
					{message}
				</Notification>
			)}
		</Container>
	)
}

export default NewEmployeeForm
