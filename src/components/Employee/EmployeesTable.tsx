import Input from '../ui/Input'
import { FC, useState } from 'react'
import Container from '../ui/Container'
import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { buttonVariants } from '../../components/ui/Button'
import Heading from '../ui/Heading'

interface EmployeesTableProps {
	data: Employee[]
	headings: string[]
	searchBar?: boolean
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

const EmployeesTable: FC<EmployeesTableProps> = ({ headings, data, searchBar }) => {
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
			<Heading size={'sm'}>Employees ({data.length})</Heading>
			<div className='mt-6 flex items-center space-x-12'>
				{searchBar && (
					<div className='mx-auto flex w-full items-center rounded-lg bg-white px-2 ring-slate-800  focus-within:ring-2 dark:bg-slate-700'>
						<i className='fa fa-search text-slate-500 dark:text-slate-400' />
						<Input
							type='text'
							size={'default'}
							value={searchText}
							placeholder='Search for employees...'
							className='group mb-0 shadow-none focus:ring-0'
							onChange={(event) => setSearchText(event.target.value)}
						/>
					</div>
				)}
				<Link
					to={'/employees/new'}
					title='Add a new employee'
					className={`${buttonVariants({ variant: 'default', size: 'default' })} w-64`}>
					New Employee {<UserPlus className='ml-2 h-5 w-5' />}
				</Link>
			</div>

			<table className='mt-4 w-4/5 divide-y-2 divide-slate-200 border-2 bg-white text-center dark:divide-slate-600 dark:border-slate-600 dark:bg-slate-700'>
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

				<tbody className='divide-y-2 divide-slate-200 dark:divide-slate-600'>
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
