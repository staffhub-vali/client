import axios from 'axios'
import { Logout } from '../../Auth'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../components/ui/Container'
import WorkDay from '../../components/WorkDay/WorkDay'

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
	const [error, setError] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [workDay, setWorkDay] = useState<WorkDayProps>({
		_id: '',
		date: 0,
		notes: [],
		shifts: [],
	})

	useEffect(() => {
		fetchWorkDay()
	}, [loading])

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
			console.log(error)
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
