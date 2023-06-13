import Heading from '../../../ui/Heading'
import Container from '../../../ui/Container'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { formatDate, formatDay, formatMonth, formatTime } from '../../../../utils/DateFormatting'
import { calculateMonthlyHours, calculateTotalHours } from '../../../../utils/CalculateHours'
import Paragraph from '../../../ui/Paragraph'
import { Link, useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar'

interface ScheduleProps {
	employee: {
		_id: string
		name: string
		email: string
		phone: string
		notes: string[]
		shiftPreferences: string[]
		vacationDays: number | string
	}
	shifts: Shift[]
	loading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

interface Shift {
	_id: string
	start: number
	end: number
	employee: string
	workDay: { date: number; _id: string }
}

const Schedule: FC<ScheduleProps> = ({ loading, setError, setMessage, employee, setLoading, shifts }) => {
	const navigate = useNavigate()

	const [value, setValue] = useState(new Date())
	const [filteredShifts, setFilteredShifts] = useState<Shift[]>(shifts)
	const [month, setMonth] = useState<string | null>(null)

	const handleMonthChange: any = (date: Date) => {
		setValue(date)
		setMonth(formatMonth(value.getTime() / 1000))
		const filteredShifts = shifts.filter((shift) => {
			const startTimestamp = shift.start
			const startDate = new Date(startTimestamp * 1000)
			const startMonth = startDate.getMonth()

			return startMonth === date.getMonth()
		})

		setFilteredShifts(filteredShifts)
	}

	return (
		<Container size={'lg'}>
			<Heading size={'sm'}>{employee.name}</Heading>

			<Heading
				size={'xs'}
				className='my-3 w-full border-b-2 p-4 text-center font-normal'>
				Total hours for {formatMonth(new Date().getTime() / 1000)} - {calculateMonthlyHours(shifts)}
			</Heading>

			<div className='mt-4 flex w-full'>
				<div
					className={`${
						filteredShifts.length > 0 ? 'overflow-y-scroll border bg-white shadow' : 'border-none'
					}  mx-auto h-[37rem] overflow-x-hidden rounded border`}>
					{filteredShifts.length <= 0 && (
						<Heading
							size={'sm'}
							className='mx-auto mt-36 w-[48.5rem] text-center'>
							There are no shifts for {formatMonth(value.getTime() / 1000)}
						</Heading>
					)}
					{filteredShifts.length > 0 && month && (
						<Heading
							size={'sm'}
							className='border-b-2 bg-white pb-3 pt-6 text-center font-normal'>
							{formatMonth(value.getTime() / 1000)} - {filteredShifts.length}{' '}
							{filteredShifts.length === 1 ? 'Shift' : 'Shifts'} ({calculateTotalHours(filteredShifts)} hours)
						</Heading>
					)}
					{!month && filteredShifts.length > 0 && (
						<Heading
							size={'sm'}
							className='border-b-2 bg-white pb-3 pt-6 text-center font-normal'>
							All shifts
						</Heading>
					)}
					{filteredShifts.length > 0 &&
						filteredShifts.map((shift, index) => (
							<div
								key={shift._id}
								onClick={() => navigate(`/days/${shift.workDay._id}`)}
								className={`group flex w-[48rem] cursor-pointer items-center space-y-4 border-b-2 ${
									index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
								} py-2`}>
								<div className='mx-auto flex flex-col items-center group-hover:text-sky-500'>
									{formatDay(shift.workDay.date)}
									<Paragraph
										className='group-hover:text-sky-500'
										size={'xl'}>
										{formatDate(shift.workDay.date)}
									</Paragraph>
								</div>

								<Paragraph
									size={'xl'}
									className='mx-auto pb-2 group-hover:text-sky-500'>
									{formatTime(shift.start)} - {formatTime(shift.end)}
								</Paragraph>
							</div>
						))}
				</div>
				<div className='mx-auto mt-24'>
					<Calendar
						value={value}
						view={'month'}
						maxDetail='year'
						className='h-fit'
						onChange={handleMonthChange}
					/>
				</div>
			</div>
		</Container>
	)
}

export default Schedule
