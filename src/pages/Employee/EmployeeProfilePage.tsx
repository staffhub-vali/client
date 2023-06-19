import axios from 'axios'
import { Logout } from '../../Auth.tsx'
import { useEffect, useState } from 'react'
import Container from '../../components/ui/Container.tsx'
import { useLocation, useParams } from 'react-router-dom'
import Notification from '../../components/ui/Notification.tsx'
import NotesList from '../../components/Employee/Edit/Notes/NotesList.tsx'
import EmployeeProfile from '../../components/Employee/EmployeeProfile.tsx'
import Schedule from '../../components/Employee/Schedule/Schedule.tsx'
import VacationList from '../../components/Employee/Edit/Vacation/VacationList.tsx'
import PersonalInfo from '../../components/Employee/Edit/PersonalInfo/PersonalInfo.tsx'
import ShiftPreferencesList from '../../components/Employee/Edit/ShiftPreferences/ShiftPreferencesList.tsx'

const EmployeeProfilePage = () => {
	const { id } = useParams()
	const [shifts, setShifts] = useState([])
	const [employee, setEmployee] = useState(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)
	const [showDropdown, setShowDropdown] = useState<boolean>(false)

	const location = useLocation()

	const isNotes: boolean = location.pathname.includes('/notes')
	const isAbout: boolean = location.pathname.includes('/about')
	const isVacation: boolean = location.pathname.includes('/vacation')
	const isSchedule: boolean = location.pathname.includes('/schedule')
	const isPreferences: boolean = location.pathname.includes('/preferences')

	useEffect(() => {
		fetchShifts()
		fetchProfile()
	}, [loading])

	useEffect(() => {
		let timeoutId: any = null

		clearTimeout(timeoutId)

		timeoutId = setTimeout(() => {
			setError(null)
			setMessage(null)
		}, 4000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [error, message])

	const fetchProfile = async () => {
		const token = localStorage.getItem('token')
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/employees/${id}`, {
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
			const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/shifts?employeeId=${id}`, {
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
		<Container
			size={'lg'}
			className='overflow-y-hidden p-4'
			onClick={() => showDropdown && setShowDropdown(false)}>
			{employee && isAbout && (
				<PersonalInfo
					loading={loading}
					employee={employee}
					setError={setError}
					setLoading={setLoading}
					setMessage={setMessage}
					showDropdown={showDropdown}
					setShowDropdown={setShowDropdown}
				/>
			)}
			{employee && isPreferences && (
				<ShiftPreferencesList
					loading={loading}
					setError={setError}
					employee={employee}
					setMessage={setMessage}
					setLoading={setLoading}
					showDropdown={showDropdown}
					setShowDropdown={setShowDropdown}
				/>
			)}
			{employee && isNotes && (
				<NotesList
					loading={loading}
					setError={setError}
					employee={employee}
					setLoading={setLoading}
					setMessage={setMessage}
					showDropdown={showDropdown}
					setShowDropdown={setShowDropdown}
				/>
			)}
			{employee && isVacation && (
				<VacationList
					loading={loading}
					setError={setError}
					employee={employee}
					setMessage={setMessage}
					setLoading={setLoading}
					showDropdown={showDropdown}
					setShowDropdown={setShowDropdown}
				/>
			)}
			{employee && isSchedule && (
				<Schedule
					shifts={shifts}
					loading={loading}
					setError={setError}
					employee={employee}
					setMessage={setMessage}
					setLoading={setLoading}
					showDropdown={showDropdown}
					setShowDropdown={setShowDropdown}
				/>
			)}
			{employee && !isNotes && !isAbout && !isPreferences && !isVacation && !isSchedule && (
				<EmployeeProfile
					shifts={shifts}
					employee={employee}
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
		</Container>
	)
}

export default EmployeeProfilePage
