import axios from 'axios'
import Modal from 'react-modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Paragraph from '../ui/Paragraph'
import Notification from '../ui/Notification'
import { formatDate, formatTime, formatTotal } from '../../utils/DateFormatting'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

interface WorkDayProps {
	error: string
	setError: any
	message: string
	setMessage: any
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

const WorkDay: FC<WorkDayProps> = ({ workDay, setWorkDay, error, setError, message, setMessage }) => {
	const [showModal, setShowModal] = useState(false)

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

	const handleEdit = async (e: React.FormEvent, shiftId: string) => {
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
			toggleEditMode(shiftId)
			setMessage(data.message)
		} catch (error: any) {
			setMessage('')
			toggleEditMode(shiftId)
			setError(error.response.data.message)
		}

		// Reset the isLoading property after the request is completed
		if (shiftIndex !== -1) {
			updatedWorkDay.shifts[shiftIndex].isLoading = false
			setWorkDay(updatedWorkDay)
		}
	}

	const handleDelete = async (shiftId: string) => {
		const token = localStorage.getItem('token')
		try {
			setIsLoading(true)
			const { data } = await axios.delete(
				`http://localhost:8080/v1/days/${shiftId}?shiftId=${shiftId}&workDayId=${workDay?._id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setShowModal(false)
			setError('')
			setMessage(data.message)
		} catch (error: any) {
			setMessage('')
			setIsLoading(false)
			setError(error.response.data.message)
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
							<form
								className='space-x-2'
								onSubmit={(e) => handleEdit(e, shift._id)}>
								<Button
									size={'sm'}
									isLoading={shift.isLoading}>
									Save
								</Button>
								<Button
									size={'sm'}
									type='button'
									isLoading={shift.isLoading}
									onClick={() => toggleEditMode(shift._id)}
									className=' bg-slate-400 text-white hover:bg-slate-400 dark:bg-slate-400 dark:text-white dark:hover:bg-slate-400'>
									Cancel
								</Button>
							</form>
						)}

						{!editMode[shift._id] && (
							<div className='space-x-2'>
								<Button
									size={'sm'}
									isLoading={shift.isLoading}
									onClick={() => toggleEditMode(shift._id)}>
									Edit
								</Button>
								<Button
									size={'sm'}
									variant={'danger'}
									isLoading={shift.isLoading}
									onClick={() => setShowModal(true)}>
									Delete
								</Button>
							</div>
						)}
						{showModal && (
							<Modal
								isOpen={showModal}
								style={customStyles}
								contentLabel='Delete Modal'>
								Are you sure you want to delete this shift?
								<div className='mt-2 flex justify-center space-x-2'>
									<Button
										className='my-2'
										variant={'danger'}
										isLoading={isLoading}
										onClick={() => handleDelete(shift._id)}>
										Yes
									</Button>
									<Button
										className='my-2 bg-slate-400 text-white hover:bg-slate-400 dark:bg-slate-400 dark:text-white dark:hover:bg-slate-400'
										onClick={() => setShowModal(false)}>
										No
									</Button>
								</div>
							</Modal>
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
