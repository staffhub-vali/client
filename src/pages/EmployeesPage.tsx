import axios from 'axios'
import Logout from '../Auth'
import { FC, useEffect, useState } from 'react'
import EmployeeList from '../components/EmployeeList'

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
		<div className='flex flex-col items-center pt-24'>
			<EmployeeList
				data={data}
				headings={headings}
			/>
		</div>
	)
}

export default EmployeesPage
