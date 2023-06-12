import { useNavigate } from 'react-router-dom'
import { Dispatch, FC, SetStateAction } from 'react'
import { Calendar, Palmtree, Scroll, Sticker, Trash2, User2 } from 'lucide-react'

interface DropdownProps {
	employee: {
		_id: string
		name: string
		email: string
		phone: string
		notes: string[]
		shiftPreferences: string[]
		vacationDays: number | string
	}
	setShowModal: Dispatch<SetStateAction<boolean>>
	setShowDropdown: Dispatch<SetStateAction<boolean>>
}

const Dropdown: FC<DropdownProps> = ({ employee, setShowModal, setShowDropdown }) => {
	const navigate = useNavigate()

	return (
		<div className='absolute right-2 top-10 mt-2 w-72 rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-600'>
			<ul>
				<li
					onClick={() => {
						setShowDropdown(false)
						navigate(`/employees/${employee._id}/notes`)
					}}
					className='flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-500'>
					Notes
					<Scroll className='ml-2' />
				</li>

				<li
					onClick={() => {
						setShowDropdown(false)
						navigate(`/employees/${employee._id}/vacation`)
					}}
					className='flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-500'>
					Vacation
					<Palmtree className='ml-2' />
				</li>

				<li
					onClick={() => {
						setShowDropdown(false)
						navigate(`/employees/${employee._id}/schedule`)
					}}
					className='flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-500'>
					Schedule
					<Calendar className='ml-2' />
				</li>

				<li
					onClick={() => {
						setShowDropdown(false)
						navigate(`/employees/${employee._id}/preferences`)
					}}
					className='flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-500'>
					Shift Preferences
					<Sticker className='ml-2' />
				</li>
				<li
					onClick={() => navigate(`/employees/${employee._id}/about`)}
					className='flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-slate-50  dark:hover:bg-slate-500'>
					Personal Information
					<User2 className='ml-2' />
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
	)
}

export default Dropdown
