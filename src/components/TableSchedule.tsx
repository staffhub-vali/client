import { FC } from 'react'
import { formatDate, formatTime } from '../utils/DateFormatting'

interface TableScheduleProps {
	data: Array<{
		date: number
		start: number
		end: number
		total: number
	}>
	setData: any
}

const TableSchedule: FC<TableScheduleProps> = ({ data, setData }) => {
	const headings = ['Date', 'Start', 'End', 'Total']

	return (
		<div className='h-[33rem] w-full overflow-x-hidden rounded border-2 text-slate-800 dark:border-slate-500 dark:text-slate-300'>
			<table className='w-full divide-y-2 divide-slate-200 overflow-scroll rounded bg-white text-center text-lg shadow-md dark:divide-slate-600  dark:bg-slate-800'>
				<thead>
					<tr className='sticky top-0 bg-white dark:bg-slate-800 '>
						{headings.map((heading, index) => (
							<th
								className='py-2 font-semibold'
								key={index}>
								{heading}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='divide-y-2 divide-slate-200 dark:divide-slate-600 '>
					{data.map((item, index) => {
						return (
							<tr
								key={index}
								className={index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-700' : 'bg-white dark:bg-slate-800'}>
								<td className='py-2'>{formatDate(item.date)}</td>
								<td>
									<input
										className='rounded bg-transparent py-2 text-center focus:bg-white dark:outline-none dark:ring-slate-100 dark:focus:bg-transparent dark:focus:ring-1'
										type='text'
										value={formatTime(item.start)}
										onChange={(e) => {
											const newTime = e.target.value

											// convert the new time into Unix timestamp
											const [hour, minute]: any = newTime.split(':')
											const newDate = new Date(item.date * 1000)
											newDate.setHours(hour)
											newDate.setMinutes(minute)
											const newStartUnix = Math.floor(newDate.getTime() / 1000)

											// set the new data
											const newData = data.map((d, i) => (i === index ? { ...d, start: newStartUnix } : d))
											setData(newData)
										}}
									/>
								</td>
								<td>
									<input
										className='rounded bg-transparent py-2 text-center ring-slate-100 focus:bg-white dark:outline-none dark:focus:bg-transparent dark:focus:ring-1'
										type='text'
										value={formatTime(item.end)}
										onChange={(e) => {
											const newTime = e.target.value

											// convert the new time into Unix timestamp
											const [hour, minute]: any = newTime.split(':')
											const newDate = new Date(item.date * 1000)
											newDate.setHours(hour)
											newDate.setMinutes(minute)
											const newEndUnix = Math.floor(newDate.getTime() / 1000)

											// set the new data
											const newData = data.map((d, i) => (i === index ? { ...d, end: newEndUnix } : d))
											setData(newData)
										}}
									/>
								</td>
								{item.start && item.end ? (
									<td className='py-2'>
										{`${Math.floor((item.end - item.start) / 3600)}h ${
											((item.end - item.start) % 3600) / 60 !== 0
												? `${Math.floor(((item.end - item.start) % 3600) / 60)}min`
												: ''
										}`}
									</td>
								) : (
									<td className='py-2'></td>
								)}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default TableSchedule
