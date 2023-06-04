import Employee from './Employee'
import Button from '../ui/Button'
import AddShift from './AddShift'
import Heading from '../ui/Heading'
import { FC, useState } from 'react'
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
	const [showAddShift, setShowAddShift] = useState(false)

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

			<div className='flex flex-col items-center space-y-2 border-b-2 py-12 dark:border-slate-700'>
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
					onClick={() => setShowAddShift(true)}>
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
