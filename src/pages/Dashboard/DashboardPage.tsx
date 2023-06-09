import axios from 'axios'
import { Logout } from '../../Auth'
import { Link } from 'react-router-dom'
import { CalendarPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import Heading from '../../components/ui/Heading'
import Container from '../../components/ui/Container'
import { buttonVariants } from '../../components/ui/Button'
import Dashboard from '../../components/Dashboard/Dashboard'

export interface WorkDay {
	_id: string
	date: number
	notes: string[]
	shifts: Shift[]
}

interface Shift {
	end: number
	start: number
	count: number
	employee: { name: string }
}

const DashboardPage = () => {
	const [skip, setSkip] = useState<number>(0)
	const [data, setData] = useState<WorkDay[]>([])

	useEffect(() => {
		fetchData()
	}, [skip])

	const fetchData = async () => {
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.get(`http://localhost:8080/v1/days?skip=${skip}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (data.length > 0) {
				setData(data)
			}
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<Container size={'lg'}>
			{data.length > 0 ? (
				<Dashboard
					data={data}
					skip={skip}
					setSkip={setSkip}
				/>
			) : (
				<>
					<Heading
						className='mb-2 mt-6'
						size={'sm'}>
						You do not currently have any created schedules.
					</Heading>
					<Heading size={'xs'}>Click below if you wish to create a schedule.</Heading>
					<Link
						className={`${buttonVariants({ variant: 'default', size: 'lg' })} mt-6`}
						to='/schedules/new'>
						New Schedule {<CalendarPlus className='ml-2' />}
					</Link>
				</>
			)}
		</Container>
	)
}

export default DashboardPage
