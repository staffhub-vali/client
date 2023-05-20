import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import Logout from '../Auth'

interface DashboardPageProps {}

export interface WorkDay {
	_id: string
	date: number
	shifts: Shift[]
	notes: string[]
}

interface Shift {
	employee: { name: string }
	start: number
	end: number
}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
	const [data, setData] = useState<WorkDay[]>([])

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get('http://localhost:8080/v1/days', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setData(response.data)
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<div className='flex flex-col items-center pt-24'>
			<h1 className='mb-8 text-4xl text-slate-800 dark:text-slate-300'>Dashboard</h1>
			<Dashboard data={data} />
		</div>
	)
}

export default DashboardPage
