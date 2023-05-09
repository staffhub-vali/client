import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface WorkDayPageProps {}

interface WorkDay {
	date: string
	shifts: [{ employee: { name: string }; start: string; end: string }]
}

const WorkDayPage: FC<WorkDayPageProps> = ({}) => {
	const [workDay, setWorkDay] = useState<WorkDay | null>(null)
	const { id } = useParams()

	useEffect(() => {
		fetchWorkDay()
	}, [])

	const fetchWorkDay = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get(`http://localhost:8080/v1/days/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setWorkDay(response.data)
			console.log(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='flex flex-col items-center pt-24'>
			<h1 className='mb-12 text-4xl'>{workDay?.date}</h1>
			<div className='grid grid-cols-1 gap-16'>
				{workDay?.shifts?.map((shift, index: number) => (
					<div
						className='flex space-x-4 text-4xl'
						key={index}>
						<p> {shift?.employee.name}</p>
						<p> {shift?.start}</p>
						<p>-</p>
						<p> {shift?.end}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default WorkDayPage
