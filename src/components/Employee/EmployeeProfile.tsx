import axios from 'axios'
import Modal from '../ui/Modal.tsx'
import Button from '../ui/Button.tsx'
import Dropdown from './Dropdown.tsx'
import Heading from '../ui/Heading.tsx'
import Paragraph from '../ui/Paragraph.tsx'
import { Mail, MoreVertical, Phone } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { calculateMonthlyHours } from '../../utils/CalculateHours.ts'

interface EmployeeProfileProps {
	shifts: Shift[]
	employee: Employee
	showDropdown: boolean
	setShowDropdown: Dispatch<SetStateAction<boolean>>
}

interface Shift {
	start: number
	end: number
}

interface Employee {
	_id: string
	name: string
	email: string
	phone: string
	notes: string[]
	vacations: Vacation[]
	shiftPreferences: string[]
	vacationDays: number | string
}

interface Vacation {
	start: number
	end: number
}

const EmployeeProfile: FC<EmployeeProfileProps> = ({ shifts, employee, showDropdown, setShowDropdown }) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [isOnVacation, setIsOnVacation] = useState<boolean>(false)

	const checkEmployeeVacation = (employee: Employee) => {
		const currentDate: any = Date.now()
		const vacations = employee.vacations

		if (!vacations || vacations.length === 0) {
			return 'No upcoming vacations.'
		}

		for (const vacation of vacations) {
			const startDate: any = new Date(vacation.start)
			const endDate: any = new Date(vacation.end)

			if (currentDate >= startDate && currentDate <= endDate) {
				const remainingDays = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24))
				return `On vacation till ${endDate.toLocaleDateString('en-GB')} ( Ends in ${remainingDays} days )`
			} else if (currentDate < startDate) {
				const remainingDays = Math.ceil((startDate - currentDate) / (1000 * 60 * 60 * 24))
				return `Next vacation in ${remainingDays} days  ( ${startDate.toLocaleDateString('en-GB')} )`
			}
		}

		return 'No upcoming vacations.'
	}

	const deleteEmployee = async () => {
		const token = localStorage.getItem('token')
		try {
			setLoading(true)
			await axios.delete(`http://localhost:8080/v1/employees/${employee._id}?id=${employee._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			window.location.href = '/employees'
		} catch (error) {
			console.log(error)
		} finally {
			setShowModal(false)
			setLoading(false)
		}
	}

	return (
		<div className='mt-40 w-10/12 rounded bg-white py-4 shadow dark:bg-slate-700'>
			<div className='relative flex'>
				<Button
					className='ml-auto min-w-0 rounded-full hover:bg-slate-50 dark:hover:bg-slate-600'
					variant={'link'}
					onClick={() => setShowDropdown(!showDropdown)}>
					<MoreVertical />
				</Button>
				{showDropdown && (
					<Dropdown
						employee={employee}
						setShowModal={setShowModal}
						setShowDropdown={setShowDropdown}
					/>
				)}
			</div>
			<div className='space-y-6 border-b pb-8 dark:border-slate-500'>
				<Heading
					className=' text-center'
					size={'sm'}>
					{employee.name}
				</Heading>

				<Paragraph
					size={'lg'}
					className='mx-auto'>
					Total hours for this month:
					<span className='ml-2 font-bold text-blue-500 dark:text-blue-300'>{calculateMonthlyHours(shifts)}</span>
				</Paragraph>
				<div className='flex justify-center space-x-8'>
					<Paragraph
						size={'xl'}
						className='flex'>
						<Mail className='mr-2' /> {employee.email}
					</Paragraph>
					<Paragraph
						size={'xl'}
						className='flex'>
						<Phone className='mr-2' />
						{employee.phone}
					</Paragraph>
				</div>
			</div>

			<div className='flex w-full flex-col items-center border-b py-4 dark:border-slate-500'>
				<Heading size={'xs'}>Notes</Heading>

				<div className='flex flex-col py-2'>
					{employee.notes.length > 0 ? (
						employee.notes.map((note, index) => <Paragraph key={index}>{note}</Paragraph>)
					) : (
						<Paragraph>There are no notes for this employee.</Paragraph>
					)}
				</div>
			</div>

			<div className='flex w-full flex-col items-center border-b py-4 dark:border-slate-500'>
				<Heading size={'xs'}>Vacation</Heading>
				<div className='flex flex-col space-y-2 py-2'>
					<Paragraph
						size={'xl'}
						className='mx-auto font-medium'>
						{checkEmployeeVacation(employee)}
					</Paragraph>
				</div>
			</div>

			<div className='flex w-full flex-col items-center py-4'>
				<Heading size={'xs'}>Shift Preferences</Heading>

				<div className='flex flex-col py-2'>
					{employee.shiftPreferences.length > 0 ? (
						employee.shiftPreferences.map((shiftPreference, index) => (
							<Paragraph key={index}>{shiftPreference}</Paragraph>
						))
					) : (
						<Paragraph>There are no shift preferences for this employee.</Paragraph>
					)}
				</div>
			</div>

			{showModal && (
				<Modal
					loading={loading}
					showModal={showModal}
					submit={() => deleteEmployee}
					cancel={() => setShowModal(false)}
					text={'Are you sure you want to delete this employee?'}
				/>
			)}
		</div>
	)
}

export default EmployeeProfile
