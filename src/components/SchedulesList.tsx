import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface SchedulesListProps {
	data: Array<{ month: number; _id: string }>
	headings: Array<string>
}

const SchedulesList: FC<SchedulesListProps> = ({ data, headings }) => {
	const navigate = useNavigate()

	function getMonthAndYear(number: number) {
		const year = number.toString().slice(-4)
		const month = parseInt(number.toString().split(year)[0])

		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]

		if (month < 1 || month > 12) {
			return 'Invalid month'
		}

		return monthNames[month - 1] + ' ' + year
	}

	return (
		<div className='w-1/2 overflow-scroll overflow-x-hidden rounded'>
			<table className='w-full divide-y-2 divide-slate-200 rounded border-2 bg-white text-center text-lg shadow-md'>
				<thead>
					<tr className='sticky top-0 bg-white '>
						{headings.map((heading, index) => (
							<th
								className='py-2 font-normal'
								key={index}>
								{heading}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='divide-y-2 divide-slate-200 '>
					{data.map((item, index) => {
						return (
							<tr
								key={index}
								className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white-50'}>
								<td
									onClick={() => navigate(`/schedules/${item._id}`)}
									className='cursor-pointer py-2 hover:bg-slate-100'>
									{getMonthAndYear(item.month)}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default SchedulesList
