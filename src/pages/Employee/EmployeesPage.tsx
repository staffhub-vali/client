import axios from 'axios'
import Logout from '../../Auth'
import { FC, useEffect, useState } from 'react'
import EmployeeList from '../../components/Employee/EmployeeList'
import { Link } from 'react-router-dom'

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
			<Link
				className='mt-8 rounded bg-black px-6 py-2 text-2xl text-white active:scale-95 dark:bg-white dark:text-black '
				to={'/employees/new'}>
				New <i className='fa-solid fa-user-plus'></i>
			</Link>
		</div>
	)
}

export default EmployeesPage
