import axios from 'axios'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Button from '../ui/Button'
import { Logout } from '../../Auth'
import { FC, useState } from 'react'
import Container from '../ui/Container'
import Notification from '../ui/Notification'
import { Check } from 'lucide-react'

interface NewEmployeeFormProps {}

const NewEmployeeForm: FC<NewEmployeeFormProps> = ({}) => {
	const [name, setName] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault()
			setLoading(true)
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
			setLoading(false)
			setEmail('')
			setName('')
			setPhone('')
			setError('')
			setMessage(response.data.message)
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
			setLoading(false)
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
				<Label htmlFor='name'>Name</Label>

				<Input
					placeholder='Employee name...'
					id='name'
					type='text'
					name='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<Label htmlFor='email'>Email</Label>

				<Input
					placeholder='Employee email address...'
					id='email'
					type='text'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Label htmlFor='phone'>Phone</Label>

				<Input
					placeholder='Employee phone number...'
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
					className='mx-auto w-fit'
					loading={loading}>
					Submit {<Check className='ml-2 h-5 w-5 ' />}
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
