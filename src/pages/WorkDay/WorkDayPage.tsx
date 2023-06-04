import axios from 'axios'
import { Logout } from '../../Auth'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../components/ui/Container'
import WorkDay from '../../components/WorkDay/WorkDay'

const WorkDayPage = () => {
	const { id } = useParams()
	const [error, setError] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [workDay, setWorkDay] = useState<WorkDay | null>(null)

	useEffect(() => {
		fetchWorkDay()
	}, [message, error])

	const fetchWorkDay = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get(`http://localhost:8080/v1/days/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setWorkDay(response.data)
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
				message={message}
				setMessage={setMessage}
				error={error}
				setError={setError}
				workDay={workDay}
				setWorkDay={setWorkDay}
			/>
		</Container>
	)
}

export default WorkDayPage
