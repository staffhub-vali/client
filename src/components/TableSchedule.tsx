import { FC, useState } from 'react'

interface TableScheduleProps {
	data: Array<{
		date: number
		start: number
		end: number
		total: number
	}>
}

const TableSchedule: FC<TableScheduleProps> = ({ data }) => {
	const headings = ['Date', 'Start', 'End', 'Total']

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
					{data.map((item, index) => (
						<tr
							key={index}
							className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white-50'}>
							<td className='py-2'>{item.date}</td>
							<td className=''>
								<input
									className='py-2 text-center'
									type='text'
									value={item.start}
								/>
							</td>
							<td className=''>
								<input
									className='py-2 text-center'
									type='text'
									value={item.end}
								/>
							</td>
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
