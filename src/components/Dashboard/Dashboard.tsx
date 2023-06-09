import { Dispatch, FC, SetStateAction } from 'react'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Container from '../ui/Container'
import Paragraph from '../ui/Paragraph'
import { useNavigate } from 'react-router-dom'
import groupShifts from '../../utils/GroupShifts'
import { WorkDay } from '../../pages/Dashboard/DashboardPage'
import { ChevronLeft, ChevronRight, ScrollText, User } from 'lucide-react'
import { formatDate, formatDay, formatTime } from '../../utils/DateFormatting'

interface DashboardProps {
	skip: number
	data: WorkDay[]
	setSkip: Dispatch<SetStateAction<number>>
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
		<Container
			size={'lg'}
			className='p-0 pt-20'>
			<div className='flex min-h-[36rem] rounded border bg-white shadow dark:border-slate-600 dark:bg-slate-700'>
				{data.map((day: WorkDay) => (
					<div
						className='group flex w-64 cursor-pointer flex-col items-center border-x dark:border-slate-600'
						key={day._id}
						onClick={() => navigate(`/days/${day._id}`)}>
						<div className='w-full text-center'>
							<Heading
								className='px-3 pt-6 transition-colors duration-75 group-hover:text-sky-500'
								size={'xs'}>
								{formatDay(day.date)}
							</Heading>
							<Paragraph
								size={'xl'}
								className=' w-full cursor-pointer border-b-2 py-2 text-center group-hover:text-sky-400 dark:border-slate-600'>
								{day && formatDate(day.date)}
							</Paragraph>
						</div>
						<div className='mt-4 flex w-full flex-col items-center'>
							{groupShifts(day.shifts).map((groupedShift) => (
								<Paragraph
									className='flex'
									title={groupedShift.employee.name}
									key={`${groupedShift.start}-${groupedShift.end}`}>
									<div className='mr-3 flex'>
										{`${groupedShift.count}`} <User className='font-normal' />
									</div>
									{`${formatTime(groupedShift.start)} - ${formatTime(groupedShift.end)}`}
								</Paragraph>
							))}
						</div>

						<Paragraph className='mt-auto flex items-center pb-2 text-2xl'>
							{day.notes.length} <ScrollText className='ml-2 h-6 w-6' />
						</Paragraph>
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
