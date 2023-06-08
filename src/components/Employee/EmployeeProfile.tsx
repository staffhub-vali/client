import axios from 'axios'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'
import { Mail, MoreVertical, Pencil, Phone, Trash, Trash2 } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { calculateMonthlyHours } from '../../utils/CalculateHours'

interface EmployeeProfileProps {
	data: {
		_id: string
		name: string
		email: string
		phone: string
		sickDays: number | string
		vacationDays: number | string
	}
	showDropdown: boolean
	setShowDropdown: Dispatch<SetStateAction<boolean>>
	shifts: Shift[]
	setEdit: Dispatch<SetStateAction<boolean>>
}

interface Shift {
	start: number
	end: number
}

const EmployeeProfile: FC<EmployeeProfileProps> = ({ data, shifts, setEdit, showDropdown, setShowDropdown }) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)

	const deleteEmployee = async () => {
		const token = localStorage.getItem('token')
		try {
			setLoading(true)
			await axios.delete(`http://localhost:8080/v1/employees/${data._id}?id=${data._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setShowModal(false)
			window.location.href = '/employees'
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<Container className='mt-40 rounded bg-white px-2 py-4 shadow dark:bg-slate-700'>
			<div className='relative ml-auto'>
				<Button
					className='ml-auto min-w-0 rounded-full hover:bg-slate-50 dark:hover:bg-slate-600'
					variant={'link'}
					onClick={() => setShowDropdown(!showDropdown)}>
					<MoreVertical />
				</Button>
				{showDropdown && (
					<div className='absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg  ring-1 ring-black ring-opacity-5 dark:bg-slate-600'>
						<ul>
							<li
								onClick={() => setEdit(true)}
								className='flex cursor-pointer items-center justify-between border-b px-4 py-3 hover:bg-slate-50 dark:border-slate-500 dark:hover:bg-slate-500'>
								Edit Information
								<Pencil className='ml-2' />
							</li>
							<li
								onClick={() => {
									setShowModal(true)
									setShowDropdown(false)
								}}
								className='flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-500'>
								Delete Employee
								<Trash2 className='ml-2 text-red-500' />
							</li>
						</ul>
					</div>
				)}
			</div>

			<div className='w-full border-b pb-4 dark:border-slate-500'>
				<Heading
					className='border-b pb-4 text-center dark:border-slate-500'
					size={'sm'}>
					{data.name}
				</Heading>
				<Paragraph
					size={'xl'}
					className='mx-auto pt-3'>
					Total hours for this month:
					<span className='ml-2 font-bold text-blue-500 dark:text-blue-300'>{calculateMonthlyHours(shifts)}</span>
				</Paragraph>
				<Paragraph
					className='mx-auto pt-3'
					size={'xl'}>
					Vacation days remaining:
					<span className='ml-2 font-bold text-green-500 dark:text-green-400'>{data.vacationDays}</span>
				</Paragraph>
			</div>

			<div className='flex w-full flex-col items-center border-b py-4 dark:border-slate-500'>
				<Heading size={'xs'}>Shift Preferences</Heading>

				<div className='flex flex-col py-2'>
					<Paragraph className='flex'>06:00 - 14:00</Paragraph>
					<Paragraph className='flex'>08:00 - 16:00</Paragraph>
				</div>
			</div>

			<div className='flex w-full flex-col items-center border-b py-4 dark:border-slate-500'>
				<Heading size={'xs'}>Notes</Heading>

				<div className='flex flex-col py-2'>
					<Paragraph className='flex'>Very good knowledge of english</Paragraph>
					<Paragraph className='flex'>Works best under high pressure</Paragraph>
				</div>
			</div>
			<div className='flex w-full flex-col items-center py-4'>
				<Heading size={'xs'}>Personal Information</Heading>

				<div className='flex space-x-16 py-6'>
					<Paragraph className='flex'>
						<Mail className='mr-2' /> {data.email}
					</Paragraph>
					<Paragraph className='flex'>
						<Phone className='mr-2' />
						{data.phone}
					</Paragraph>
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
		</Container>
	)
}

export default EmployeeProfile
