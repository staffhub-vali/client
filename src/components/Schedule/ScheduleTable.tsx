import { Dispatch, FC, SetStateAction } from 'react'
import { formatDate, formatTime, formatTotal } from '../../utils/DateFormatting'

interface ScheduleTableProps {
	data: WorkDay[]
	setData: Dispatch<SetStateAction<WorkDay[]>>
}

interface WorkDay {
	end?: number
	date: number
	start?: number
	total?: number
}

const ScheduleTable: FC<ScheduleTableProps> = ({ data, setData }) => {
	const headings = ['Date', 'Start', 'End', 'Total']

	const handleTimeChange = (newTime: string, field: 'start' | 'end', index: number) => {
		// convert the new time into Unix timestamp

		const [hour, minute]: string[] = newTime.split(':')
		const newDate: any = new Date(data[index].date * 1000)

		newDate.setHours(hour)
		newDate.setMinutes(minute)

		const newUnixTime = Math.floor(newDate.getTime() / 1000)

		const newData = data.map((d, i) => (i === index ? { ...d, [field]: newUnixTime } : d))
		setData(newData)
	}

	return (
		<div className='h-[32rem] overflow-x-hidden rounded border-2 border-slate-300 shadow-md dark:border-slate-500'>
			<table className='w-full divide-y-2 divide-slate-300 overflow-scroll rounded bg-white text-center text-xl  shadow-md dark:divide-slate-600 dark:bg-slate-800'>
				<thead>
					<tr className='sticky top-0 bg-white dark:bg-slate-800 '>
						{headings.map((heading, index) => (
							<th
								className='px-8 py-4 font-semibold'
								key={index}>
								{heading}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='divide-y-2 divide-slate-300 dark:divide-slate-600 '>
					{data.map((item, index) => {
						return (
							<tr
								key={index}
								className={index % 2 === 0 ? 'bg-slate-100 dark:bg-slate-700' : 'bg-white dark:bg-slate-800'}>
								<td className='px-8 py-3'>{formatDate(item.date)}</td>
								<td>
									<input
										type='text'
										value={formatTime(item.start)}
										onChange={(e) => handleTimeChange(e.target.value, 'start', index)}
										className='rounded bg-transparent py-3 text-center focus:bg-white dark:outline-none dark:ring-slate-100 dark:focus:bg-transparent dark:focus:ring-1'
									/>
								</td>
								<td>
									<input
										value={formatTime(item.end)}
										onChange={(e) => handleTimeChange(e.target.value, 'end', index)}
										className='rounded bg-transparent py-3 text-center ring-slate-100 focus:bg-white dark:outline-none dark:focus:bg-transparent dark:focus:ring-1'
										type='text'
									/>
								</td>
								{item.start && item.end ? (
									<td
										title='Total hours in shift'
										className='px-8 py-3'>
										{formatTotal(item.start, item.end)}
									</td>
								) : (
									<td
										title='Total hours in shift'
										className='px-8 py-3'></td>
								)}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default ScheduleTable
