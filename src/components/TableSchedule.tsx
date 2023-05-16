import { FC, useState } from 'react'

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
	console.log(data)
	function formatDate(unixTimestamp: number) {
		const date = new Date(unixTimestamp * 1000) // Convert UNIX timestamp to milliseconds

		const day = String(date.getDate()).padStart(2, '0') // Get day and pad with leading zero if needed
		const month = String(date.getMonth() + 1).padStart(2, '0') // Get month (zero-based) and pad with leading zero if needed
		const year = date.getFullYear() // Get full year

		return `${day}/${month}/${year}`
	}

	function formatTime(unixTimestamp: number) {
		if (unixTimestamp) {
			const date = new Date(unixTimestamp * 1000) // Convert UNIX timestamp to milliseconds

			const hours = String(date.getHours()).padStart(2, '0') // Get hours and pad with leading zero if needed
			const minutes = String(date.getMinutes()).padStart(2, '0') // Get minutes and pad with leading zero if needed

			return `${hours}:${minutes}`
		}
	}

	function convertDateTimeToUnix(dateString: string, startTimeString: any, endTimeString: any) {
		// Parse the date string
		const [day, month, year] = dateString.split('/')
		const date = new Date(`${year}-${month}-${day}`)

		// Parse the start time string
		const [startHour, startMinute] = startTimeString.split(':')
		const startDate = new Date(date)

		startDate.setHours(startHour)
		startDate.setMinutes(startMinute)

		// Parse the end time string
		const [endHour, endMinute] = endTimeString.split(':')
		const endDate = new Date(date)
		endDate.setHours(endHour)
		endDate.setMinutes(endMinute)

		// Convert to Unix timestamps
		const dateUnix = Math.floor(date.getTime() / 1000)
		const startUnix = Math.floor(startDate.getTime() / 1000)
		const endUnix = Math.floor(endDate.getTime() / 1000)

		// Return the result as an object
		return {
			date: dateUnix,
			start: startUnix,
			end: endUnix,
		}
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
								<td className='py-2'>{formatDate(item.date)}</td>
								<td>
									<input
										className='bg-transparent py-2 text-center'
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
										className='bg-transparent py-2 text-center'
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
								{item.start && item.end && item.total ? (
									<td className='py-2'>
										{`${Math.floor((item.end - item.start) / 3600)}h ${Math.floor(
											((item.end - item.start) % 3600) / 60,
										)}min`}
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
