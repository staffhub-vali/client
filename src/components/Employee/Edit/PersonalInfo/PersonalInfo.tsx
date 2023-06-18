import axios from 'axios'
import { Check, X } from 'lucide-react'
import Input from '../../../ui/Input.tsx'
import Label from '../../../ui/Label.tsx'
import Button from '../../../ui/Button.tsx'
import Heading from '../../../ui/Heading.tsx'
import { useNavigate } from 'react-router-dom'
import { Logout } from '../../../../Auth.tsx'
import Container from '../../../ui/Container.tsx'
import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

interface PersonalInfoProps {
	employee: {
		_id: string
		name: string
		email: string
		phone: string
		sickDays: number | string
		vacationDays: number | string
	}
	loading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

const PersonalInfo: FC<PersonalInfoProps> = ({ employee, loading, setLoading, setMessage, setError }) => {
	const { _id } = employee
	const navigate = useNavigate()
	const [name, setName] = useState<string>(employee.name)
	const [email, setEmail] = useState<string>(employee.email)
	const [phone, setPhone] = useState<string>(employee.phone)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.put(
				`${import.meta.env.VITE_BASE_URL}/employees/${_id}`,
				{
					id: _id,
					name,
					email,
					phone,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setMessage(data.message)
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
		<Container>
			<Heading size={'sm'}>{employee.name}</Heading>
			<form
				onSubmit={handleSubmit}
				className='slide-in-bottom mt-12 w-4/6'>
				<Label htmlFor='name'>Name</Label>
				<Input
					size='lg'
					id='name'
					type='text'
					name='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Label htmlFor='email'>Email</Label>
				<Input
					size='lg'
					id='email'
					type='text'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Label htmlFor='phone'>Phone</Label>
				<Input
					size='lg'
					type='text'
					id='phone'
					name='phone'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<div className='space-x-2'>
					<Button
						loading={loading}
						title='Update information'
						className='w-40'>
						Save changes {<Check className='ml-2' />}
					</Button>

					<Button
						type='button'
						title='Go back'
						className='w-40'
						variant={'outline'}
						onClick={() => navigate(`/employees/${employee._id}`)}>
						Cancel {<X className='ml-2' />}
					</Button>
				</div>
			</form>
		</Container>
	)
}

export default PersonalInfo
