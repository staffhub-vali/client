import axios from 'axios'
import Logout from '../../Auth'
import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

interface WorkDayPageProps {}

interface WorkDay {
	date: number
	shifts: [{ employee: { name: string; _id: string }; start: number; end: number }]
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
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
			console.log(error)
		}
	}

	return (
		<div className='flex flex-col items-center pt-24 text-slate-800 dark:text-slate-300'>
			<h1 className='mb-12 text-4xl'>
				{workDay && new Date(workDay.date * 1000).toLocaleDateString('en-GB')}
			</h1>
			<div className='flex w-10/12 flex-col items-center'>
				{workDay?.shifts?.map((shift, index: number) => (
					<div
						className='flex w-2/3 justify-between text-center text-4xl'
						key={index}>
						<div className='w-96'>
							<Link to={`/employees/${shift.employee._id}`}> {shift?.employee.name}</Link>
						</div>
						<div className='flex'>
							{new Date(shift.start * 1000).toLocaleTimeString('en-GB').slice(0, 5)} -{' '}
							{new Date(shift.end * 1000).toLocaleTimeString('en-GB').slice(0, 5)}
						</div>
						<div className='w-96'>{`${Math.floor((shift.end - shift.start) / 3600)}h ${
							((shift.end - shift.start) % 3600) / 60 !== 0
								? `${Math.floor(((shift.end - shift.start) % 3600) / 60)}min`
								: ''
						}`}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default WorkDayPage
