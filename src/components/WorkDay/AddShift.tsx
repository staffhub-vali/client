import Input from '../ui/Input'
import Label from '../ui/Label'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Paragraph from '../ui/Paragraph'
import SearchEmployees from '../Schedule/SearchEmployees'
import { formatTime, formatTotal } from '../../utils/DateFormatting'
import { Logout } from '../../Auth'
import axios from 'axios'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import { Check, X } from 'lucide-react'

interface WorkDay {
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

interface AddShiftProps {
	loading: boolean
	workDay: WorkDay | null
	setError: Dispatch<SetStateAction<string>>
	setMessage: Dispatch<SetStateAction<string>>
	setLoading: Dispatch<SetStateAction<boolean>>
	setShowAddShift: Dispatch<SetStateAction<boolean>>
}

const AddShift: FC<AddShiftProps> = ({ workDay, setShowAddShift, setError, setMessage, loading, setLoading }) => {
	const [name, setName] = useState<string>('')
	const [employees, setEmployees] = useState<[]>([])
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [employeeId, setEmployeeId] = useState<string>('')
	const [end, setEnd] = useState<number | undefined>(undefined)
	const [start, setStart] = useState<number | undefined>(undefined)

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
			const [hour, minute]: string[] = newTime.split(':')
			const newDate: any = new Date(workDay.date * 1000)
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
		<div className='w-10/12 py-6'>
			<Heading
				size={'xs'}
				className='text-center font-normal'>
				Add a New Shift
			</Heading>
			<form
				onSubmit={handleSubmit}
				className='mt-2 flex justify-center space-x-12'>
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
					<Button
						size={'sm'}
						variant={'cancel'}
						type='button'
						onClick={() => setShowAddShift(false)}>
						Cancel {<X className='ml-1 h-4 w-4' />}
					</Button>
					<Button
						size={'sm'}
						loading={loading}>
						Create {<Check className='ml-1 h-4 w-4' />}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AddShift
