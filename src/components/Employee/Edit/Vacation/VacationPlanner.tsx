import axios from 'axios'
import { Check } from 'lucide-react'
import Calendar from 'react-calendar'
import Button from '../../../ui/Button'
import { Logout } from '../../../../Auth'
import Heading from '../../../ui/Heading'
import 'react-calendar/dist/Calendar.css'
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'

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

		setDaysPlanned(totalDays)
		setDaysRemaining(employee.vacationDays - totalDays)
	}

	useEffect(() => {
		calculateTotalDays()
	}, [start, end])

	const handleStartChange: any = (date: Date) => {
		const newStart = date
		const millisecondsPerDay = 24 * 60 * 60 * 1000
		const newTotalDays = Math.ceil((end.getTime() - newStart.getTime()) / millisecondsPerDay) + 1

		if (newStart > end) {
			return setError('Start date must be before end date.')
		}

		if (employee.vacationDays - newTotalDays < 0) {
			return setError("You can't plan that many days.")
		}

		setStart(newStart)
		setDaysPlanned(newTotalDays)
		setDaysRemaining(employee.vacationDays - newTotalDays)
	}

	const handleEndChange: any = (date: Date) => {
		const newEnd = date
		const millisecondsPerDay = 24 * 60 * 60 * 1000
		const newTotalDays = Math.ceil((newEnd.getTime() - start.getTime()) / millisecondsPerDay) + 1

		if (newEnd < start) {
			return setError('End date must be after start date.')
		}

		if (employee.vacationDays - newTotalDays < 0) {
			return setError("You can't plan that many days.")
		}

		setEnd(newEnd)
		setDaysPlanned(newTotalDays)
		setDaysRemaining(employee.vacationDays - newTotalDays)
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
			<div className='mt-12 flex h-96 space-x-24'>
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
				className=''
				onSubmit={handleSubmit}>
				<Button
					size={'lg'}
					loading={loading}>
					Submit <Check className='ml-2' />
				</Button>
			</form>
		</>
	)
}

export default VacationPlanner
