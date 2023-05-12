import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Table from '../components/ui/Table'
import Logout from '../Auth'

interface RosterPageProps {}

interface RosterData {
	month: string
	employee: { name: string; _id: string }
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

	const shifts: any = roster?.shifts.map((shift) => {
		return {
			start: shift.start,
			end: shift.end,
			date: shift.workDay.date,
		}
	})

	while (shifts?.length < 25) {
		shifts.push({
			start: '',
			end: '',
			date: '',
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const token = localStorage.getItem('token')
			const response = await axios.put(
				`http://localhost:8080/v1/roster`,
				{
					data: shifts,
					id: roster?.employee._id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			console.log(response.data)
			fetchRoster()
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
			console.log(error)
		}
	}

	return (
		<div className='py-24'>
			{roster && (
				<div className='flex w-full justify-center'>
					<div className='px-8 pt-1 text-center'>
						<h2 className='text-2xl'>{roster.month}</h2>
						<h1 className='text-4xl'>{roster.employee.name}</h1>
						<form onSubmit={handleSubmit}>
							<button className='mt-4 rounded bg-black px-8 py-2 text-xl text-white active:scale-95 '>
								Submit Changes
							</button>
						</form>
					</div>
					<Table
						data={shifts}
						headings={headings}
						editable={true}
					/>
				</div>
			)}
		</div>
	)
}

export default RosterPage
