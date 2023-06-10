import Calendar from 'react-calendar'
import Heading from '../../../ui/Heading'
import Container from '../../../ui/Container'
import Paragraph from '../../../ui/Paragraph'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Button from '../../../ui/Button'
import axios from 'axios'

interface VacationPlannerProps {
	loading: boolean
	employee: Employee
	setError: Dispatch<SetStateAction<string>>
	setMessage: Dispatch<SetStateAction<string>>
	setLoading: Dispatch<SetStateAction<boolean>>
}

interface Employee {
	_id: string
	name: string
	email: string
	phone: string
	notes: string[]
	shiftPreferences: string[]
	vacationDays: number
}
const VacationPlanner: FC<VacationPlannerProps> = ({ loading, setLoading, employee, setMessage, setError }) => {
	const [end, setEnd] = useState(new Date())
	const [start, setStart] = useState(new Date())
	const [daysPlanned, setDaysPlanned] = useState(0)
	const [daysRemaining, setDaysRemaining] = useState(employee.vacationDays)

	const handleStartChange: any = (date: Date) => {
		const newStart = date
		const newEnd = end
		const millisecondsPerDay = 24 * 60 * 60 * 1000
		const newTotalDays = Math.ceil((newEnd.getTime() - newStart.getTime()) / millisecondsPerDay) + 1

		if (employee.vacationDays - newTotalDays >= 0 && newTotalDays <= 25) {
			setStart(newStart)
			setDaysPlanned(newTotalDays)
			setDaysRemaining(employee.vacationDays - newTotalDays)
		} else setError("You can't plan that many days.")
	}

	const handleEndChange: any = (date: Date) => {
		const newStart = start
		const newEnd = date
		const millisecondsPerDay = 24 * 60 * 60 * 1000
		const newTotalDays = Math.ceil((newEnd.getTime() - newStart.getTime()) / millisecondsPerDay) + 1

		if (employee.vacationDays - newTotalDays >= 0 && newTotalDays <= 25) {
			setEnd(newEnd)
			setDaysPlanned(newTotalDays)
			setDaysRemaining(employee.vacationDays - newTotalDays)
		} else setError("You can't plan that many dayss.")
	}

	const calculateTotalDays = () => {
		const millisecondsPerDay = 24 * 60 * 60 * 1000
		const totalDays = Math.ceil((end.getTime() - start.getTime()) / millisecondsPerDay) + 1
		if (employee.vacationDays - totalDays >= 0) {
			setDaysPlanned(totalDays)
			setDaysRemaining(employee.vacationDays - totalDays)
		}
	}

	useEffect(() => {
		calculateTotalDays()
	}, [start, end])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.put(
				`http://localhost:8080/v1/employees/${employee._id}/vacation`,
				{
					start: start,
					end: end,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setLoading(false)
			setMessage(data.message)
		} catch (error: any) {
			setError(error.data.response.message)
		}
	}

	return (
		<Container>
			<Heading size={'sm'}>{employee.name}</Heading>
			<Paragraph
				size={'xl'}
				className='mt-6'>
				Vacation days remaining
			</Paragraph>
			<Heading
				size={'xs'}
				className='mt-2 text-green-500 dark:text-green-400'>
				{daysRemaining}
			</Heading>

			<div className='mt-12 flex space-x-12'>
				<div>
					<Heading
						className='mb-2 text-center font-normal'
						size={'sm'}>
						Start: {start.toLocaleDateString('en-GB')}
					</Heading>
					<Calendar
						value={start}
						onChange={handleStartChange}
					/>
				</div>
				<div>
					<Heading
						className='mb-2 text-center font-normal'
						size={'sm'}>
						End: {end.toLocaleDateString('en-GB')}
					</Heading>
					<Calendar
						value={end}
						onChange={handleEndChange}
					/>
				</div>
			</div>
			<Heading
				size={'sm'}
				className='mt-6'>
				Days planned: {daysPlanned}
			</Heading>

			<form
				className='mt-6'
				onSubmit={handleSubmit}>
				<Button>Submit</Button>
			</form>
		</Container>
	)
}

export default VacationPlanner
