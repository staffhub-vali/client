import axios from 'axios'
import { Logout } from '../../Auth.tsx'
import { useEffect, useState } from 'react'
import Container from '../../components/ui/Container.tsx'
import { useLocation, useParams } from 'react-router-dom'
import Notification from '../../components/ui/Notification.tsx'
import Schedule from '../../components/EmployeeProfile/Schedule/Schedule.tsx'
import NotesList from '../../components/EmployeeProfile/Notes/NotesList.tsx'
import { formatMonth, getMonthBoundaryTimestamps } from '../../utils/DateFormatting.ts'
import EmployeeProfile from '../../components/EmployeeProfile/EmployeeProfile.tsx'
import VacationList from '../../components/EmployeeProfile/Vacation/VacationList.tsx'
import PersonalInfo from '../../components/EmployeeProfile/PersonalInfo/PersonalInfo.tsx'
import ShiftPreferencesList from '../../components/EmployeeProfile/ShiftPreferences/ShiftPreferencesList.tsx'

interface WorkDay {
	_id: string
	shifts: Shift[]
	date: number
}

interface Shift {
	_id: string
	start: number
	end: number
	employee: string
	workDay: WorkDay
}

interface Employee {
	_id: string
	name: string
	email: string
	phone: string
	notes: string[]
	address: string
	vacationDays: number
	sickDays: number | string
	shiftPreferences: string[]
	vacations: [{ start: number; end: number }]
}

const EmployeeProfilePage = () => {
	const { id } = useParams()
	const [employee, setEmployee] = useState<Employee | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [workDays, setWorkDays] = useState<WorkDay[]>([])
	const [message, setMessage] = useState<string | null>(null)
	const [showDropdown, setShowDropdown] = useState<boolean>(false)
	const [month, setMonth] = useState<string | null>(null)

	const [value, setValue] = useState<Date | null>(null)

	const location = useLocation()

	const isNotes: boolean = location.pathname.includes('/notes')
	const isAbout: boolean = location.pathname.includes('/about')
	const isVacation: boolean = location.pathname.includes('/vacation')
	const isSchedule: boolean = location.pathname.includes('/schedule')
	const isPreferences: boolean = location.pathname.includes('/preferences')

	useEffect(() => {
		fetchShifts()
		fetchProfile()
	}, [value, loading])

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
		if (value) {
			const token = localStorage.getItem('token')
			const [startOfMonth, endOfMonth] = getMonthBoundaryTimestamps(value)

			setMonth(formatMonth(value.getTime() / 1000))

			try {
				const { data } = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/shifts?employeeId=${id}&start=${startOfMonth}&end=${endOfMonth}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				)
				const newData = await filterDays(data)
				setWorkDays(newData)
			} catch (error: any) {
				console.log(error)
				if (error.response.status === 401) {
					Logout()
				}
			}
		}
	}

	const filterDays = async (workDays: WorkDay[]) => {
		const filteredDays = workDays.map((workDay) => {
			const filteredShift = workDay.shifts.filter((shift) => shift.employee === employee?._id)
			const filteredDay = { ...workDay, shifts: filteredShift }
			return filteredDay
		})

		return filteredDays
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
					value={value}
					month={month}
					workDays={workDays}
					loading={loading}
					setValue={setValue}
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
					workDays={workDays}
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
