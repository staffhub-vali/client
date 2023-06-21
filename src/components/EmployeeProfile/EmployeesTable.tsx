import Input from '../ui/Input.tsx'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Heading from '../ui/Heading.tsx'
import Container from '../ui/Container.tsx'
import { useNavigate } from 'react-router-dom'
import { Search, UserPlus } from 'lucide-react'
import Button, { buttonVariants } from '../ui/Button.tsx'
import Paragraph from '../ui/Paragraph.tsx'

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
			<div className='mb-2 flex w-4/5 items-end justify-between'>
				<div className='ml-8 flex items-baseline  space-x-4 	'>
					<Heading
						size={'sm'}
						className='slide-in-bottom'>
						Your Staff
					</Heading>
					<Paragraph
						size={'xl'}
						className='slide-in-bottom'>
						has {data.length} {data.length > 1 ? 'members' : 'member'}
					</Paragraph>
				</div>
				<div className='slide-in-bottom mb-1 mr-8  flex items-center space-x-12 '>
					<div className='mx-auto flex w-full  items-center rounded-lg border border-white bg-white px-2 shadow dark:border-slate-700 dark:bg-slate-700'>
						<Search />
						<Input
							size={'sm'}
							type='text'
							value={searchText}
							placeholder='Search your employees...'
							className='group m-0 py-2 shadow-none focus:ring-0'
							onChange={(event) => setSearchText(event.target.value)}
						/>
					</div>

					<Button
						title='Add a new employee'
						className=' mb-0 mt-auto h-[2.65rem] w-64 shadow'
						onClick={() => navigate('/employees/new')}>
						Add Employee {<UserPlus className='ml-2' />}
					</Button>
				</div>
			</div>
			<table className='slide-in-bottom w-4/5 divide-y-2 divide-slate-300 border-2 border-slate-300 bg-white text-left  dark:divide-slate-600 dark:border-slate-600 dark:bg-slate-700'>
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
