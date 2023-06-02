import { FC } from 'react'
import Container from '../ui/Container'
import Input from '../ui/Input'

interface Employee {
	_id: string
	name: string
}

interface SearchEmployeesProps {
	name: string
	isOpen: boolean
	employees: Employee[]
	setId: (id: string) => void
	setName: (value: string) => void
	setIsOpen: (isOpen: boolean) => void
}

const SearchEmployees: FC<SearchEmployeesProps> = ({
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
		<Container
			className='relative p-0 text-lg'
			size={'lg'}>
			<div
				className='group w-full cursor-pointer rounded bg-white shadow hover:shadow-md dark:bg-slate-700 dark:shadow-slate-950 '
				onClick={() => setIsOpen(!isOpen)}>
				<Input
					readOnly
					type='text'
					size={'lg'}
					value={name}
					placeholder='Choose an Employee...'
					className='group m-0 cursor-pointer caret-transparent focus:ring-0 dark:placeholder:text-slate-400'
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
		</Container>
	)
}

export default SearchEmployees
