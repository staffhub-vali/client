import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'
import Logout from '../../Auth'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../../components/ui/Button'
import { CalendarPlus } from 'lucide-react'

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
			console.log(response.data)
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<div className='mx-auto flex flex-col items-center pt-24'>
			<h1 className='mb-8 text-4xl text-slate-800 dark:text-slate-300'>Dashboard</h1>
			{data.length > 0 ? (
				<Dashboard data={data} />
			) : (
				<div className='w-1/2 text-center'>
					<h2 className='pt-4 text-3xl text-slate-800 dark:text-slate-300'>
						You did not create any schedules for your employees yet.
					</h2>
					<p className='mb-6 pt-4 text-3xl text-slate-800 dark:text-slate-300'>Click below to create one.</p>
					<Link
						className={`${buttonVariants({ variant: 'default', size: 'lg' })} mt-4`}
						to='/schedules/new'>
						New Schedule {<CalendarPlus className='ml-2' />}
					</Link>
				</div>
			)}
		</div>
	)
}

export default DashboardPage
