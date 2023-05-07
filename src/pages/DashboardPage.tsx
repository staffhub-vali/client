import { FC } from 'react'
import Table from '../components/ui/Table'

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
	const headings = ['Date', 'Name', 'Start', 'End', 'Total']
	const data = [
		['04/05/2023', 'Mark Davis', '06:00', '14:00', '8h'],
		['04/05/2023', 'Julia Moore', '12:00', '20:00', '8h'],
		['05/05/2023', 'Hugo Barlow', '16:00', '00:00', '8h'],
		['05/05/2023', 'Emma Johnson', '08:00', '16:00', '8h'],
		['06/05/2023', 'Sophie Lee', '09:00', '17:00', '8h'],
		['06/05/2023', 'Jack Smith', '12:00', '20:00', '8h'],
		['05/05/2023', 'Oliver Taylor', '13:00', '21:00', '8h'],
		['12/04/2023', 'Isabella Brown', '14:00', '22:00', '8h'],
		['20/04/2023', 'Noah Wilson', '16:00', '00:00', '8h'],
		['31/04/2023', 'Ava Davis', '18:00', '02:00', '8h'],
	]

	return (
		<div className='flex flex-col items-center pt-24'>
			<h1 className='mb-8 text-4xl'></h1>
			<Table
				headings={headings}
				data={data}
			/>
		</div>
	)
}

export default DashboardPage
