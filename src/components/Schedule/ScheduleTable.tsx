import { Dispatch, FC, SetStateAction } from 'react'
import { formatDate, formatTime, formatTotal } from '../../utils/DateFormatting'
import Container from '../ui/Container'

interface ScheduleTableProps {
	data: WorkDay[]
	setData: Dispatch<SetStateAction<WorkDay[]>>
}

interface WorkDay {
	start?: number
	end?: number
	total?: number
	date: number
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
		<Container
			size={'lg'}
			className='h-[32rem] overflow-x-hidden rounded border-2 p-0 dark:border-slate-500'>
			<table className='w-full divide-y-2 divide-slate-200 overflow-scroll rounded bg-white text-center text-xl  shadow-md dark:divide-slate-600 dark:bg-slate-800'>
				<thead>
					<tr className='sticky top-0 bg-white dark:bg-slate-800 '>
						{headings.map((heading, index) => (
							<th
								className='py-4 font-semibold'
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
								<td className='py-3'>{formatDate(item.date)}</td>
								<td>
									<input
										className='rounded bg-transparent py-3 text-center focus:bg-white dark:outline-none dark:ring-slate-100 dark:focus:bg-transparent dark:focus:ring-1'
										type='text'
										value={formatTime(item.start)}
										onChange={(e) => handleTimeChange(e.target.value, 'start', index)}
									/>
								</td>
								<td>
									<input
										className='rounded bg-transparent py-3 text-center ring-slate-100 focus:bg-white dark:outline-none dark:focus:bg-transparent dark:focus:ring-1'
										type='text'
										value={formatTime(item.end)}
										onChange={(e) => handleTimeChange(e.target.value, 'end', index)}
									/>
								</td>
								{item.start && item.end ? (
									<td className='py-3'>{formatTotal(item.start, item.end)}</td>
								) : (
									<td className='py-2'></td>
								)}
							</tr>
						)
					})}
				</tbody>
			</table>
		</Container>
	)
}

export default ScheduleTable
