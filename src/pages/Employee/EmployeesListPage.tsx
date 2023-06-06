import axios from 'axios'
import { Logout } from '../../Auth'
import { FC, useEffect, useState } from 'react'
import EmployeesList from '../../components/Employee/EmployeesList'
import Container from '../../components/ui/Container'

interface EmployeesListPageProps {}

const headings = ['Name', 'Email', 'Phone']

const EmployeesListPage: FC<EmployeesListPageProps> = ({}) => {
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
			<EmployeesList
				data={data}
				headings={headings}
			/>
		</Container>
	)
}

export default EmployeesListPage
