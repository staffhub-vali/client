import { Dispatch, FC, SetStateAction } from 'react'
import { formatDate, formatDateLong, formatDay, formatTime, formatTotal } from '../../utils/DateFormatting.ts'

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
		<div className='slide-in-bottom h-[32rem] overflow-x-hidden rounded border-2 border-slate-300 shadow-md dark:border-slate-500'>
			<table className='w-full divide-y-2 divide-slate-300 overflow-scroll rounded bg-white text-left  text-xl shadow-md dark:divide-slate-600 dark:bg-slate-800'>
				<thead>
					<tr className='sticky top-0 bg-white dark:bg-slate-800 '>
						{headings.map((heading, index) => (
							<th
								className={`px-8 py-4 font-semibold ${index === 3 && 'text-right'}`}
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
								<td className='flex w-96 items-baseline justify-between px-8 py-3'>
									<span className=' text-sm'>{formatDay(item.date)}</span>
									<span className='w-48'>{formatDateLong(item.date)}</span>
								</td>
								<td>
									<input
										type='text'
										value={formatTime(item.start)}
										onChange={(e) => handleTimeChange(e.target.value, 'start', index)}
										className='rounded bg-transparent py-3 pl-8 text-left focus:bg-white dark:outline-none dark:ring-slate-100 dark:focus:bg-transparent dark:focus:ring-1'
									/>
								</td>
								<td>
									<input
										value={formatTime(item.end)}
										onChange={(e) => handleTimeChange(e.target.value, 'end', index)}
										className='rounded bg-transparent py-3 pl-8 text-left ring-slate-100 focus:bg-white dark:outline-none dark:focus:bg-transparent dark:focus:ring-1'
										type='text'
									/>
								</td>
								{item.start && item.end ? (
									<td
										title='Total hours in shift'
										className='w-40 px-8 py-3 text-right'>
										{formatTotal(item.start, item.end)}
									</td>
								) : (
									<td
										title='Total hours in shift'
										className='w-40 px-8 py-3'></td>
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
