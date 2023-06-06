import Note from './Note'
import AddNote from './AddNote'
import Employee from './Employee'
import Button from '../ui/Button'
import AddShift from './AddShift'
import Heading from '../ui/Heading'
import { FC, useState } from 'react'
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
	const [showAddNote, setShowAddNote] = useState<boolean>(false)
	const [showAddShift, setShowAddShift] = useState<boolean>(false)

	return (
		<>
			<div className='flex justify-center space-x-6 '>
				<div className='mb-12 flex space-x-3'>
					<Heading size={'sm'}>{workDay && formatDay(workDay.date)}</Heading>
					<Heading size={'sm'}>{workDay && formatDate(workDay.date)}</Heading>
				</div>
				<div className='space-x-1'>
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
						onClick={() => setShowAddNote(true)}>
						Add Note {<ScrollText className='ml-2 h-5 w-5' />}
					</Button>
				</div>
			</div>

			{workDay && workDay.shifts.length < 1 && !showAddShift && (
				<Heading
					className='mt-20 w-10/12 border-b-2 pb-6 text-center'
					size={'xs'}>
					{' '}
					There are currently no shifts for this day.{' '}
				</Heading>
			)}

			<div className='flex flex-col items-center space-y-2 border-b-2 dark:border-slate-700'>
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
			<div className='flex w-10/12 flex-col items-center space-y-6 py-6 dark:border-slate-700'>
				{workDay && workDay.notes.length > 0 && (
					<Heading
						className='font-normal'
						size={'xs'}>
						Notes
					</Heading>
				)}
				{workDay &&
					workDay.notes.length > 0 &&
					!showAddNote &&
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

				{workDay && !showAddNote && workDay.notes.length < 1 && (
					<Paragraph size={'xl'}>There are no notes for this day.</Paragraph>
				)}

				{showAddNote && (
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
