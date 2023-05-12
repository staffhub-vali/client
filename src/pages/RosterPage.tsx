import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Table from '../components/ui/Table'
import Logout from '../Auth'

interface RosterPageProps {}

interface RosterData {
	month: string
	shifts: [{ workDay: { date: string }; start: string; end: string }]
}

const headings = ['Date', 'Start', 'End']

const RosterPage: FC<RosterPageProps> = ({}) => {
	const { id } = useParams()
	const [roster, setRoster] = useState<RosterData | null>(null)

	const fetchRoster = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get(`http://localhost:8080/v1/roster/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			console.log(response.data)
			setRoster(response.data)
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
			console.log(error)
		}
	}

	useEffect(() => {
		fetchRoster()
	}, [])

	const newShifts: any = roster?.shifts.map((shift) => {
		return {
			start: shift.start,
			end: shift.end,
			date: shift.workDay.date,
		}
	})

	return (
		<div className='flex flex-col items-center py-24'>
			<h1 className='mb-4 text-4xl'>Roster</h1>
			{roster && (
				<>
					<h2>{roster.month}</h2>
					<Table
						data={newShifts}
						headings={headings}
						editable={false}
						noLink={true}
					/>
				</>
			)}
		</div>
	)
}

export default RosterPage
