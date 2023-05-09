import { FC, useEffect, useState } from 'react'
import Table from '../components/ui/Table'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface SchedulesPageProps {}

const headings = ['Month']

const SchedulesPage: FC<SchedulesPageProps> = ({}) => {
	const [schedules, setSchedules] = useState([])

	useEffect(() => {
		fetchSchedules()
	}, [])

	const fetchSchedules = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get('http://localhost:8080/v1/schedules', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setSchedules(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='flex flex-col items-center pt-24'>
			<Table
				data={schedules}
				headings={headings}
			/>
			<Link
				className='mt-8 rounded bg-black px-8 py-2 text-2xl text-white active:scale-95 '
				to={'/schedules/new'}>
				New <i className='fa-solid fa-calendar-days'></i>
			</Link>
		</div>
	)
}

export default SchedulesPage
