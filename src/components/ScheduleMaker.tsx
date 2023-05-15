import axios from 'axios'
import Logout from '../Auth'
import { FC, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import TableSchedule from './TableSchedule'
import NewScheduleSearch from './NewScheduleSearch'
import moment from 'moment'

let now = moment().format('LLL')

console.log(now)

interface ScheduleMakerProps {
	id: string
	setId: (id: string) => void
	name: string
	setName: (name: string) => void
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

const ScheduleMaker: FC<ScheduleMakerProps> = ({ id, name, setName, setId, isOpen, setIsOpen }) => {
	const [data, setData] = useState<any[]>([])
	const [value, setValue] = useState(new Date())
	const currentDate = new Date()
	const [month, setMonth] = useState(() => {
		const month = currentDate.getMonth() + 2
		return `${currentDate.getFullYear()}-${month < 10 ? `0${month}` : month}`
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

	const updateMonthData = (date: Date, currentData: any) => {
		const year = date.getFullYear()
		const monthIndex = date.getMonth()
		const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

		const data = new Array(daysInMonth).fill(null).map((_, index) => {
			const day = index + 1
			const dateUnixTimestamp = new Date(year, monthIndex, day).getTime() / 1000

			// Check whether the date already has a shift assigned to it
			const existingShift = currentData.find(
				(shift: { date: number }) => Math.floor(shift.date / 1000) === dateUnixTimestamp,
			)

			if (existingShift) {
				return existingShift
			}

			// Assign a random shift to the date
			const startHour = 6
			const startMinute = 0
			const endHour = 14
			const endMinute = 0
			const hasShift = Math.random() >= 0.5

			const start = hasShift ? new Date(year, monthIndex, day, startHour, startMinute).getTime() / 1000 : null
			const end = hasShift ? new Date(year, monthIndex, day, endHour, endMinute).getTime() / 1000 : null
			let total = null
			if (start && end) {
				const minutes = Math.round((end - start) / 60)
				total = minutes
			}

			return {
				date: dateUnixTimestamp,
				start,
				end,
				total,
			}
		})

		return data
	}

	console.log(data)

	return (
		<div className='mt-6 flex h-full w-full justify-evenly overflow-hidden'>
			<div className='flex flex-col items-center space-y-4'>
				<NewScheduleSearch
					setId={setId}
					name={name}
					isOpen={isOpen}
					setName={setName}
					setIsOpen={setIsOpen}
				/>
				<Calendar
					view='month'
					value={value}
					maxDetail='year'
					className='h-fit'
					views={['month']}
					onChange={handleMonthChange}
				/>

				<button
					className='rounded bg-black px-8 py-2 text-2xl text-white active:scale-95 '
					onClick={createSchedule}>
					Submit
				</button>
			</div>
			{data.length > 0 && <TableSchedule data={data} />}
		</div>
	)
}

export default ScheduleMaker
