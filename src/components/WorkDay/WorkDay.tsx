import axios from 'axios'
import Employee from './Employee'
import Button from '../ui/Button'
import AddShift from './AddShift'
import Heading from '../ui/Heading'
import { FC, useState } from 'react'
import { XCircle } from 'lucide-react'
import Paragraph from '../ui/Paragraph'
import Notification from '../ui/Notification'
import { formatDate } from '../../utils/DateFormatting'
import Modal from '../ui/Modal'

interface Shift {
	end: number
	_id: string
	start: number
	loading: boolean
	employee: { name: string; _id: string }
}

interface WorkDayProps {
	error: string
	setError: any
	message: string
	setMessage: any
	setWorkDay: any
	workDay: WorkDay | null
	loading: boolean
	setLoading: any
}

interface WorkDay {
	notes: []
	_id: string
	date: number
	shifts: Shift[]
}

const WorkDay: FC<WorkDayProps> = ({
	workDay,
	setWorkDay,
	error,
	setError,
	message,
	setMessage,
	loading,
	setLoading,
}) => {
	const [note, setNote] = useState<string>('')
	const [showModal, setShowModal] = useState<boolean>(false)
	const [showAddNote, setShowAddNote] = useState<boolean>(false)
	const [noteIndex, setNoteIndex] = useState<number | null>(null)
	const [showAddShift, setShowAddShift] = useState<boolean>(false)

	const addNote = async () => {
		if (!showAddNote) {
			setShowAddNote(true)
			setShowAddShift(false)
			return
		}
		setLoading(true)
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
			setLoading(false)
			setShowAddNote(false)
			setMessage(data.message)
		} catch (error: any) {
			setMessage('')
			setLoading(false)
			setError(error.response.data.message)
		}
	}

	const deleteNote = async (index: number | null) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.delete(
				`http://localhost:8080/v1/days/notes/?workDay=${workDay?._id}&index=${index}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setError('')
			setLoading(false)
			setShowModal(false)
			setMessage(data.message)
		} catch (error: any) {
			setMessage('')
			setLoading(false)
			setShowModal(false)
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
						loading={loading}
						setLoading={setLoading}
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
					workDay.notes.map((note, index) => (
						<div className='flex items-center'>
							<Paragraph
								size={'sm'}
								className='w-96'
								key={workDay._id}>
								{note}
							</Paragraph>
							<Button
								size={'sm'}
								variant={'link'}
								className='min-w-[3rem]'
								onClick={() => {
									setShowModal(true)
									setNoteIndex(index)
								}}
								title='Delete note'>
								{<XCircle />}
							</Button>
							{showModal && (
								<Modal
									text={'Delete note?'}
									showModal={showModal}
									loading={loading}
									cancel={() => setShowModal(false)}
									submit={() => deleteNote(noteIndex)}
								/>
							)}
						</div>
					))}

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
					loading={loading}
					setLoading={setLoading}
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
