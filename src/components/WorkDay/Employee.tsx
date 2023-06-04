import axios from 'axios'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { FC, useState } from 'react'
import Paragraph from '../ui/Paragraph'
import { Link } from 'react-router-dom'
import { formatTime, formatTotal } from '../../utils/DateFormatting'

interface EmployeeProps {
	shift: Shift
	index: number
	setError: any
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

const Employee: FC<EmployeeProps> = ({ shift, index, workDay, setWorkDay, setMessage, setError }) => {
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
						onClick={() => toggleEditMode(shift._id)}
						variant={'cancel'}>
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
						onClick={() => setShowModal(true)}>
						Delete
					</Button>
				</div>
			)}
			{showModal && (
				<Modal
					showModal={showModal}
					isLoading={isLoading}
					cancel={() => setShowModal(false)}
					submit={() => handleDelete(shift._id)}
					text={'Are you sure you want to delete this shift?'}
				/>
			)}
		</div>
	)
}

export default Employee
