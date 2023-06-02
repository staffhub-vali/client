import axios from 'axios'
import { Logout } from '../../Auth'
import EditEmployee from '../../components/Employee/EditEmployee'
import { useParams } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import Container from '../../components/ui/Container'
import EmployeeProfile from '../../components/Employee/EmployeeProfile'

interface EmployeeProfilePageProps {}

const EmployeeProfilePage: FC<EmployeeProfilePageProps> = ({}) => {
	const { id } = useParams()
	const [edit, setEdit] = useState(false)
	const [employee, setEmployee] = useState(null)

	useEffect(() => {
		fetchProfile()
	}, [edit, employee])

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
			{employee && edit ? (
				<EditEmployee
					setEdit={setEdit}
					data={employee}
				/>
			) : (
				employee && (
					<EmployeeProfile
						data={employee}
						setEdit={setEdit}
					/>
				)
			)}
		</Container>
	)
}

export default EmployeeProfilePage
