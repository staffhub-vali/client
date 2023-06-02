import axios from 'axios'
import { Logout } from '../../Auth'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Button from '../ui/Button'
import { FC, useState } from 'react'
import Container from '../ui/Container'

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
		<Container className='p-0'>
			<form
				onSubmit={handleSubmit}
				className='center mt-12 flex w-96 flex-col gap-2'>
				<Label
					className='text-center'
					id='name'>
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
					id='email'>
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
					id='phone'>
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
		</Container>
	)
}

export default NewEmployeeForm
