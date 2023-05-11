import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

interface Schedule {
	_id: string
	workDays: []
}

interface ScheduleDetailsPageProps {}

const ScheduleDetailsPage: FC<ScheduleDetailsPageProps> = ({}) => {
	const [schedule, setSchedule] = useState<Schedule>({ _id: '', workDays: [] })

	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		fetchSchedule()
	}, [])

	const fetchSchedule = async () => {
		try {
			const token = localStorage.getItem('token')

			const response = await axios.get<Schedule>(`http://localhost:8080/v1/schedules/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setSchedule(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='flex flex-col items-center pt-24'>
			<h1 className='mb-12 text-5xl'>Schedule</h1>
			<div className='grid grid-cols-7 gap-10'>
				{schedule.workDays?.map((day: { date: string; _id: string }, index: number) => (
					<Link
						className='text-3xl'
						to={`/days/${day._id}`}
						key={index}>
						{day.date}
					</Link>
				))}
			</div>
		</div>
	)
}

export default ScheduleDetailsPage
