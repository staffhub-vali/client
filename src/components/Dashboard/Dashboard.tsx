import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Container from '../ui/Container'
import Paragraph from '../ui/Paragraph'
import { useNavigate } from 'react-router-dom'
import groupShifts from '../../utils/GroupShifts'
import { Dispatch, FC, SetStateAction } from 'react'
import { WorkDay } from '../../pages/Dashboard/DashboardPage'
import { ChevronLeft, ChevronRight, ScrollText, User, X } from 'lucide-react'
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
			className='dashboard p-0 pt-20'>
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
							{groupShifts(day.shifts).length > 0 ? (
								groupShifts(day.shifts).map((groupedShift) => (
									<Paragraph
										className='flex items-center'
										title={`${day.shifts.length} ${day.shifts.length === 1 ? 'shift' : 'shifts'} `}
										key={`${groupedShift.start}-${groupedShift.end}`}>
										<div className='mr-3 flex'>
											{`${groupedShift.count}`} <User className='font-normal' />
										</div>
										{`${formatTime(groupedShift.start)} - ${formatTime(groupedShift.end)}`}
									</Paragraph>
								))
							) : (
								<Paragraph className='flex items-center'>
									<X className='mr-2' />
									No Shifts
								</Paragraph>
							)}
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
					title='Previous Week'
					onClick={handlePrevPage}
					className='mr-1 rounded-lg bg-slate-200 px-3 py-2 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600'>
					{<ChevronLeft size={36} />}
				</Button>

				<Button
					variant={'link'}
					title='Next Week'
					onClick={handleNextPage}
					className='mr-1 rounded-lg bg-slate-200 px-3 py-2 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600'>
					{<ChevronRight size={36} />}
				</Button>
			</div>
		</Container>
	)
}

export default Dashboard
