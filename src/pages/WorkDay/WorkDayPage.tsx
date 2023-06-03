import axios from 'axios'
import { Logout } from '../../Auth'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Container from '../../components/ui/Container'
import WorkDay from '../../components/WorkDay/WorkDay'

const WorkDayPage = () => {
	const { id } = useParams()
	const [workDay, setWorkDay] = useState<WorkDay | null>(null)

	useEffect(() => {
		fetchWorkDay()
	}, [])

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
				workDay={workDay}
				setWorkDay={setWorkDay}
			/>
		</Container>
	)
}

export default WorkDayPage
