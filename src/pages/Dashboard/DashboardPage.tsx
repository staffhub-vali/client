import axios from 'axios'
import { Logout } from '../../Auth.tsx'
import { Link } from 'react-router-dom'
import { CalendarPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
	const [data, setData] = useState<WorkDay[]>([])
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [emptyData, setEmptyData] = useState<boolean>(false)
	const [prevPageLimit, setPrevPageLimit] = useState<boolean>(false)
	const [nextPageLimit, setNextPageLimit] = useState<boolean>(false)

	const location = useLocation()

	const searchParams: any = new URLSearchParams(location.search)

	const skipFromURL = searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 0

	const [skip, setSkip] = useState<number>(skipFromURL)

	useEffect(() => {
		searchParams.set('page', skip.toString())
		const newURL = `${location.pathname}?${searchParams.toString()}`
		window.history.replaceState(null, '', newURL)
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

	useEffect(() => {
		fetchData()
	}, [skip])

	return (
		<Container
			size={'lg'}
			className='overflow-y-hidden px-2'>
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
						className='slide-in-bottom mb-2 mt-6 text-center'
						size={'sm'}>
						You do not currently have any created schedules.
					</Heading>
					<Heading
						size={'xs'}
						className='slide-in-bottom text-center'>
						Click below if you wish to create a schedule.
					</Heading>
					<Link
						className={`${buttonVariants({ variant: 'default' })} slide-in-bottom mt-6`}
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
