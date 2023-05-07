import { FC, useEffect, useState } from 'react'
import EmployeeList from '../components/EmployeeList'
import axios from 'axios'

interface EmployeesPageProps {}

const headings = ['Name', 'Phone', 'Email']

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
			console.log(response.data)
			setData(response.data)
		} catch (error) {
			console.error(error)
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
