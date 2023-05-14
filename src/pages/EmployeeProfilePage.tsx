import axios from 'axios'
import Logout from '../Auth'
import Profile from '../components/Profile'
import { useParams } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'

interface EmployeeProfilePageProps {}

interface Employee {
	rosters: []
	_id: string
	name: string
	email: string
	phone: string
	vacationDays: number
}

const EmployeeProfilePage: FC<EmployeeProfilePageProps> = ({}) => {
	const [employee, setEmployee] = useState<Employee>({
		_id: '',
		name: '',
		email: '',
		phone: '',
		rosters: [],
		vacationDays: NaN,
	})
	const { id } = useParams()

	useEffect(() => {
		fetchProfile()
	}, [])

	const fetchProfile = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.get(`http://localhost:8080/v1/employees/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setEmployee(response.data)
		} catch (error: any) {
			console.error(error)
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<div className='flex flex-col items-center pt-24'>
			<Profile employee={employee} />
		</div>
	)
}

export default EmployeeProfilePage
