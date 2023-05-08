import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Schedule {
	_id?: string
}

interface ScheduleWithId extends Schedule {
	_id?: string
}

interface ScheduleDetailsPageProps {}

const ScheduleDetailsPage: FC<ScheduleDetailsPageProps> = ({}) => {
	const [schedule, setSchedule] = useState<Schedule | undefined>(undefined)

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
			<h1 className='mb-4 text-4xl'>Schedule</h1>
			<h2>{schedule?._id}</h2>
		</div>
	)
}

export default ScheduleDetailsPage
