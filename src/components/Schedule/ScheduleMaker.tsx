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
	shiftPreferences: string[]
}

interface ScheduleMakerProps {
	id: string
	name: string
	isOpen: boolean
	employees: Employee[]
	shiftPreferences: string[]
	setId: Dispatch<SetStateAction<string>>
	setName: Dispatch<SetStateAction<string>>
	setIsOpen: Dispatch<SetStateAction<boolean>>
	setShiftPreferences: Dispatch<SetStateAction<string[]>>
}

interface WorkDay {
	start?: number
	end?: number
	total?: number
	date: number
}

const ScheduleMaker: FC<ScheduleMakerProps> = ({
	id,
	name,
	employees,
	setName,
	setId,
	isOpen,
	setIsOpen,
	shiftPreferences,
	setShiftPreferences,
}) => {
	const currentDate = new Date()
	const [value, setValue] = useState<Date | null>(null)
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
		setValue(date)
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
			className='flex flex-row justify-evenly p-0'>
			<div className='mt-16 flex h-[36rem] flex-col items-center space-y-4'>
				<SearchEmployees
					name={name}
					setId={setId}
					inputSize='lg'
					isOpen={isOpen}
					setName={setName}
					employees={employees}
					setIsOpen={setIsOpen}
					setShiftPreferences={setShiftPreferences}
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
			<div className='mt-16 h-[36rem] w-[82rem]'>
				{schedule.length > 0 ? (
					<>
						{name ? (
							<Heading
								size={'xs'}
								className='mb-2 text-center font-normal'>
								{name} - {formatMonth(schedule[0].date)}
							</Heading>
						) : (
							<Heading
								size={'xs'}
								className='mb-2 text-center font-normal'>
								Choose an employee.
							</Heading>
						)}
						<ScheduleTable
							data={schedule}
							setData={setSchedule}
						/>
						{shiftPreferences.length > 0
							? shiftPreferences.map((preference) => (
									<Heading
										size={'xs'}
										className='mt-4 text-center font-normal'>
										{preference}
									</Heading>
							  ))
							: name && (
									<Heading
										size={'xs'}
										className='mt-4 text-center font-normal'>
										This employee has no shift preferences.
									</Heading>
							  )}
					</>
				) : (
					<Heading
						size={'sm'}
						className='mt-48 text-center font-normal text-slate-500 dark:text-slate-400'>
						Pick a month and an employee.
					</Heading>
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
