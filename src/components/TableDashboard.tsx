import { FC } from 'react'
import { WorkDay } from '../pages/DashboardPage'

interface TableDashboardProps {
	data: WorkDay[]
}

function formatDate(unixTimestamp: number) {
	const date = new Date(unixTimestamp * 1000)

	const year = date.getFullYear()
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')

	return `${day}/${month}/${year}`
}

const TableDashboard: FC<TableDashboardProps> = ({ data }) => {
	const headings = ['Date', 'Shifts']
	return (
		<table className='min-w-full divide-y-2 divide-slate-200 border bg-white text-center text-lg'>
			<thead>
				<tr>
					{headings.map((heading, index) => (
						<th
							key={index}
							className='whitespace-nowrap px-4 py-3 font-medium text-slate-900'>
							{heading}
						</th>
					))}
				</tr>
			</thead>

			<tbody className='divide-y-2 divide-slate-200'>
				{data.map((item, index) => (
					<tr
						key={item._id}
						className={` cursor-pointer duration-75 hover:bg-slate-200
                ${index % 2 === 0 ? 'bg-slate-50 ' : 'bg-white'}`}>
						<td className={`cursor-pointer'} h-14 whitespace-nowrap px-4 py-3 text-slate-700`}>
							{formatDate(item.date)}
						</td>
						<td
							key={index}
							className={`cursor-pointer'} h-14 whitespace-nowrap px-4 py-3 text-slate-700`}>
							{item.shifts.length}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default TableDashboard
