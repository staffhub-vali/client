import axios from 'axios'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Container from '../ui/Container'
import { Check, X } from 'lucide-react'
import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

interface EditEmployeeProps {
	data: {
		_id: string
		name: string
		email: string
		phone: string
		sickDays: number | string
		vacationDays: number | string
	}
	setEdit: Dispatch<SetStateAction<boolean>>
}

const EditEmployee: FC<EditEmployeeProps> = ({ data, setEdit }) => {
	const { _id } = data
	const [name, setName] = useState<string>(data.name)
	const [email, setEmail] = useState<string>(data.email)
	const [phone, setPhone] = useState<string>(data.phone)
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			await axios.put(
				`http://localhost:8080/v1/employees/${_id}`,
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
			setEdit(false)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<Container>
			<Heading size={'sm'}>{data.name}</Heading>
			<form
				onSubmit={handleSubmit}
				className='mt-6'>
				<Label htmlFor='name'>Name</Label>
				<Input
					id='name'
					type='text'
					name='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Label htmlFor='email'>Email</Label>
				<Input
					id='email'
					type='text'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Label htmlFor='phone'>Phone</Label>
				<Input
					type='text'
					id='phone'
					name='phone'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>

				<Button
					size={'sm'}
					loading={loading}>
					Submit {<Check className='ml-2 h-5 w-5' />}
				</Button>

				<Button
					size={'sm'}
					type='button'
					loading={loading}
					onClick={() => setEdit(false)}
					className='mx-2 bg-slate-400 text-white hover:bg-slate-400 dark:bg-slate-400 dark:text-white dark:hover:bg-slate-400'>
					Cancel {<X className='ml-2 h-5 w-5' />}
				</Button>
			</form>
		</Container>
	)
}

export default EditEmployee
