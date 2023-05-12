import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logout from '../Auth'

interface WorkDayPageProps {}

interface WorkDay {
	date: string
	shifts: [{ employee: { name: string; _id: string }; start: string; end: string }]
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
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
			console.log(error)
		}
	}

	return (
		<div className='flex flex-col items-center pt-24'>
			<h1 className='mb-12 text-4xl'>{workDay?.date}</h1>
			<div className='flex w-10/12 flex-col items-center'>
				{workDay?.shifts?.map((shift, index: number) => (
					<div
						className='flex w-1/3 justify-between text-4xl'
						key={index}>
						<div>
							<Link to={`/employees/${shift.employee._id}`}> {shift?.employee.name}</Link>
						</div>
						<div className='flex'>
							<p> {shift?.start}</p>-<p> {shift?.end}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default WorkDayPage
