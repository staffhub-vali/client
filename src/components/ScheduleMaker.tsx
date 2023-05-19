import axios from 'axios'
import Logout from '../Auth'
import { FC, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import TableSchedule from './TableSchedule'
import ScheduleEmployeeSearch from './ScheduleEmployeeSearch'

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

	const handleMonthChange: any = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		setMonth(`${year}-${month < 10 ? `0${month}` : month}`)
		setData(() => updateMonthData(date))
	}

	const updateMonthData = (date: Date) => {
		const year = date.getFullYear()
		const monthIndex = date.getMonth()
		const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

		const data = new Array(daysInMonth).fill(null).map((_, index) => {
			const day = index + 1
			const dateUnixTimestamp = new Date(year, monthIndex, day).getTime() / 1000

			return {
				date: dateUnixTimestamp,
			}
		})

		return data
	}

	return (
		<div className='mt-4 grid h-full w-full grid-cols-12 overflow-hidden'>
			<div className='col-span-4 mt-12 flex flex-col items-center space-y-4'>
				<ScheduleEmployeeSearch
					name={name}
					setId={setId}
					isOpen={isOpen}
					setName={setName}
					setIsOpen={setIsOpen}
				/>
				<Calendar
					value={value}
					maxDetail='year'
					className='h-fit'
					view={'month'}
					onChange={handleMonthChange}
				/>
				<button
					className='rounded bg-black px-8 py-2 text-2xl text-white active:scale-95 '
					onClick={createSchedule}>
					Submit
				</button>
			</div>
			<div className='col-span-6 col-start-6'>
				{data.length > 0 ? (
					<>
						{name ? <h2 className='mb-2 text-center text-4xl'>{name}</h2> : <h2 className='h-12'></h2>}
						<TableSchedule
							data={data}
							setData={setData}
						/>
					</>
				) : (
					<div className='col-span-6 col-start-6 pt-48'>
						<p className='text-center text-4xl text-gray-500'>Pick a month and an employee</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default ScheduleMaker
