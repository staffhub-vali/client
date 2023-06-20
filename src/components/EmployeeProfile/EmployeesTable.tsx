import Input from '../ui/Input.tsx'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, UserPlus } from 'lucide-react'
import Heading from '../ui/Heading.tsx'
import Container from '../ui/Container.tsx'
import { useNavigate } from 'react-router-dom'
import { buttonVariants } from '../ui/Button.tsx'

interface EmployeesTableProps {
	data: Employee[]
}

interface Employee {
	_id: string
	name: string
	email: string
	phone: string
	notes: string[]
	[key: string]: any
	shiftPreferences: string[]
	vacationDays: number | string
}

const EmployeesTable: FC<EmployeesTableProps> = ({ data }) => {
	const headings = ['Name', 'Email', 'Phone', 'Address']
	const [searchText, setSearchText] = useState<string>('')
	const filteredData = data.filter((employee) => {
		const values = Object.values(employee).join('').toLowerCase()
		return values.includes(searchText.toLowerCase())
	})

	const navigate = useNavigate()

	return (
		<Container
			className='p-6'
			size={'lg'}>
			<Heading
				size={'sm'}
				className='slide-in-bottom'>
				Employees ({data.length})
			</Heading>
			<div className='slide-in-bottom-h1 mt-6 flex  items-center space-x-12'>
				<div className='mx-auto flex w-full items-center rounded-lg bg-white px-2 shadow-md  ring-slate-800 focus-within:ring-2 dark:bg-slate-700'>
					<Search />
					<Input
						type='text'
						value={searchText}
						placeholder='Search for employees...'
						className='group mb-0 shadow-none focus:ring-0'
						onChange={(event) => setSearchText(event.target.value)}
					/>
				</div>

				<Link
					to={'/employees/new'}
					title='Add a new employee'
					className={`${buttonVariants({ variant: 'default', size: 'default' })} w-64`}>
					New Employee {<UserPlus className='ml-2' />}
				</Link>
			</div>

			<table className='slide-in-bottom-h1 mt-4 w-4/5 divide-y-2 divide-slate-300 border-2 border-slate-300 bg-white text-center dark:divide-slate-600 dark:border-slate-600 dark:bg-slate-700'>
				<thead>
					<tr>
						{headings.map((heading, index) => (
							<th
								key={`heading-${index}`}
								className='whitespace-nowrap px-8 py-3 font-bold '>
								{heading}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='divide-y-2 divide-slate-300 dark:divide-slate-600'>
					{filteredData.map((employee, index) => (
						<tr
							onClick={() => navigate(`/employees/${employee._id}`)}
							key={`employee-${index}`}
							className={` cursor-pointer duration-75 hover:bg-slate-200 dark:hover:bg-slate-600
							${index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800 ' : 'bg-white dark:bg-slate-700'}`}>
							{headings.map((heading, index) => (
								<td
									key={`employee-${index}`}
									className={`cursor-pointer'} whitespace-nowrap px-8 py-3`}>
									{employee[heading.toLowerCase()]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	)
}

export default EmployeesTable
