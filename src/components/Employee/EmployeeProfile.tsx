import axios from 'axios'
import Modal from '../ui/Modal.tsx'
import Button from '../ui/Button.tsx'
import Dropdown from './Dropdown.tsx'
import Heading from '../ui/Heading.tsx'
import Paragraph from '../ui/Paragraph.tsx'
import { Mail, MapPin, MoreVertical, Palmtree, Phone, Scroll, Sticker } from 'lucide-react'
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
	address: string
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
			await axios.delete(`${import.meta.env.VITE_BASE_URL}/employees/${employee._id}?id=${employee._id}`, {
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
		<div className='slide-in-bottom mt-40 w-10/12 rounded-md bg-white py-4 shadow-lg dark:bg-slate-700'>
			<div className='relative flex'>
				<Button
					className='ml-auto min-w-0 rounded-full hover:bg-slate-50 dark:hover:bg-slate-600'
					variant={'link'}
					onClick={() => setShowDropdown(!showDropdown)}>
					<MoreVertical />
				</Button>
				{showDropdown && (
					<Dropdown
						showDelete={true}
						employee={employee}
						setShowModal={setShowModal}
						setShowDropdown={setShowDropdown}
					/>
				)}
			</div>
			<div className='space-y-6 border-b border-slate-300 pb-8 dark:border-slate-500'>
				<Heading
					className=' text-center'
					size={'default'}>
					{employee.name}
				</Heading>

				<Heading
					size={'xs'}
					className='text-center font-normal'>
					Total hours for this month: {calculateMonthlyHours(shifts)}
				</Heading>
				<div className='flex w-full justify-evenly'>
					<div className='flex w-1/3 justify-center  border-r border-slate-400 px-8 py-1'>
						<Paragraph
							size={'xl'}
							className='flex items-center'>
							<Phone className='mr-4' />
							{employee.phone}
						</Paragraph>
					</div>

					<div className='flex w-1/3 justify-center  border-r border-slate-400 px-8 py-1'>
						<Paragraph
							size={'xl'}
							className='flex items-center'>
							<Mail className='mr-4' /> {employee.email}
						</Paragraph>
					</div>

					<div className='flex w-1/3 justify-center  px-8 py-1'>
						<Paragraph
							size={'xl'}
							className='flex items-center'>
							<MapPin className='mr-4' />
							{employee.address}
						</Paragraph>
					</div>
				</div>
			</div>

			<div className='flex w-full flex-col items-center border-b border-slate-300 py-4 dark:border-slate-500'>
				<Heading
					size={'xs'}
					className='flex items-center'>
					Notes
					<Scroll
						size={26}
						className='ml-2'
					/>
				</Heading>

				<div className='flex flex-col py-2'>
					{employee.notes.length > 0 ? (
						employee.notes.map((note, index) => <Paragraph key={index}>{note}</Paragraph>)
					) : (
						<Paragraph>There are no notes for this employee.</Paragraph>
					)}
				</div>
			</div>

			<div className='flex w-full flex-col items-center border-b border-slate-300 py-4 dark:border-slate-500'>
				<Heading
					size={'xs'}
					className='flex items-center'>
					Vacation{' '}
					<Palmtree
						size={26}
						className='ml-2'
					/>
				</Heading>
				<div className='flex flex-col space-y-2 py-2'>
					<Paragraph
						size={'xl'}
						className='mx-auto font-medium'>
						{checkEmployeeVacation(employee)}
					</Paragraph>
				</div>
			</div>

			<div className='flex w-full flex-col items-center py-4'>
				<Heading
					size={'xs'}
					className='flex items-center'>
					Shift Preferences{' '}
					<Sticker
						size={26}
						className='ml-2'
					/>
				</Heading>

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
					submit={deleteEmployee}
					cancel={() => setShowModal(false)}
					text={'Are you sure you want to delete this employee?'}
				/>
			)}
		</div>
	)
}

export default EmployeeProfile
