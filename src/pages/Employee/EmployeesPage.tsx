import axios from 'axios'
import { Logout } from '../../Auth'
import { FC, useEffect, useState } from 'react'
import EmployeeList from '../../components/Employee/EmployeeList'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../../components/ui/Button'
import { UserPlus } from 'lucide-react'
import Container from '../../components/ui/Container'

interface EmployeesPageProps {}

const headings = ['Name', 'Email', 'Phone']

const EmployeesPage: FC<EmployeesPageProps> = ({}) => {
	const [data, setData] = useState([])

	useEffect(() => {
		fetchEmployees()
	}, [])

	const fetchEmployees = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.get('http://localhost:8080/v1/employees', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setData(response.data)
		} catch (error: any) {
			console.error(error)
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<Container size={'lg'}>
			<EmployeeList
				data={data}
				headings={headings}
			/>
			<Link
				className={`${buttonVariants({ variant: 'default', size: 'lg' })} mt-6`}
				to={'/employees/new'}>
				New Employee {<UserPlus className='ml-2' />}
			</Link>
		</Container>
	)
}

export default EmployeesPage
