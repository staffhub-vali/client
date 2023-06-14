import axios from 'axios'
import { Logout } from '../../Auth.tsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../components/ui/Container.tsx'
import WorkDay from '../../components/WorkDay/WorkDay.tsx'

interface WorkDayProps {
	notes: string[]
	_id: string
	date: number
	shifts: Shift[]
}

interface Shift {
	end: number
	_id: string
	start: number
	loading: boolean
	employee: { name: string; _id: string }
}

const WorkDayPage = () => {
	const { id } = useParams()
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)
	const [workDay, setWorkDay] = useState<WorkDayProps>({
		_id: '',
		date: 0,
		notes: [],
		shifts: [],
	})

	useEffect(() => {
		fetchWorkDay()
	}, [loading])

	useEffect(() => {
		let timeoutId: any = null

		clearTimeout(timeoutId)

		timeoutId = setTimeout(() => {
			setError(null)
			setMessage(null)
		}, 7000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [error, message])

	const fetchWorkDay = async () => {
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.get(`http://localhost:8080/v1/days/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setWorkDay(data)
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<Container size={'lg'}>
			<WorkDay
				error={error}
				workDay={workDay}
				message={message}
				setError={setError}
				loading={loading}
				setWorkDay={setWorkDay}
				setMessage={setMessage}
				setLoading={setLoading}
			/>
		</Container>
	)
}

export default WorkDayPage
