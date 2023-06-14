import axios from 'axios'
import { Logout } from '../../Auth.tsx'
import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import Heading from '../../components/ui/Heading.tsx'
import Spinner from '../../components/ui/Spinner.tsx'
import Container from '../../components/ui/Container.tsx'
import { buttonVariants } from '../../components/ui/Button.tsx'
import ScheduleMaker from '../../components/Schedule/ScheduleMaker.tsx'

const NewSchedulePage = () => {
	const [id, setId] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [employees, setEmployees] = useState([])
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const [shiftPreferences, setShiftPreferences] = useState<string[]>([])

	useEffect(() => {
		fetchEmployees()
	}, [])

	const fetchEmployees = async () => {
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.get('http://localhost:8080/v1/employees', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setEmployees(data)
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container
			size={'lg'}
			onClick={() => (isOpen ? setIsOpen(false) : null)}>
			{loading ? (
				<Spinner />
			) : employees.length > 0 ? (
				<>
					<ScheduleMaker
						id={id}
						name={name}
						setId={setId}
						isOpen={isOpen}
						setName={setName}
						employees={employees}
						setIsOpen={setIsOpen}
						shiftPreferences={shiftPreferences}
						setShiftPreferences={setShiftPreferences}
					/>
				</>
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
						className={`${buttonVariants({
							variant: 'default',
							size: 'lg',
						})} mt-6`}>
						New Employee {<UserPlus className='ml-2' />}
					</Link>
				</>
			)}
		</Container>
	)
}

export default NewSchedulePage
