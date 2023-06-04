import { FC } from 'react'
import { WorkDay } from '../../pages/Dashboard/DashboardPage'
import { formatDate, formatDay } from '../../utils/DateFormatting'
import { useNavigate } from 'react-router-dom'
import Heading from '../ui/Heading'
import Paragraph from '../ui/Paragraph'

interface DashboardProps {
	data: WorkDay[]
}

const Dashboard: FC<DashboardProps> = ({ data }) => {
	const navigate = useNavigate()

	const weekDays: Record<string, WorkDay[]> = {
		Monday: [],
		Tuesday: [],
		Wednesday: [],
		Thursday: [],
		Friday: [],
		Saturday: [],
		Sunday: [],
	}

	data.forEach((day) => {
		weekDays[formatDay(day.date)].push(day)
	})

	const renderWeekDay = (day: string) => {
		return (
			<div key={day}>
				<Heading
					size='xs'
					className='my-6'>
					{day}
				</Heading>
				{weekDays[day].map((day: WorkDay) => (
					<Paragraph
						size='xl'
						key={day._id}
						onClick={() => navigate(`/days/${day._id}`)}
						className='cursor-pointer py-2 hover:text-sky-500'>
						{formatDate(day.date)}
					</Paragraph>
				))}
			</div>
		)
	}

	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

	return <div className='flex space-x-24 text-center'>{daysOfWeek.map(renderWeekDay)}</div>
}

export default Dashboard
