import { FC, FormEvent, useState } from 'react'
import Container from '../ui/Container'
import Heading from '../ui/Heading'
import Input from '../ui/Input'
import Label from '../ui/Label'
import axios from 'axios'
import Button from '../ui/Button'

interface EmployeeProfileProps {
	data: {
		_id: string
		name: string
		email: string
		phone: string
		sickDays: number | string
		vacationDays: number | string
	}
}

const EmployeeProfile: FC<EmployeeProfileProps> = ({ data }) => {
	const { _id } = data
	const [name, setName] = useState(data.name)
	const [email, setEmail] = useState(data.email)
	const [phone, setPhone] = useState(data.phone)
	const [sickDays, setSickDays] = useState<any>(data.sickDays)
	const [vacationDays, setVacationDays] = useState<any>(data.vacationDays)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setIsLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.put(
				`http://localhost:8080/v1/employees/${_id}`,
				{
					id: _id,
					name,
					email,
					phone,
					sickDays,
					vacationDays,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			console.log(data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.log(error)
		}
	}

	return (
		<Container>
			<Heading size={'sm'}>{data.name}</Heading>
			<form
				onSubmit={handleSubmit}
				className='mt-6 w-full'>
				<Label htmlFor='name'>Name</Label>
				<Input
					size='lg'
					type='text'
					id='name'
					name='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Label htmlFor='email'>Email</Label>
				<Input
					size='lg'
					type='text'
					id='email'
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
				<Label htmlFor='sickDays'>Sick Days</Label>
				<Input
					size='lg'
					type='text'
					id='sickDays'
					name='sickDays'
					value={sickDays}
					onChange={(e) => setSickDays(e.target.value)}
				/>
				<Label htmlFor='vacationDays'>Vacation Days</Label>
				<Input
					size='lg'
					type='text'
					id='vacationDays'
					name='vacationDays'
					value={vacationDays}
					onChange={(e) => setVacationDays(e.target.value)}
				/>
				<Button
					size={'lg'}
					isLoading={isLoading}>
					Submit
				</Button>
			</form>
		</Container>
	)
}

export default EmployeeProfile
