import axios from 'axios'
import Logout from '../../Auth'
import Button from '../ui/Button'
import { FC, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import TableSchedule from './TableSchedule'
import ScheduleEmployeeSearch from './ScheduleEmployeeSearch'

interface Employee {
	_id: string
	name: string
}

interface ScheduleMakerProps {
	id: string
	setId: (id: string) => void
	name: string
	setName: (name: string) => void
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	employees: Employee[]
}

const ScheduleMaker: FC<ScheduleMakerProps> = ({
	id,
	name,
	employees,
	setName,
	setId,
	isOpen,
	setIsOpen,
}) => {
	const currentDate = new Date()
	const [data, setData] = useState<any[]>([])
	const [value, setValue] = useState(new Date())
	const [isLoading, setIsLoading] = useState<boolean>(false)

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
					employees={employees}
					setIsOpen={setIsOpen}
				/>
				<Calendar
					value={value}
					view={'month'}
					maxDetail='year'
					className='h-fit'
					onChange={handleMonthChange}
				/>
				<Button
					size={'lg'}
					isLoading={isLoading}
					onClick={createSchedule}>
					Submit
				</Button>
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
