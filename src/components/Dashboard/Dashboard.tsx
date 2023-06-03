import { FC, useState, useEffect } from 'react'
import { WorkDay } from '../../pages/Dashboard/DashboardPage'
import { formatDate, formatDay } from '../../utils/DateFormatting'
import { useNavigate } from 'react-router-dom'

interface DashboardProps {
	data: WorkDay[]
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const Dashboard: FC<DashboardProps> = ({ data }) => {
	const navigate = useNavigate()

	return (
		<div className='w-2/3'>
			<table className='min-w-full divide-y-2 divide-slate-200 border-2 bg-white text-center text-lg text-slate-800 dark:divide-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300'>
				<thead>
					<tr>
						{weekDays.map((day, index) => (
							<th
								key={index}
								className='whitespace-nowrap px-4 py-3 font-medium'>
								{day}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='divide-y-2 divide-slate-200 dark:divide-slate-600'>
					{data.map((item) => (
						<tr
							onClick={() => navigate(`/days/${item._id}`)}
							key={item._id}
							className='bg-white dark:bg-slate-800 dark:text-slate-300'>
							<td className='cursor-pointer whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-300'>
								{formatDate(item.date)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Dashboard
