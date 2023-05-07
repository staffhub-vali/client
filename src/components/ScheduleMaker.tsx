import { FC } from 'react'
import Table from './ui/Table'

interface ScheduleMakerProps {
	value: string
}

const headings = ['Date', 'Start', 'End', 'Hours']

const ScheduleMaker: FC<ScheduleMakerProps> = ({ value }) => {
	const currentDate = new Date()
	const year = currentDate.getFullYear()
	const month = currentDate.getMonth() + 2
	const daysInMonth = new Date(year, month, 0).getDate()

	const data = new Array(daysInMonth).fill(null).map((_, index) => {
		const date = new Date(year, month - 1, index + 1)
		const formattedDate = date.toLocaleDateString('en-GB')
		return {
			date: formattedDate,
			start: '',
			end: '',
			hours: '',
		}
	})

	// randomly fill in 21 days with shifts
	const daysToFill = 21
	const start = '06:00'
	const end = '14:00'
	const hoursPerShift = parseInt(end) - parseInt(start)
	const daysFilled = new Set<number>()
	while (daysFilled.size < daysToFill) {
		const dayToFill = Math.floor(Math.random() * daysInMonth) + 1
		if (!daysFilled.has(dayToFill)) {
			daysFilled.add(dayToFill)
			data[dayToFill - 1] = {
				date: data[dayToFill - 1].date,
				start: start,
				end: end,
				hours: hoursPerShift + 'h',
			}
		}
	}

	const totalHours = data.reduce((total, { hours }) => total + parseInt(hours || '0'), 0)

	return (
		<>
			<div className='pb-1 pt-4 text-xl'>
				{value} - Total hours: {totalHours}
			</div>
			<Table
				editable={true}
				searchBar={false}
				headings={headings}
				data={data}
			/>

			<button>Submit</button>
		</>
	)
}

export default ScheduleMaker
