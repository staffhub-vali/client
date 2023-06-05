import axios from 'axios'
import Employee from './Employee'
import Button from '../ui/Button'
import AddShift from './AddShift'
import Heading from '../ui/Heading'
import { FC, useState } from 'react'
import Paragraph from '../ui/Paragraph'
import Notification from '../ui/Notification'
import { formatDate } from '../../utils/DateFormatting'

interface Shift {
	end: number
	_id: string
	start: number
	isLoading: boolean
	employee: { name: string; _id: string }
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

const WorkDay: FC<WorkDayProps> = ({ workDay, setWorkDay, error, setError, message, setMessage }) => {
	const [note, setNote] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [showAddNote, setShowAddNote] = useState<boolean>(false)
	const [showAddShift, setShowAddShift] = useState<boolean>(false)

	const addNote = async () => {
		if (!showAddNote) {
			setShowAddNote(true)
			setShowAddShift(false)
			return
		}
		setIsLoading(true)
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				'http://localhost:8080/v1/days/notes',
				{
					day: workDay?._id,
					note: note,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setNote('')
			setError('')
			setIsLoading(false)
			setShowAddNote(false)
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

			{workDay && workDay.shifts.length < 1 && !showAddShift && (
				<Heading size={'xs'}> There are currently no shifts for this day. </Heading>
			)}

			<div className='flex flex-col items-center space-y-2 border-b-2 py-6 dark:border-slate-700'>
				{workDay?.shifts?.map((shift, index) => (
					<Employee
						shift={shift}
						index={index}
						workDay={workDay}
						setError={setError}
						setMessage={setMessage}
						setWorkDay={setWorkDay}
					/>
				))}
			</div>
			<div className='flex w-10/12 flex-col items-center space-y-6 border-b-2 py-6 dark:border-slate-700'>
				{workDay && workDay.notes.length > 0 && <Heading size={'sm'}>Notes</Heading>}
				{workDay &&
					workDay.notes.length > 0 &&
					workDay.notes.map((note) => (
						<Paragraph
							size={'sm'}
							key={workDay._id}
							className='mb-4'>
							{note}
						</Paragraph>
					))}{' '}
				{!showAddNote && workDay && workDay.notes.length < 1 && (
					<Paragraph
						className='py-12'
						size={'xl'}>
						There are no notes for this day.
					</Paragraph>
				)}
				{showAddNote && (
					<textarea
						name='note'
						rows={5}
						cols={50}
						className='resize-none rounded p-2 shadow'
						placeholder='Anything to note?'
						onChange={(e) => setNote(e.target.value)}>
						{note}
					</textarea>
				)}
				<Button
					onClick={addNote}
					className=''>
					Add Note
				</Button>
			</div>

			{showAddShift ? (
				<AddShift
					workDay={workDay}
					setError={setError}
					setMessage={setMessage}
					setShowAddShift={setShowAddShift}
				/>
			) : (
				<Button
					size={'lg'}
					className='mt-12'
					onClick={() => {
						setShowAddShift(true)
						setShowAddNote(false)
					}}>
					New Shift
				</Button>
			)}

			{error && (
				<Notification
					size={'lg'}
					variant={'error'}
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
