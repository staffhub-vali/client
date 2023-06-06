import Input from '../ui/Input'
import { FC, useState } from 'react'
import Container from '../ui/Container'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../../components/ui/Button'
import { UserPlus } from 'lucide-react'

interface EmployeesTableProps {
	headings: string[]
	searchBar?: boolean
	data: any
}

const EmployeesTable: FC<EmployeesTableProps> = ({ headings, data, searchBar }) => {
	const [searchText, setSearchText] = useState<string>('')

	const filteredData = data.filter((row: any) => {
		const values = Object.values(row).join('').toLowerCase()
		return values.includes(searchText.toLowerCase())
	})

	const navigate = useNavigate()

	const path = window.location.pathname.split('/').pop()

	return (
		<Container
			className='p-6'
			size={'lg'}>
			<div className='mb-4 flex items-center space-x-12'>
				{searchBar && (
					<div className='mx-auto flex w-full items-center rounded-lg bg-white px-2 focus-within:shadow dark:bg-slate-700'>
						<i className='fa fa-search text-slate-500 dark:text-slate-400' />
						<Input
							type='text'
							size={''}
							value={searchText}
							placeholder='Search for employees...'
							className='group mb-0 shadow-none focus:ring-0'
							onChange={(event) => setSearchText(event.target.value)}
						/>
					</div>
				)}
				<Link
					className={`${buttonVariants({ variant: 'default', size: 'sm' })} w-64`}
					to={'/employees/new'}>
					New Employee {<UserPlus className='ml-2 h-5 w-5' />}
				</Link>
			</div>
			<table className='w-4/5 divide-y-2 divide-slate-200 border-2 bg-white text-center text-lg dark:divide-slate-600 dark:border-slate-600 dark:bg-slate-700'>
				<thead>
					<tr>
						{headings.map((heading, index) => (
							<th
								key={`heading-${index}`}
								className='whitespace-nowrap px-4 py-3 font-medium '>
								{heading}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='divide-y-2 divide-slate-200 dark:divide-slate-600'>
					{filteredData.map((row: any, index: number) => (
						<tr
							onClick={() => navigate(`/${path}/${row._id}`)}
							key={`row-${index}`}
							className={` cursor-pointer duration-75 hover:bg-slate-200 dark:hover:bg-slate-600
							${index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800 ' : 'bg-white dark:bg-slate-700'}`}>
							{headings.map((heading, index) => (
								<td
									key={`row-${index}`}
									className={`cursor-pointer'} h-14 whitespace-nowrap px-4 py-2`}>
									{row[heading.toLowerCase()]}
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
