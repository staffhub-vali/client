import axios from 'axios'
import Logout from '../Auth'
import Table from './ui/Table'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { FC, useMemo, useState } from 'react'
import NewScheduleSearch from './NewScheduleSearch'

interface ScheduleMakerProps {
	id: string
	setId: (id: string) => void
	name: string
	setName: (name: string) => void
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

const headings = ['Date', 'Start', 'End']

const ScheduleMaker: FC<ScheduleMakerProps> = ({ id, name, setName, setId, isOpen, setIsOpen }) => {
	const [value, setValue] = useState(new Date())
	console.log(value)
	const currentDate = new Date()
	const [month, setMonth] = useState(() => {
		// Set the default month to the current month + 1
		const month = currentDate.getMonth() + 2
		return `${currentDate.getFullYear()}-${month < 10 ? `0${month}` : month}`
	})

	const [data, setData] = useState(() => {
		const year = parseInt(month.slice(0, 4))
		const monthIndex = parseInt(month.slice(5)) - 1
		const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

		const data = new Array(daysInMonth).fill(null).map((_, index) => {
			const date = new Date(year, monthIndex, index + 1)
			const formattedDate = date.toLocaleDateString('en-GB')
			return {
				date: formattedDate,
				start: '',
				end: '',
			}
		})

		// randomly fill in 21 days with shifts
		const daysToFill = 21
		const start = '06:00'
		const end = '14:00'
		const daysFilled = new Set<number>()
		while (daysFilled.size < daysToFill) {
			const dayToFill = Math.floor(Math.random() * daysInMonth) + 1
			if (!daysFilled.has(dayToFill)) {
				daysFilled.add(dayToFill)
				data[dayToFill - 1] = {
					date: data[dayToFill - 1].date,
					start: start,
					end: end,
				}
			}
		}

		return data
	})

	const createSchedule = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.post(
				`http://localhost:8080/v1/roster`,
				{
					id,
					data,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			return response.data
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
			console.error(error)
		}
	}

	const handleMonthChange = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		setMonth(`${year}-${month < 10 ? `0${month}` : month}`)

		setData((currentData) => updateMonthData(date, currentData))
	}

	const updateMonthData = (date: Date, currentData: any[]) => {
		const year = date.getFullYear()
		const monthIndex = date.getMonth()
		const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

		const data = new Array(daysInMonth).fill(null).map((_, index) => {
			const day = index + 1
			const date = new Date(year, monthIndex, day)
			const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '/')

			// Check whether the date already has a shift assigned to it
			const existingShift = currentData.find((shift: { date: string }) => shift.date === formattedDate)

			if (existingShift) {
				return existingShift
			}

			// Assign a random shift to the date
			const start = '06:00'
			const end = '14:00'
			const hasShift = Math.random() >= 0.5

			return {
				date: formattedDate,
				start: hasShift ? start : '',
				end: hasShift ? end : '',
			}
		})

		return data
	}

	return (
		<>
			<div className='mt-6 flex w-full justify-evenly'>
				<div className='flex flex-col items-center space-y-4'>
					<h2 className='text-2xl'>{name}</h2>
					<NewScheduleSearch
						setId={setId}
						isOpen={isOpen}
						setName={setName}
						setIsOpen={setIsOpen}
						name={''}
					/>
					<Calendar
						view='month'
						value={value}
						maxDetail='year'
						className='h-fit'
						views={['month']}
						onChange={handleMonthChange}
					/>
				</div>

				<Table
					data={data}
					editable={true}
					searchBar={false}
					headings={headings}
				/>
			</div>
			<button onClick={createSchedule}>Submit</button>
		</>
	)
}

export default ScheduleMaker
