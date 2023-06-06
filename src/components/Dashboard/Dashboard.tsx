import { FC } from 'react'
import Button from '../ui/Button'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatDay, formatTime } from '../../utils/DateFormatting'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'
import { WorkDay } from '../../pages/Dashboard/DashboardPage'
import Heading from '../ui/Heading'
import groupShifts from '../../utils/GroupShifts'

interface DashboardProps {
	setSkip: any
	skip: number
	data: WorkDay[]
}

const Dashboard: FC<DashboardProps> = ({ data, skip, setSkip }) => {
	const navigate = useNavigate()

	const handlePrevPage = () => {
		setSkip(skip - 1)
	}

	const handleNextPage = () => {
		setSkip(skip + 1)
	}

	return (
		<Container size={'lg'}>
			<div className='grid grid-cols-7 space-x-6'>
				{data.map((day: WorkDay) => (
					<div
						className='flex flex-col items-center'
						key={day._id}>
						<Heading size={'xs'}>{formatDay(day.date)}</Heading>
						<Paragraph
							size={'xl'}
							className=' cursor-pointer border-b-2 px-14 py-2 text-center hover:text-sky-500'
							onClick={() => navigate(`/days/${day._id}`)}>
							{day && formatDate(day.date)}
						</Paragraph>

						<div className='mt-4 flex flex-col items-center'>
							{groupShifts(day.shifts).map((groupedShift) => (
								<Paragraph
									title={groupedShift.employee.name}
									className='flex'
									key={`${groupedShift.start}-${groupedShift.end}`}>
									<div className='mr-3 flex'>
										{`${groupedShift.count}`} <User className='font-normal' />
									</div>
									{`${formatTime(groupedShift.start)} - ${formatTime(groupedShift.end)}`}
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
