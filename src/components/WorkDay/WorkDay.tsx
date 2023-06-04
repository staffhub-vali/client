import Heading from '../ui/Heading'
import { FC } from 'react'

import Notification from '../ui/Notification'
import { formatDate } from '../../utils/DateFormatting'
import Employee from './Employee'
import Button from '../ui/Button'

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
	return (
		<>
			<Heading
				size={'sm'}
				className='mb-12'>
				{workDay && formatDate(workDay.date)}
			</Heading>
			<div className='flex flex-col items-center space-y-2'>
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
