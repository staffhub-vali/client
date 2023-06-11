import axios from 'axios'
import { Logout } from '../../Auth'
import { useEffect, useState } from 'react'
import Container from '../../components/ui/Container'
import EmployeesList from '../../components/Employee/EmployeesList'

const headings = ['Name', 'Email', 'Phone']

const EmployeesListPage = () => {
	const [data, setData] = useState([])

	useEffect(() => {
		fetchEmployees()
	}, [])

	const fetchEmployees = async () => {
		const token = localStorage.getItem('token')
		try {
			const { data } = await axios.get('http://localhost:8080/v1/employees', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setData(data)
		} catch (error: any) {
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
