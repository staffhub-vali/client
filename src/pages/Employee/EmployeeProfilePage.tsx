import axios from 'axios'
import { Logout } from '../../Auth'
import { useParams } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import EditNotes from '../../components/Employee/EditNotes'
import EditEmployee from '../../components/Employee/EditEmployee'
import EmployeeProfile from '../../components/Employee/EmployeeProfile'
import EditShiftPreferences from '../../components/Employee/EditShiftPreferences'
import Notification from '../../components/ui/Notification'

interface EmployeeProfilePageProps {}

const EmployeeProfilePage: FC<EmployeeProfilePageProps> = ({}) => {
	const { id } = useParams()
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [shifts, setShifts] = useState([])
	const [employee, setEmployee] = useState(null)
	const [editInfo, setEditInfo] = useState<boolean>(false)
	const [editNotes, setEditNotes] = useState<boolean>(false)
	const [editVacation, setEditVacation] = useState<boolean>(false)
	const [editPreferences, setEditPreferences] = useState<boolean>(false)
	const [showDropdown, setShowDropdown] = useState<boolean>(false)

	useEffect(() => {
		fetchShifts()
		fetchProfile()
	}, [loading])

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
			{employee && editInfo && (
				<EditEmployee
					data={employee}
					setEdit={setEditInfo}
				/>
			)}
			{employee && editPreferences && (
				<EditShiftPreferences
					data={employee}
					setEdit={setEditPreferences}
				/>
			)}
			{employee && editNotes && (
				<EditNotes
					loading={loading}
					setError={setError}
					setLoading={setLoading}
					setMessage={setMessage}
					employee={employee}
					setEdit={setEditNotes}
				/>
			)}
			{employee && !editInfo && !editNotes && (
				<EmployeeProfile
					shifts={shifts}
					data={employee}
					setEditNotes={setEditNotes}
					setEditInfo={setEditInfo}
					setEditPreferences={setEditPreferences}
					showDropdown={showDropdown}
					setShowDropdown={setShowDropdown}
				/>
			)}

			{message && (
				<Notification
					size={'lg'}
					position={'bottom'}>
					{message}
				</Notification>
			)}
			{error && (
				<Notification
					size={'lg'}
					variant={'error'}
					position={'bottom'}>
					{error}
				</Notification>
			)}
		</div>
	)
}

export default EmployeeProfilePage
