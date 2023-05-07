import { FC } from 'react'
import Table from '../components/ui/Table'
import { Link } from 'react-router-dom'

interface SchedulesPageProps {}

const headings = ['Year', 'Month']
const data = [{ month: 'January', year: '2023' }]

const SchedulesPage: FC<SchedulesPageProps> = ({}) => {
	return (
		<div className='flex flex-col items-center pt-24'>
			<Table
				data={data}
				headings={headings}
			/>
			<Link
				className='mt-8 rounded bg-black px-8 py-2 text-2xl text-white active:scale-95 '
				to={'/schedules/new'}>
				New <i className='fa-solid fa-calendar-days'></i>
			</Link>
		</div>
	)
}

export default SchedulesPage
