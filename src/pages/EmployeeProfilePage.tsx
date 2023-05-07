import { FC, useEffect, useState } from 'react'
import Profile from '../components/Profile'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface EmployeeProfilePageProps {}

interface Employee {
	_id: string
	name: string
	email: string
	phone: string
}

const EmployeeProfilePage: FC<EmployeeProfilePageProps> = ({}) => {
	const [employee, setEmployee] = useState<Employee>({
		_id: '',
		name: '',
		email: '',
		phone: '',
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
			console.log(response.data)
			setEmployee(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='flex flex-col items-center pt-24'>
			<Profile data={employee} />
		</div>
	)
}

export default EmployeeProfilePage
