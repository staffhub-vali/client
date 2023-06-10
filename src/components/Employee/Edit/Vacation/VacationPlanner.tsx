import axios from 'axios'
import Calendar from 'react-calendar'
import Button from '../../../ui/Button'
import Heading from '../../../ui/Heading'
import Paragraph from '../../../ui/Paragraph'
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Check } from 'lucide-react'

interface VacationPlannerProps {
	loading: boolean
	employee: Employee
	setLoading: Dispatch<SetStateAction<boolean>>
	setShowPlanner: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

interface Employee {
	_id: string
	name: string
	email: string
	phone: string
	notes: string[]
	vacationDays: number
	shiftPreferences: string[]
}

const VacationPlanner: FC<VacationPlannerProps> = ({
	loading,
	setLoading,
	employee,
	setMessage,
	setError,
	setShowPlanner,
}) => {
	const [end, setEnd] = useState(new Date())
	const [start, setStart] = useState(new Date())
	const [daysPlanned, setDaysPlanned] = useState(0)
	const [daysRemaining, setDaysRemaining] = useState(employee.vacationDays)

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
		} else setError("You can't plan that many days.")
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				'http://localhost:8080/v1/employees/vacation',
				{
					employeeId: employee._id,
					start: start.getTime(),
					end: end.getTime(),
					daysRemaining: daysRemaining,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setLoading(false)
			setEnd(new Date())
			setStart(new Date())
			setShowPlanner(false)
			setMessage(data.message)
		} catch (error: any) {
			setError(error.data.response.message)
		}
	}

	return (
		<>
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
			<div className='mt-12 flex space-x-24'>
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
				className='mt-10'>
				Days planned: {daysPlanned}
			</Heading>

			<form
				className='mt-6'
				onSubmit={handleSubmit}>
				<Button
					size={'sm'}
					loading={loading}>
					Submit <Check className='ml-2 h-5 w-5' />
				</Button>
			</form>
		</>
	)
}

export default VacationPlanner
