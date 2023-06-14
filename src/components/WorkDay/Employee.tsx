import axios from 'axios'
import Modal from '../ui/Modal.tsx'
import Input from '../ui/Input.tsx'
import Button from '../ui/Button.tsx'
import { Link } from 'react-router-dom'
import { Logout } from '../../Auth.tsx'
import Paragraph from '../ui/Paragraph.tsx'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { formatTime, formatTotal } from '../../utils/DateFormatting.ts'

interface EmployeeProps {
	shift: Shift
	index: number
	loading: boolean
	workDay: WorkDay
	setWorkDay: Dispatch<SetStateAction<WorkDay>>
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

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

const Employee: FC<EmployeeProps> = ({
	shift,
	index,
	workDay,
	setWorkDay,
	setMessage,
	setError,
	loading,
	setLoading,
}) => {
	const [showModal, setShowModal] = useState(false)

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
			const [hour, minute]: string[] = newTime.split(':')
			const newDate: any = new Date(workDay.date * 1000)

			newDate.setHours(hour)
			newDate.setMinutes(minute)

			const newUnixTime = Math.floor(newDate.getTime() / 1000)

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
		setLoading(true)

		const updatedWorkDay: WorkDay | any = { ...workDay }

		// Find the shift with the matching shiftId
		const shiftIndex = updatedWorkDay.shifts.findIndex((shift: Shift) => shift._id === shiftId)

		if (shiftIndex !== -1) {
			updatedWorkDay.shifts[shiftIndex].loading = true
			setWorkDay(updatedWorkDay)
		}

		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/days/${workDay?._id}`, workDay, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setMessage(data.message)
		} catch (error: any) {
			setError(error.response.data.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
			toggleEditMode(shiftId)
		}

		// Reset the loading property after the request is completed
		if (shiftIndex !== -1) {
			updatedWorkDay.shifts[shiftIndex].loading = false
			setWorkDay(updatedWorkDay)
		}
	}

	const handleDelete = async (shiftId: string) => {
		const token = localStorage.getItem('token')
		try {
			setLoading(true)
			const { data } = await axios.delete(
				`${import.meta.env.VITE_BASE_URL}/days/${shiftId}?shiftId=${shiftId}&workDayId=${workDay?._id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setMessage(data.message)
		} catch (error: any) {
			setError(error.response.data.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
			setShowModal(false)
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
					{shift?.employee.name}
				</Link>
			</Paragraph>

			{editMode[shift._id] ? (
				<>
					<Input
						type='text'
						title='Shift start'
						value={formatTime(shift.start)}
						className='m-0 mx-2 w-44 text-center'
						onChange={(e) => handleTimeChange(e.target.value, 'start', index)}
					/>
					<Input
						type='text'
						title='Shift end'
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
						type='button'
						title='Cancel editing'
						onClick={() => toggleEditMode(shift._id)}
						variant={'outline'}>
						Cancel {<X className='ml-2 h-4 w-4' />}
					</Button>
					<Button
						size={'sm'}
						title='Save changes'
						loading={shift.loading}>
						Save {<Check className='ml-2 h-4 w-4' />}
					</Button>
				</form>
			)}

			{!editMode[shift._id] && (
				<div className='space-x-2'>
					<Button
						size={'sm'}
						title='Edit Shift'
						loading={shift.loading}
						onClick={() => toggleEditMode(shift._id)}>
						Edit {<Pencil className='ml-2 h-4 w-4' />}
					</Button>
					<Button
						size={'sm'}
						variant={'danger'}
						title='Delete Shift'
						onClick={() => setShowModal(true)}>
						Delete {<Trash2 className='ml-2 h-4 w-4' />}
					</Button>
				</div>
			)}
			{showModal && (
				<Modal
					showModal={showModal}
					loading={loading}
					cancel={() => setShowModal(false)}
					submit={() => handleDelete(shift._id)}
					text={'Are you sure you want to delete this shift?'}
				/>
			)}
		</div>
	)
}

export default Employee
