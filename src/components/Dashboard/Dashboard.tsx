import { FC } from 'react'
import Button from '../ui/Button'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatDay, formatTime } from '../../utils/DateFormatting'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'
import { WorkDay } from '../../pages/Dashboard/DashboardPage'
import Heading from '../ui/Heading'

interface DashboardProps {
	setSkip: any
	skip: number
	count: number
	data: WorkDay[]
}

interface Shift {
	start: number
	end: number
	employee: Employee
}

interface Employee {
	name: string
}

const Dashboard: FC<DashboardProps> = ({ data, skip, setSkip, count }) => {
	const navigate = useNavigate()

	const handlePrevPage = () => {
		setSkip(skip - 1)
	}

	const handleNextPage = () => {
		setSkip(skip + 1)
	}
	console.log(data)
	return (
		<Container size={'lg'}>
			<div className='grid grid-cols-7 space-x-6'>
				{data.map((day: WorkDay) => (
					<div className='flex flex-col items-center'>
						<Heading size={'xs'}>{formatDay(day.date)}</Heading>
						<Paragraph
							size={'xl'}
							key={day._id}
							className=' cursor-pointer py-2 text-center hover:text-sky-500'
							onClick={() => navigate(`/days/${day._id}`)}>
							{day && formatDate(day.date)}
						</Paragraph>

						<div className='flex flex-col items-center'>
							{day.shifts.map((shift: Shift) => (
								<Paragraph
									title={shift.employee.name}
									className='flex'>
									{' '}
									<User />
									{formatTime(shift.start) + '-' + formatTime(shift.end)}
								</Paragraph>
							))}
						</div>
					</div>
				))}
			</div>

			<div className='mt-12'>
				<Button
					variant={'link'}
					onClick={handlePrevPage}
					className='mr-1 rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300'>
					{<ChevronLeft />}
				</Button>

				<Button
					variant={'link'}
					onClick={handleNextPage}
					className='mr-1 rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300'>
					{<ChevronRight />}
				</Button>
			</div>
		</Container>
	)
}
export default Dashboard
