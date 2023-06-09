import Note from './Note'
import AddNote from './AddNote'
import Employee from './Employee'
import Button from '../ui/Button'
import AddShift from './AddShift'
import Heading from '../ui/Heading'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Clock8, ScrollText } from 'lucide-react'
import Paragraph from '../ui/Paragraph'
import Notification from '../ui/Notification'
import { formatDate, formatDay } from '../../utils/DateFormatting'

interface Shift {
	end: number
	_id: string
	start: number
	loading: boolean
	employee: { name: string; _id: string }
}

interface WorkDayProps {
	error: string
	message: string
	loading: boolean
	workDay: WorkDay
	setError: Dispatch<SetStateAction<string>>
	setMessage: Dispatch<SetStateAction<string>>
	setWorkDay: Dispatch<SetStateAction<WorkDay>>
	setLoading: Dispatch<SetStateAction<boolean>>
}

interface WorkDay {
	notes: string[]
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
	const [showAddNote, setShowAddNote] = useState<boolean>(false)
	const [showAddShift, setShowAddShift] = useState<boolean>(false)

	return (
		<>
			<div className='my-6 flex w-10/12 items-center justify-center space-x-10 border-b-2 pb-6 dark:border-slate-700 '>
				<div className='flex space-x-3'>
					<Heading size={'sm'}>{formatDay(workDay.date)}</Heading>
					<Heading size={'sm'}>{formatDate(workDay.date)}</Heading>
				</div>
				<div className='space-x-2'>
					<Button
						size={'sm'}
						className=''
						onClick={() => {
							setShowAddShift(true)
							setShowAddNote(false)
						}}>
						New Shift {<Clock8 className='ml-2 h-5 w-5' />}
					</Button>
					<Button
						size={'sm'}
						variant={'outline'}
						onClick={() => {
							setShowAddNote(true)
							setShowAddShift(false)
						}}>
						Add Note {<ScrollText className='ml-2 h-5 w-5' />}
					</Button>
				</div>
			</div>

			{workDay.shifts.length < 1 && !showAddShift && !showAddNote && (
				<Heading
					className='w-10/12 border-b-2 py-6 text-center font-normal dark:border-slate-700'
					size={'xs'}>
					{' '}
					There are currently no shifts for this day.{' '}
				</Heading>
			)}
			{workDay.shifts.length > 0 && (
				<div className='flex w-10/12 flex-col items-center space-y-2 border-b-2 pb-6 dark:border-slate-700'>
					{workDay?.shifts?.map((shift, index) => (
						<Employee
							shift={shift}
							index={index}
							loading={loading}
							workDay={workDay}
							setError={setError}
							setMessage={setMessage}
							setWorkDay={setWorkDay}
							setLoading={setLoading}
						/>
					))}
				</div>
			)}

			{showAddShift && (
				<AddShift
					loading={loading}
					setLoading={setLoading}
					workDay={workDay}
					setError={setError}
					setMessage={setMessage}
					setShowAddShift={setShowAddShift}
				/>
			)}
			<div className='flex flex-col items-center space-y-6 py-6'>
				{workDay && !showAddShift && !showAddNote && (
					<Heading
						className='font-normal'
						size={'xs'}>
						Notes
					</Heading>
				)}
				{workDay && showAddNote && (
					<Heading
						className='font-normal'
						size={'xs'}>
						Add a note
					</Heading>
				)}
				{workDay.notes.length > 0 &&
					!showAddNote &&
					!showAddShift &&
					workDay.notes.map((note, index) => (
						<Note
							note={note}
							index={index}
							workDay={workDay}
							loading={loading}
							setError={setError}
							setMessage={setMessage}
							setLoading={setLoading}
						/>
					))}

				{!showAddNote && !showAddShift && workDay.notes.length < 1 && (
					<Paragraph size={'xl'}>There are no notes for this day.</Paragraph>
				)}

				{showAddNote && !showAddShift && (
					<AddNote
						workDay={workDay}
						setError={setError}
						setMessage={setMessage}
						setLoading={setLoading}
						showAddNote={showAddNote}
						setShowAddNote={setShowAddNote}
						setShowAddShift={setShowAddShift}
					/>
				)}
			</div>

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
