import axios from 'axios'
import { Logout } from '../../Auth.tsx'
import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import Heading from '../../components/ui/Heading.tsx'
import Spinner from '../../components/ui/Spinner.tsx'
import Container from '../../components/ui/Container.tsx'
import { buttonVariants } from '../../components/ui/Button.tsx'
import EmployeesTable from '../../components/EmployeeProfile/EmployeesTable.tsx'

interface Employee {
	_id: string
	name: string
	email: string
	phone: string
	notes: string[]
	shiftPreferences: string[]
	vacationDays: number | string
}

const EmployeesListPage = () => {
	const [data, setData] = useState<Employee[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		fetchEmployees()
	}, [])

	const fetchEmployees = async () => {
		const token = localStorage.getItem('token')
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/employees`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setData(data)
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
			className='overflow-y-hidden'>
			{loading ? (
				<Spinner />
			) : data.length > 0 ? (
				<EmployeesTable data={data} />
			) : (
				<>
					<Heading
						className='slide-in-bottom mb-2 mt-6'
						size={'sm'}>
						You do not currently have any employees on your account.
					</Heading>
					<Heading
						size={'xs'}
						className='slide-in-bottom'>
						Click below if you wish to create an employee.
					</Heading>{' '}
					<Link
						to='/employees/new'
						className={`${buttonVariants({
							variant: 'default',
						})} slide-in-bottom mt-6`}>
						New Employee {<UserPlus className='ml-2' />}
					</Link>
				</>
			)}
		</Container>
	)
}

export default EmployeesListPage
