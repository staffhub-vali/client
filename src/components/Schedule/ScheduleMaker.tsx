import axios from 'axios'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import { Logout } from '../../Auth'
import { Check } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import Calendar from 'react-calendar'
import Container from '../ui/Container'
import 'react-calendar/dist/Calendar.css'
import ScheduleTable from './ScheduleTable'
import Notification from '../ui/Notification'
import SearchEmployees from './SearchEmployees'
import { formatMonth } from '../../utils/DateFormatting'

interface Employee {
	_id: string
	name: string
}

interface ScheduleMakerProps {
	id: string
	name: string
	isOpen: boolean
	employees: Employee[]
	setId: Dispatch<SetStateAction<string>>
	setName: Dispatch<SetStateAction<string>>
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface WorkDay {
	start?: number
	end?: number
	total?: number
	date: number
}

const ScheduleMaker: FC<ScheduleMakerProps> = ({ id, name, employees, setName, setId, isOpen, setIsOpen }) => {
	const currentDate = new Date()
	const [value, setValue] = useState(new Date())
	const [loading, setLoading] = useState<boolean>(false)
	const [schedule, setSchedule] = useState<WorkDay[]>([])
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)

	const [month, setMonth] = useState(() => {
		const month = currentDate.getMonth() + 2
		return `${currentDate.getFullYear()}-${month < 10 ? `0${month}` : month}`
	})

	const createSchedule = async () => {
		setLoading(true)

		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				`http://localhost:8080/v1/roster`,
				{
					id,
					data: schedule,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setMessage(data.message)
		} catch (error: any) {
			setError(error.response.data.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
		}
	}

	const handleMonthChange: any = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		setMonth(`${year}-${month < 10 ? `0${month}` : month}`)
		setSchedule(() => updateMonthData(date))
	}

	const updateMonthData = (date: Date): WorkDay[] => {
		const year = date.getFullYear()
		const monthIndex = date.getMonth()
		const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

		const data: WorkDay[] = new Array(daysInMonth).fill(null).map((_, index) => {
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
				{schedule.length > 0 ? (
					<>
						{name ? (
							<Heading
								size={'sm'}
								className='pb-2 text-center'>
								{name} - {formatMonth(schedule[0].date)}
							</Heading>
						) : (
							<Heading
								size={'sm'}
								className='pb-2 text-center'>
								Choose an employee
							</Heading>
						)}
						<ScheduleTable
							data={schedule}
							setData={setSchedule}
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
