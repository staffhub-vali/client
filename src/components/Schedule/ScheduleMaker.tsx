import axios from 'axios'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import { Logout } from '../../Auth'
import { FC, useState } from 'react'
import Calendar from 'react-calendar'
import Container from '../ui/Container'
import 'react-calendar/dist/Calendar.css'
import ScheduleTable from './ScheduleTable'
import Notification from '../ui/Notification'
import SearchEmployees from './SearchEmployees'
import { formatMonth } from '../../utils/DateFormatting'
import { Check } from 'lucide-react'

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

const ScheduleMaker: FC<ScheduleMakerProps> = ({ id, name, employees, setName, setId, isOpen, setIsOpen }) => {
	const currentDate = new Date()
	const [data, setData] = useState<any[]>([])
	const [value, setValue] = useState(new Date())
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [month, setMonth] = useState(() => {
		const month = currentDate.getMonth() + 2
		return `${currentDate.getFullYear()}-${month < 10 ? `0${month}` : month}`
	})

	const createSchedule = async () => {
		const token = localStorage.getItem('token')
		try {
			setLoading(true)
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
			setLoading(false)
			setError('')
			setMessage(response.data.message)
		} catch (error: any) {
			setLoading(false)
			if (error.response.status === 401) {
				Logout()
			}
			console.error(error)
			setMessage('')
			setError(error.response.data.message)
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
		<Container
			size={'lg'}
			className=' grid grid-cols-12 px-0 py-12 '>
			<div className='col-span-4 col-start-2 mt-14 flex w-fit flex-col items-center space-y-4'>
				<SearchEmployees
					name={name}
					setId={setId}
					inputSize='lg'
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
					loading={loading}
					onClick={createSchedule}>
					Submit {<Check className='ml-2 h-6 w-6' />}
				</Button>
			</div>
			<div className='col-span-6 col-start-6'>
				{data.length > 0 ? (
					<>
						{name ? (
							<Heading
								size={'sm'}
								className='pb-2 text-center'>
								{name} - {formatMonth(data[0].date)}
							</Heading>
						) : (
							<div className='h-12' />
						)}
						<ScheduleTable
							data={data}
							setData={setData}
						/>
					</>
				) : (
					<div className='col-span-6 col-start-6'>
						<Heading className='font-normal text-slate-500 dark:text-slate-400'>Pick a month and an employee</Heading>
					</div>
				)}
			</div>
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

export default ScheduleMaker
