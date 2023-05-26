import { FC } from 'react'
import TableDashboard from './TableDashboard'
import { WorkDay } from '../../pages/DashboardPage'

interface DashboardProps {
	data: WorkDay[]
}

const Dashboard: FC<DashboardProps> = ({ data }) => {
	return (
		<div className='w-2/3'>
			<TableDashboard data={data} />
		</div>
	)
}

export default Dashboard
