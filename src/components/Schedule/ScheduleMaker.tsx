import axios from 'axios'
import Button from '../ui/Button.tsx'
import Heading from '../ui/Heading.tsx'
import { Logout } from '../../Auth.tsx'
import { Check } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import Container from '../ui/Container.tsx'
import 'react-calendar/dist/Calendar.css'
import ScheduleTable from './ScheduleTable.tsx'
import Notification from '../ui/Notification.tsx'
import SearchEmployees from './SearchEmployees.tsx'
import { formatDate, formatMonth } from '../../utils/DateFormatting.ts'
import Paragraph from '../ui/Paragraph.tsx'
import { calculateMonthlyHours, calculateTotalHours } from '../../utils/CalculateHours.ts'

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
	const [mergedData, setMergedData] = useState<WorkDay[]>([])
	const [message, setMessage] = useState<string | null>(null)
	const [yearArray, setYearArray] = useState<{ date: number }[]>([])

	const [month, setMonth] = useState(() => {
		const month = currentDate.getMonth() + 2
		return `${currentDate.getFullYear()}-${month < 10 ? `0${month}` : month}`
	})

	useEffect(() => {
		setMergedData(mergeObjectsByDate(yearArray, schedule))
	}, [schedule])

	const createSchedule = async () => {
		setLoading(true)

		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/roster`,
				{
					id,
					data: mergedData,
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
		setYearArray(generateYearArray(year))

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

	const generateYearArray = (year: number) => {
		const daysInYear = 365 + (isLeapYear(year) ? 1 : 0)
		const startOfYear = new Date(year, 0, 1)
		const yearArray = []

		for (let i = 0; i < daysInYear; i++) {
			const currentDate = new Date(startOfYear.getTime() + i * 24 * 60 * 60 * 1000)
			yearArray.push({ date: currentDate.getTime() / 1000 })
		}

		return yearArray
	}

	const isLeapYear = (year: number) => {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
	}

	const mergeObjectsByDate = (yearArray: { date: number }[], monthArray: WorkDay[]) => {
		const mergedArray = yearArray.map((obj1) => {
			const obj2 = monthArray.find((obj) => formatDate(obj.date) === formatDate(obj1.date))
			if (obj2) {
				return { ...obj1, ...obj2 }
			}
			return obj1
		})

		return mergedArray
	}

	return (
		<Container
			size={'lg'}
			className='flex flex-row justify-evenly p-0'>
			<div className='slide-in-bottom-h1 mt-2 flex h-[36rem] flex-col items-center space-y-4'>
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
					className='w-full text-2xl'
					title='Create schedule'
					onClick={createSchedule}>
					Create schedule{' '}
					{
						<Check
							size={30}
							className='ml-10'
						/>
					}
				</Button>
			</div>
			<div className='mt-4 h-[36rem] w-[82rem]'>
				{schedule.length > 0 ? (
					<>
						{name ? (
							<Heading
								size={'xs'}
								className='mb-2 text-center font-normal'>
								{name} - {formatMonth(schedule[0].date)} - ( {calculateTotalHours(schedule)} hours )
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
						{shiftPreferences.length > 0 ? (
							<div className='mt-4 rounded-md border border-slate-300 pb-2 shadow-lg'>
								<Heading
									size={'xs'}
									className='mb-4 rounded-t-md border-b-2 border-slate-300 bg-white py-2 text-center font-normal'>
									Shift preferences:
								</Heading>
								<div className='flex flex-wrap justify-evenly'>
									{shiftPreferences.map((preference) => (
										<Paragraph
											size={'xl'}
											className='mb-2 h-fit w-[27.2rem] rounded-md bg-white p-1 text-center font-normal shadow-md'>
											{preference}
										</Paragraph>
									))}
								</div>
							</div>
						) : (
							name && (
								<Heading
									size={'xs'}
									className='slide-in-bottom mt-4 text-center font-normal'>
									This employee has no shift preferences.
								</Heading>
							)
						)}
					</>
				) : (
					<Heading className='slide-in-bottom mt-48 text-center font-normal text-slate-500 dark:text-slate-400'>
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
