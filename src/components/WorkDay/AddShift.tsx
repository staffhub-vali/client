import Input from '../ui/Input'
import Label from '../ui/Label'
import { FC, useEffect, useState } from 'react'
import Paragraph from '../ui/Paragraph'
import SearchEmployees from '../Schedule/SearchEmployees'
import { formatTime, formatTotal } from '../../utils/DateFormatting'
import { Logout } from '../../Auth'
import axios from 'axios'
import Button from '../ui/Button'
import Heading from '../ui/Heading'

interface WorkDay {
	notes: []
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

interface AddShiftProps {
	workDay: WorkDay | null
	setShowAddShift: any
	setError: any
	setMessage: any
	loading: boolean
	setLoading: any
}

const AddShift: FC<AddShiftProps> = ({ workDay, setShowAddShift, setError, setMessage, loading, setLoading }) => {
	const [name, setName] = useState<string>('')
	const [employees, setEmployees] = useState<[]>([])
	const [end, setEnd] = useState<number | null>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [start, setStart] = useState<number | null>(null)
	const [employeeId, setEmployeeId] = useState<string>('')

	useEffect(() => {
		fetchEmployees()
	}, [])

	const fetchEmployees = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get('http://localhost:8080/v1/employees', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setEmployees(response.data)
		} catch (error: any) {
			console.log(error)
			if (error.response.status === 401) {
				Logout()
			}
		}
	}
	const handleTimeChange = (newTime: string, field: 'start' | 'end') => {
		// convert the new time into Unix timestamp
		if (workDay) {
			const [hour, minute]: any = newTime.split(':')
			const newDate = new Date(workDay.date * 1000)
			newDate.setHours(hour)
			newDate.setMinutes(minute)
			const newUnixTime = Math.floor(newDate.getTime() / 1000)

			field === 'start' ? setStart(newUnixTime) : setEnd(newUnixTime)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				'http://localhost:8080/v1/shifts',
				{ workDayId: workDay?._id, start: start, end: end, employeeId: employeeId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setError('')
			setLoading(false)
			setShowAddShift(false)
			setMessage(data.message)
		} catch (error: any) {
			setMessage('')
			setLoading(false)
			setError(error.response.data.message)
		}
	}

	return (
		<>
			<Heading
				size={'sm'}
				className='pb-8 pt-12 text-center'>
				New Shift
			</Heading>
			<form
				onSubmit={handleSubmit}
				className='flex justify-center space-x-12'>
				<div>
					<Label className='text-center'>Employee</Label>
					<SearchEmployees
						name={name}
						isOpen={isOpen}
						setName={setName}
						inputSize={'default'}
						employees={employees}
						setIsOpen={setIsOpen}
						setId={setEmployeeId}
					/>
				</div>
				<div className='flex space-x-3'>
					<div className='flex flex-col'>
						<Label
							htmlFor='start'
							className='text-center'>
							Start
						</Label>
						<Input
							type='text'
							value={formatTime(start)}
							name='start'
							className='m-0 text-center text-lg'
							onChange={(e) => handleTimeChange(e.target.value, 'start')}
						/>
					</div>

					<div className='flex flex-col'>
						<Label
							htmlFor='end'
							className='text-center'>
							End
						</Label>
						<Input
							name='end'
							type='text'
							value={formatTime(end)}
							className='m-0 text-center text-lg'
							onChange={(e) => handleTimeChange(e.target.value, 'end')}
						/>
					</div>
				</div>
				<div className='flex flex-col'>
					<Label className='text-center'>Total</Label>
					<Paragraph
						size={'xl'}
						className='mb-2 mt-auto font-semibold'>
						{formatTotal(start, end)}
					</Paragraph>
				</div>
				<div className='mb-1 mt-auto flex space-x-2'>
					<Button loading={loading}>Create</Button>
					<Button
						variant={'cancel'}
						type='button'
						onClick={() => setShowAddShift(false)}>
						Cancel
					</Button>
				</div>
			</form>
		</>
	)
}

export default AddShift
