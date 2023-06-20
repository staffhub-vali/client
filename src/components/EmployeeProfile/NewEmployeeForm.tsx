import axios from 'axios'
import Input from '../ui/Input.tsx'
import Label from '../ui/Label.tsx'
import { Check } from 'lucide-react'
import Button from '../ui/Button.tsx'
import { Logout } from '../../Auth.tsx'
import Container from '../ui/Container.tsx'
import { useEffect, useState } from 'react'
import Notification from '../ui/Notification.tsx'
import { useNavigate } from 'react-router-dom'

const NewEmployeeForm = () => {
	const [name, setName] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [address, setAddress] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)

	const navigate = useNavigate()

	useEffect(() => {
		let timeoutId: any = null

		clearTimeout(timeoutId)

		timeoutId = setTimeout(() => {
			setError(null)
			setMessage(null)
		}, 4000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [error, message])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!name || !phone || !email || !address) {
			return setError('All fields are required.')
		}

		setLoading(true)

		try {
			const token = localStorage.getItem('token')

			const { data } = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/employees`,
				{
					name: name,
					phone: phone,
					email: email,
					address: address,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setMessage(data.message)
			setTimeout(() => {
				navigate('/employees')
			}, 1000)
		} catch (error: any) {
			setError(error.response.data.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container
			className='p-0'
			size={'lg'}>
			<form
				onSubmit={handleSubmit}
				className='slide-in-bottom-h1 mb-16 mt-12 flex w-2/3 flex-col gap-2'>
				<Label htmlFor='name'>Employee Name</Label>

				<Input
					id='name'
					type='text'
					name='name'
					size={'lg'}
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Enter the name of the employee'
				/>

				<Label htmlFor='email'>Employee Email</Label>

				<Input
					id='email'
					type='text'
					size={'lg'}
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Enter the email of the employee'
				/>

				<Label htmlFor='phone'>Employee Phone</Label>

				<Input
					size={'lg'}
					id='phone'
					type='text'
					name='phone'
					value={phone}
					onChange={(e) => {
						const re = /^[0-9+\s]*$/
						if (re.test(e.target.value)) {
							setPhone(e.target.value)
						}
					}}
					placeholder='Enter the phone number of the employee'
				/>

				<Label htmlFor='address'>Employee Address</Label>

				<Input
					size={'lg'}
					type='text'
					id='address'
					name='address'
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder='Enter the address of the employee'
				/>

				<Button
					size={'lg'}
					loading={loading}
					className='slide-in-bottom mr-auto'
					title='Save information and create employee'>
					Submit {<Check className='ml-2' />}
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
