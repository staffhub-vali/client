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
	const [shifts, setShifts] = useState([])
	const [showDropdown, setShowDropdown] = useState<boolean>(false)

	useEffect(() => {
		fetchShifts()
		fetchProfile()
	}, [edit])

	const fetchProfile = async () => {
		const token = localStorage.getItem('token')
		try {
			const { data } = await axios.get(`http://localhost:8080/v1/employees/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setEmployee(data)
		} catch (error: any) {
			console.log(error)
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	const fetchShifts = async () => {
		const token = localStorage.getItem('token')
		try {
			const { data } = await axios.get(`http://localhost:8080/v1/shifts?employeeId=${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setShifts(data)
		} catch (error: any) {
			console.log(error)
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<div onClick={() => showDropdown && setShowDropdown(false)}>
			{employee && edit ? (
				<EditEmployee
					setEdit={setEdit}
					data={employee}
				/>
			) : (
				employee && (
					<EmployeeProfile
						showDropdown={showDropdown}
						setShowDropdown={setShowDropdown}
						shifts={shifts}
						data={employee}
						setEdit={setEdit}
					/>
				)
			)}
		</div>
	)
}

export default EmployeeProfilePage
