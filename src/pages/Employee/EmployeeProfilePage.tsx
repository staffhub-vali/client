import axios from 'axios'
import { Logout } from '../../Auth'
import EmployeeProfile from '../../components/Employee/EmployeeProfile'
import { useParams } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import Container from '../../components/ui/Container'

interface EmployeeProfilePageProps {}

const EmployeeProfilePage: FC<EmployeeProfilePageProps> = ({}) => {
	const [employee, setEmployee] = useState(null)
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
		<Container
			size={'lg'}
			className='p-6'>
			{employee && <EmployeeProfile data={employee} />}
		</Container>
	)
}

export default EmployeeProfilePage
