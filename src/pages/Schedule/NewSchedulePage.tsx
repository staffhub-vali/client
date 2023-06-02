import { FC, useEffect, useState } from 'react'
import ScheduleMaker from '../../components/Schedule/ScheduleMaker'
import axios from 'axios'
import { Logout } from '../../Auth'
import { buttonVariants } from '../../components/ui/Button'
import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import Container from '../../components/ui/Container'
import Heading from '../../components/ui/Heading'

interface NewSchedulePageProps {}

const NewSchedulePage: FC<NewSchedulePageProps> = ({}) => {
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [employees, setEmployees] = useState([])

	useEffect(() => {
		fetchEmployees()
	}, [])

	const fetchEmployees = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get('http://localhost:8080/v1/employees', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setEmployees(response.data)
		} catch (error: any) {
			console.log(error)
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<Container
			size={'lg'}
			onClick={() => (isOpen ? setIsOpen(false) : null)}>
			{employees.length > 0 ? (
				<ScheduleMaker
					id={id}
					name={name}
					setId={setId}
					isOpen={isOpen}
					setName={setName}
					employees={employees}
					setIsOpen={setIsOpen}
				/>
			) : (
				<>
					<Heading
						className='mb-2 mt-6'
						size={'sm'}>
						You do not currently have any employees on your account.
					</Heading>
					<Heading size={'xs'}>Click below if you wish to create an employee.</Heading>
					<Link
						to='/employees/new'
						className={`${buttonVariants({ variant: 'default', size: 'lg' })} mt-6`}>
						New Employee {<UserPlus className='ml-2' />}
					</Link>
				</>
			)}
		</Container>
	)
}

export default NewSchedulePage
