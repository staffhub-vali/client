import { FC } from 'react'
import DashboardTable from '../components/DashboardTable'

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
	return (
		<div className='flex flex-col items-center pt-24'>
			<h1 className='mb-8 text-4xl'>Dashboard</h1>
			<DashboardTable />
		</div>
	)
}

export default DashboardPage
