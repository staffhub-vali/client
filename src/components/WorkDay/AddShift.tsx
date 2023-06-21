import axios from 'axios'
import Input from '../ui/Input.tsx'
import Label from '../ui/Label.tsx'
import Button from '../ui/Button.tsx'
import { Logout } from '../../Auth.tsx'
import Heading from '../ui/Heading.tsx'
import { Check, X } from 'lucide-react'
import Paragraph from '../ui/Paragraph.tsx'
import SearchEmployees from '../Schedule/SearchEmployees.tsx'
import { formatTime, formatTotal } from '../../utils/DateFormatting.ts'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

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
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setShowAddShift: Dispatch<SetStateAction<boolean>>
	setMessage: Dispatch<SetStateAction<string | null>>
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
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/employees`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setEmployees(response.data)
		} catch (error: any) {
			setError(error.response.data.message)
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
				`${import.meta.env.VITE_BASE_URL}/shifts`,
				{ workDayId: workDay?._id, start: start, end: end, employeeId: employeeId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setShowAddShift(false)
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
		<div className='slide-in-bottom w-10/12 py-6'>
			<Heading
				size={'xs'}
				className='text-center font-normal'>
				Add a New Shift
			</Heading>
			<form
				onSubmit={handleSubmit}
				className='mt-2 flex justify-center space-x-12'>
				<div className='mt-auto flex flex-col'>
					<Label className='text-center'>Employee</Label>
					<SearchEmployees
						name={name}
						isOpen={isOpen}
						setName={setName}
						inputSize={'default'}
						employees={employees}
						setIsOpen={setIsOpen}
						setId={setEmployeeId}
						noMargin={true}
					/>
				</div>
				<div className='flex space-x-3'>
					<div className='mt-auto flex flex-col'>
						<Label
							htmlFor='start'
							className='text-center'>
							Start
						</Label>
						<Input
							type='text'
							value={formatTime(start)}
							name='start'
							placeholder='Start time'
							className='m-0 text-center text-lg'
							onChange={(e) => handleTimeChange(e.target.value, 'start')}
						/>
					</div>

					<div className='mt-auto flex flex-col'>
						<Label
							htmlFor='end'
							className='text-center'>
							End
						</Label>
						<Input
							name='end'
							type='text'
							placeholder='End time'
							value={formatTime(end)}
							className='m-0 text-center text-lg'
							onChange={(e) => handleTimeChange(e.target.value, 'end')}
						/>
					</div>
				</div>
				<div className='mt-auto flex w-48 flex-col'>
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
						type='button'
						variant={'outline'}
						onClick={() => setShowAddShift(false)}>
						Cancel {<X className='ml-1 h-4 w-4' />}
					</Button>
					<Button
						size={'sm'}
						loading={loading}
						title='Create shift'>
						Create {<Check className='ml-1 h-4 w-4' />}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AddShift
