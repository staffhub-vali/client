import { FC, useMemo, useState } from 'react'
import Table from './ui/Table'
import axios from 'axios'

interface ScheduleMakerProps {
	id: string
	name: string
}

const headings = ['Date', 'Start', 'End']

const ScheduleMaker: FC<ScheduleMakerProps> = ({ id, name }) => {
	const currentDate = new Date()
	const year = currentDate.getFullYear()
	const month = currentDate.getMonth() + 2
	const daysInMonth = new Date(year, month, 0).getDate()

	const [data, setData] = useState(() => {
		const daysInMonth = new Date(year, month, 0).getDate()

		const data = new Array(daysInMonth).fill(null).map((_, index) => {
			const date = new Date(year, month - 1, index + 1)
			const formattedDate = date.toLocaleDateString('en-GB')
			return {
				date: formattedDate,
				start: '',
				end: '',
			}
		})

		// randomly fill in 21 days with shifts
		const daysToFill = 21
		const start = '06:00'
		const end = '14:00'
		const daysFilled = new Set<number>()
		while (daysFilled.size < daysToFill) {
			const dayToFill = Math.floor(Math.random() * daysInMonth) + 1
			if (!daysFilled.has(dayToFill)) {
				daysFilled.add(dayToFill)
				data[dayToFill - 1] = {
					date: data[dayToFill - 1].date,
					start: start,
					end: end,
				}
			}
		}

		return data
	})

	const createSchedule = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.post(
				`http://localhost:8080/v1/roster`,
				{
					id,
					data,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			return response.data
		} catch (error) {
			console.error(error)
		}
	}

	const handleCellUpdate = (rowIndex: number, heading: string, newValue: string) => {
		setData((prevData) => {
			const newData: any = [...prevData]
			newData[rowIndex][heading.toLowerCase()] = newValue
			return newData
		})
	}

	return (
		<>
			<div className='pb-1 pt-4 text-xl'>{name}</div>
			<Table
				editable={true}
				searchBar={false}
				headings={headings}
				data={data}
			/>

			<button onClick={createSchedule}>Submit</button>
		</>
	)
}

export default ScheduleMaker
