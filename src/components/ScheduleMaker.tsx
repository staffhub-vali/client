import axios from 'axios'
import Logout from '../Auth'
import { FC, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import TableSchedule from './TableSchedule'
import ScheduleEmployeeSearch from './ScheduleEmployeeSearch'
import { Loader2 } from 'lucide-react'

interface ScheduleMakerProps {
	id: string
	setId: (id: string) => void
	name: string
	setName: (name: string) => void
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

const ScheduleMaker: FC<ScheduleMakerProps> = ({ id, name, setName, setId, isOpen, setIsOpen }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
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
			setIsLoading(true)
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
			setIsLoading(false)
			console.log(response.data.message)
		} catch (error: any) {
			setIsLoading(false)
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
		<div className='mt-4 grid h-full w-full grid-cols-12 '>
			<div className='col-span-4 col-start-2 mt-12 flex w-fit flex-col items-center space-y-4'>
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
					className='w-40 rounded bg-black py-2 text-2xl text-white active:scale-95 dark:bg-white dark:text-black '
					onClick={createSchedule}>
					{isLoading ? <Loader2 className='mx-auto h-8 w-8 animate-spin' /> : 'Submit'}
				</button>
			</div>
			<div className='col-span-6 col-start-6'>
				{data.length > 0 ? (
					<>
						{name ? (
							<h2 className='mb-2 text-center text-4xl text-slate-800 dark:text-slate-200'>{name}</h2>
						) : (
							<h2 className='h-12'></h2>
						)}
						<TableSchedule
							data={data}
							setData={setData}
						/>
					</>
				) : (
					<div className='col-span-6 col-start-6 pt-48'>
						<p className='text-center text-4xl text-gray-500 dark:text-slate-400'>
							Pick a month and an employee
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default ScheduleMaker
