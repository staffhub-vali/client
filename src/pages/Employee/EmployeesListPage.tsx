import axios from 'axios'
import { Logout } from '../../Auth.tsx'
import { useEffect, useState } from 'react'
import Container from '../../components/ui/Container.tsx'
import EmployeesList from '../../components/Employee/EmployeesList.tsx'

const headings = ['Name', 'Email', 'Phone', 'Address']

const EmployeesListPage = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

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
		<Container size={'lg'}>
			<EmployeesList
				data={data}
				loading={loading}
				headings={headings}
			/>
		</Container>
	)
}

export default EmployeesListPage
