import { FC } from 'react'

interface TableScheduleProps {
	data: Array<{
		date: Date
		start: Date
		end: Date
		total: number
	}>
}

const TableSchedule: FC<TableScheduleProps> = ({ data }) => {
	const headings = ['Date', 'Start', 'End', 'Total']
	const displayData = [...data]
	console.log(displayData)
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
					{displayData.map((item, index) => (
						<tr
							key={index}
							className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white-50'}>
							<td className='py-2'>{item.date?.toLocaleDateString('en-GB')}</td>
							<td className='py-2'>{item.start?.toLocaleTimeString('en-GB').slice(0, 5)}</td>
							<td className='py-2'>{item.end?.toLocaleTimeString('en-GB').slice(0, 5)}</td>
							{item.total ? (
								<td className='py-2'>
									{item.total / 60 + 'h ' + (item.total % 60 !== 0 ? (item.total % 60) + 'min' : '')}
								</td>
							) : (
								<td className='py-2'></td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TableSchedule
