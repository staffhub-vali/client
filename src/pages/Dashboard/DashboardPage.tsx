import axios from 'axios'
import { Logout } from '../../Auth.tsx'
import { Link } from 'react-router-dom'
import { CalendarPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import Heading from '../../components/ui/Heading.tsx'
import Spinner from '../../components/ui/Spinner.tsx'
import Container from '../../components/ui/Container.tsx'
import { buttonVariants } from '../../components/ui/Button.tsx'
import Notification from '../../components/ui/Notification.tsx'
import Dashboard from '../../components/Dashboard/Dashboard.tsx'

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
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [emptyData, setEmptyData] = useState<boolean>(false)
	const [prevPageLimit, setPrevPageLimit] = useState<boolean>(false)
	const [nextPageLimit, setNextPageLimit] = useState<boolean>(false)

	useEffect(() => {
		fetchData()
	}, [skip])

	const fetchData = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/days?skip=${skip}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			setData(response.data.workDays)

			if (response.data.length === 0) {
				setEmptyData(true)
			} else setEmptyData(false)
		} catch (error: any) {
			setError(error.response.data.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container
			size={'lg'}
			className='overflow-y-hidden'>
			{loading ? (
				<Spinner />
			) : data.length > 0 ? (
				<Dashboard
					data={data}
					skip={skip}
					setSkip={setSkip}
					emptyData={emptyData}
					prevPageLimit={prevPageLimit}
					nextPageLimit={nextPageLimit}
					setPrevPageLimit={setPrevPageLimit}
					setNextPageLimit={setNextPageLimit}
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
			{error && (
				<Notification
					variant={'error'}
					position={'top'}>
					{error}
				</Notification>
			)}
		</Container>
	)
}

export default DashboardPage
