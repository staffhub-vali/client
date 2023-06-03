import { Dispatch, FC, SetStateAction, useState } from 'react'
import Heading from '../ui/Heading'
import { formatDate, formatTime, formatTotal } from '../../utils/DateFormatting'
import Paragraph from '../ui/Paragraph'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import Input from '../ui/Input'
import axios from 'axios'

interface WorkDayProps {
	workDay: WorkDay | null
	setWorkDay: any
}

interface WorkDay {
	_id: string
	date: number
	notes: []
	shifts: [{ _id: string; employee: { name: string; _id: string }; start: number; end: number }]
}

const WorkDay: FC<WorkDayProps> = ({ workDay, setWorkDay }) => {
	const [isLoading, setIsLoading] = useState(false)
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
							<form>
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
							</form>
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

						{editMode[shift._id] ? (
							<Button
								size={'sm'}
								isLoading={isLoading}
								onClick={() => toggleEditMode(shift._id)}>
								Save
							</Button>
						) : (
							<Button
								size={'sm'}
								isLoading={isLoading}
								onClick={() => toggleEditMode(shift._id)}>
								Edit
							</Button>
						)}
					</div>
				))}
			</div>
		</>
	)
}

export default WorkDay
