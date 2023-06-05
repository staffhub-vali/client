import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'
import { Logout } from '../../Auth'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../../components/ui/Button'
import { CalendarPlus } from 'lucide-react'
import Heading from '../../components/ui/Heading'
import Paragraph from '../../components/ui/Paragraph'
import Container from '../../components/ui/Container'

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
			data.sort((a: WorkDay, b: WorkDay) => a.date - b.date)
			setData(data)
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
