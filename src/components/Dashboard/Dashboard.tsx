import { FC } from 'react'
import Button from '../ui/Button'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../utils/DateFormatting'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { WorkDay } from '../../pages/Dashboard/DashboardPage'
import Heading from '../ui/Heading'

interface DashboardProps {
	setSkip: any
	skip: number
	count: number
	data: WorkDay[]
}

const Dashboard: FC<DashboardProps> = ({ data, skip, setSkip, count }) => {
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
				<Heading
					className='w-48 text-center'
					size={'xs'}>
					Monday
				</Heading>
				<Heading
					className='w-48 text-center'
					size={'xs'}>
					Tuesday
				</Heading>
				<Heading
					className='w-48 text-center'
					size={'xs'}>
					Wednesday
				</Heading>
				<Heading
					className='w-48 text-center'
					size={'xs'}>
					Thursday
				</Heading>
				<Heading
					className='w-48 text-center'
					size={'xs'}>
					Friday
				</Heading>
				<Heading
					className='w-48 text-center'
					size={'xs'}>
					Saturday
				</Heading>
				<Heading
					className='w-48 text-center'
					size={'xs'}>
					Sunday
				</Heading>
			</div>
			<div className='grid grid-cols-7 space-x-6'>
				{data.map((day: WorkDay) => (
					<Paragraph
						size={'xl'}
						key={day._id}
						className='w-48 cursor-pointer py-2 text-center hover:text-sky-500'
						onClick={() => navigate(`/days/${day._id}`)}>
						{day && formatDate(day.date)}
					</Paragraph>
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
