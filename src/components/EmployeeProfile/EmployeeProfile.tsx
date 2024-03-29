import axios from 'axios'
import Modal from '../ui/Modal.tsx'
import Button from '../ui/Button.tsx'
import Dropdown from './Dropdown.tsx'
import { Logout } from '../../Auth.tsx'
import Heading from '../ui/Heading.tsx'
import Paragraph from '../ui/Paragraph.tsx'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import {
	Calendar,
	Mail,
	MapPin,
	MoreVertical,
	Palmtree,
	Pencil,
	Phone,
	Scroll,
	ScrollText,
	Sticker,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface EmployeeProfileProps {
	workDays: WorkDay[]
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

interface WorkDay {
	_id: string
	shifts: Shift[]
	date: number
}

const EmployeeProfile: FC<EmployeeProfileProps> = ({ workDays, employee, showDropdown, setShowDropdown }) => {
	const navigate = useNavigate()

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
		} catch (error: any) {
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setShowModal(false)
			setLoading(false)
		}
	}

	return (
		<div className='slide-in-bottom mt-40 flex min-h-[28rem] w-11/12 rounded-md bg-white shadow-lg dark:bg-slate-700'>
			<div className=' min-w-[32rem] border-r border-slate-300 pb-8 dark:border-slate-500'>
				<Heading
					className=' border-b border-slate-300 py-7 pl-4 text-left 
					dark:border-slate-500'
					size={'sm'}>
					{employee.name}
				</Heading>

				<div className='flex w-full flex-col justify-evenly space-y-6 pl-4 pt-4'>
					<div className='flex border-slate-400 py-1'>
						<Paragraph
							size={'xl'}
							className='flex items-center'>
							<Mail className='mr-4' /> {employee.email}
						</Paragraph>
					</div>

					<div className='flex border-slate-400 py-1'>
						<Paragraph
							size={'xl'}
							className='flex items-center'>
							<Phone className='mr-4' />
							{employee.phone}
						</Paragraph>
					</div>

					<div className='flex py-1'>
						<Paragraph
							size={'xl'}
							className='flex items-center'>
							<MapPin className='mr-4' />
							{employee.address}
						</Paragraph>
					</div>
				</div>
			</div>
			<div className='flex w-full flex-col'>
				<div className='flex items-center'>
					<Button
						className='my-4 ml-auto mr-2 min-w-0 rounded-full  p-8 text-2xl'
						variant={'default'}
						onClick={() => navigate(`/employees/${employee._id}/schedule`)}>
						Schedules <Calendar className='ml-4' />
					</Button>
					<Button
						className='my-4 mr-2 min-w-0 rounded-full bg-slate-200 p-8 text-2xl hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500'
						variant={'link'}
						onClick={() => setShowDropdown(!showDropdown)}>
						Manage <Pencil className='ml-4' />
					</Button>
				</div>
				<div className='flex h-full  w-full border-t border-slate-300 dark:border-slate-500'>
					<div
						onClick={() => navigate(`/employees/${employee._id}/notes`)}
						className='flex w-1/3 cursor-pointer flex-col border-r border-slate-300 py-4 pl-2 transition-colors duration-150 hover:bg-slate-50 dark:border-slate-500 dark:hover:bg-slate-600'>
						<Heading
							size={'xs'}
							className='flex items-center'>
							Notes
							<ScrollText
								size={26}
								className='ml-2'
							/>
						</Heading>

						<div className='flex flex-col py-2'>
							{employee.notes.length > 0 ? (
								employee.notes.map((note, index) => (
									<Paragraph
										key={index}
										className='text-left'>
										{note}
									</Paragraph>
								))
							) : (
								<Paragraph className='text-left'>There are no notes for this employee.</Paragraph>
							)}
						</div>
					</div>

					<div
						onClick={() => navigate(`/employees/${employee._id}/vacation`)}
						className='flex w-1/3 cursor-pointer flex-col border-r border-slate-300
						py-4 pl-2 transition-colors duration-150 hover:bg-slate-50 dark:border-slate-500 dark:hover:bg-slate-600'>
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
							<Paragraph className='text-left'>{checkEmployeeVacation(employee)}</Paragraph>
						</div>
					</div>

					<div
						onClick={() => navigate(`/employees/${employee._id}/preferences`)}
						className='flex w-1/3 cursor-pointer flex-col py-4
						pl-2 transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-600'>
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
									<Paragraph
										key={index}
										className='text-left'>
										{shiftPreference}
									</Paragraph>
								))
							) : (
								<Paragraph className='text-left'>There are no shift preferences for this employee.</Paragraph>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='relative mt-10 flex'>
				{showDropdown && (
					<Dropdown
						showDelete={true}
						employee={employee}
						setShowModal={setShowModal}
						setShowDropdown={setShowDropdown}
					/>
				)}
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
