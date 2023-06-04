import axios from 'axios'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Paragraph from '../ui/Paragraph'
import Notification from '../ui/Notification'
import { formatDate, formatTime, formatTotal } from '../../utils/DateFormatting'

interface WorkDayProps {
	setWorkDay: any
	workDay: WorkDay | null
}

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
	isLoading: boolean
	employee: { name: string; _id: string }
}

const WorkDay: FC<WorkDayProps> = ({ workDay, setWorkDay }) => {
	const [error, setError] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({})

	const toggleEditMode = (shiftId: string) => {
		setEditMode((prevState) => {
			const updatedEditMode: any = {}

			// Set edit mode to false for all shifts
			Object.keys(prevState).forEach((key) => {
				updatedEditMode[key] = false
			})

			// Toggle edit mode for the clicked shift
			updatedEditMode[shiftId] = !prevState[shiftId]

			return updatedEditMode
		})
	}

	const handleTimeChange = (newTime: string, field: 'start' | 'end', index: number) => {
		if (workDay) {
			// convert the new time into Unix timestamp
			const [hour, minute]: any = newTime.split(':')
			const newDate = new Date(workDay.date * 1000)
			newDate.setHours(hour)
			newDate.setMinutes(minute)
			const newUnixTime = Math.floor(newDate.getTime() / 1000)

			// set the new data
			const newShifts = workDay?.shifts.map((d, i) => (i === index ? { ...d, [field]: newUnixTime } : d))
			const newWorkDay = {
				_id: workDay._id,
				shifts: newShifts,
				date: workDay.date,
				notes: workDay.notes,
			}
			setWorkDay(newWorkDay)
		}
	}

	const handleSubmit = async (e: React.FormEvent, shiftId: string) => {
		e.preventDefault()
		const updatedWorkDay: WorkDay | any = { ...workDay }

		// Find the shift with the matching shiftId
		const shiftIndex = updatedWorkDay.shifts.findIndex((shift: Shift) => shift._id === shiftId)
		if (shiftIndex !== -1) {
			updatedWorkDay.shifts[shiftIndex].isLoading = true
			setWorkDay(updatedWorkDay)
		}

		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.put(`http://localhost:8080/v1/days/${workDay?._id}`, workDay, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setError('')
			setMessage(data.message)
		} catch (error: any) {
			setMessage('')
			setError(error.response.data.message)
		}

		// Reset the isLoading property after the request is completed
		if (shiftIndex !== -1) {
			updatedWorkDay.shifts[shiftIndex].isLoading = false
			setWorkDay(updatedWorkDay)
		}
	}

	return (
		<>
			<Heading
				size={'sm'}
				className='mb-12'>
				{workDay && formatDate(workDay.date)}
			</Heading>
			<div className='flex flex-col items-center space-y-2'>
				{workDay?.shifts?.map((shift, index) => (
					<div
						className='flex items-center justify-between'
						key={shift._id}>
						<Paragraph
							size={'xl'}
							className='w-96 py-2'>
							<Link
								className='hover:text-sky-500'
								to={`/employees/${shift.employee._id}`}>
								{' '}
								{shift?.employee.name}
							</Link>
						</Paragraph>

						{editMode[shift._id] ? (
							<>
								<Input
									type='text'
									value={formatTime(shift.start)}
									className='m-0 mx-2 w-44 text-center'
									onChange={(e) => handleTimeChange(e.target.value, 'start', index)}
								/>
								<Input
									type='text'
									value={formatTime(shift.end)}
									className='m-0 mx-2 w-44 text-center'
									onChange={(e) => handleTimeChange(e.target.value, 'end', index)}
								/>
							</>
						) : (
							<Paragraph
								size={'xl'}
								className='w-96 '>
								{formatTime(shift.start)} - {formatTime(shift.end)}
							</Paragraph>
						)}

						<Paragraph
							size={'xl'}
							className='w-96'>
							{' '}
							{formatTotal(shift.start, shift.end)}
						</Paragraph>

						{editMode[shift._id] && (
							<form onSubmit={(e) => handleSubmit(e, shift._id)}>
								<Button
									size={'sm'}
									isLoading={shift.isLoading}>
									Save
								</Button>
							</form>
						)}

						{!editMode[shift._id] && (
							<Button
								size={'sm'}
								isLoading={shift.isLoading}
								onClick={() => toggleEditMode(shift._id)}>
								Edit
							</Button>
						)}
					</div>
				))}
			</div>
			{error && (
				<Notification
					size={'lg'}
					position={'bottom'}>
					{error}
				</Notification>
			)}
			{message && (
				<Notification
					size={'lg'}
					position={'bottom'}>
					{message}
				</Notification>
			)}
		</>
	)
}

export default WorkDay
