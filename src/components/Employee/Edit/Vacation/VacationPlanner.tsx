import axios from 'axios'
import Calendar from 'react-calendar'
import Button from '../../../ui/Button'
import Heading from '../../../ui/Heading'
import Paragraph from '../../../ui/Paragraph'
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Check } from 'lucide-react'
import { Logout } from '../../../../Auth'

interface VacationPlannerProps {
	loading: boolean
	employee: Employee
	setAmount: Dispatch<SetStateAction<number>>
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
	setAmount,
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
					daysPlanned: daysPlanned,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setEnd(new Date())
			setStart(new Date())
			setShowPlanner(false)
			setAmount(daysRemaining)
			setMessage(data.message)
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
		<>
			<div className='items-auto mt-12 flex w-full justify-center space-x-2 border-b-2 pb-3 dark:border-slate-700'>
				<Heading
					size={'xs'}
					className='font-normal'>
					Vacation days remaining:
				</Heading>
				<Heading
					size={'xs'}
					className=' text-green-500 dark:text-green-400'>
					{daysRemaining}
				</Heading>
			</div>
			<Heading
				size={'sm'}
				className='mt-10'>
				Days planned: {daysPlanned}
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
