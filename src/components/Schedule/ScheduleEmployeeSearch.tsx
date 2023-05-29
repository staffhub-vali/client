import { FC } from 'react'

interface Employee {
	_id: string
	name: string
}

interface ScheduleEmployeeSearchProps {
	name: string
	isOpen: boolean
	employees: Employee[]
	setId: (id: string) => void
	setName: (value: string) => void
	setIsOpen: (isOpen: boolean) => void
}

const ScheduleEmployeeSearch: FC<ScheduleEmployeeSearchProps> = ({
	setId,
	isOpen,
	setIsOpen,
	name,
	setName,
	employees,
}) => {
	const handleSelect = (option: string, id: string) => {
		setIsOpen(false)
		setName(option)
		setId(id)
	}

	return (
		<div className='relative mt-0.5 w-full text-lg '>
			<div
				className='group w-full cursor-pointer rounded bg-white shadow hover:shadow-md '
				onClick={() => setIsOpen(!isOpen)}>
				<input
					readOnly
					placeholder='Choose an Employee...'
					type='text'
					value={name}
					className='group w-full cursor-pointer px-4 py-3  caret-transparent placeholder:text-slate-500 focus:outline-none dark:bg-slate-700 dark:text-slate-300 dark:placeholder-slate-400'
				/>
			</div>
			{isOpen && (
				<div className='absolute left-0 top-10 z-10 mt-4 w-full rounded bg-white shadow dark:bg-slate-600 dark:text-slate-300'>
					<ul>
						{employees.map((employee) => (
							<li
								className='cursor-pointer px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-500'
								key={employee._id}
								onClick={() => handleSelect(employee.name, employee._id)}>
								{employee.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default ScheduleEmployeeSearch
