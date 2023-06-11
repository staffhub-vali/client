import Heading from '../../../ui/Heading'
import Container from '../../../ui/Container'
import { Dispatch, FC, SetStateAction } from 'react'
import { formatDate, formatTime } from '../../../../utils/DateFormatting'
import { calculateMonthlyHours } from '../../../../utils/CalculateHours'
import Paragraph from '../../../ui/Paragraph'
import { Link, useNavigate } from 'react-router-dom'

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
	return (
		<Container size={'lg'}>
			<Heading size={'sm'}>{employee.name}</Heading>

			<Heading
				size={'xs'}
				className='my-3 w-full border-b-2 p-4 text-center font-normal'>
				Total hours for this month: {calculateMonthlyHours(shifts)}
			</Heading>
			{shifts.map((shift) => (
				<div
					key={shift._id}
					onClick={() => navigate(`/days/${shift.workDay._id}`)}
					className='group flex cursor-pointer items-center space-x-52 space-y-4 border-b-2 p-2'>
					<Paragraph
						className='mt-auto group-hover:text-sky-500'
						size={'xl'}>
						{formatDate(shift.workDay.date)}
					</Paragraph>
					<Paragraph
						size={'xl'}
						className='group-hover:text-sky-500'>
						{formatTime(shift.start)} - {formatTime(shift.end)}
					</Paragraph>
				</div>
			))}
		</Container>
	)
}

export default Schedule
