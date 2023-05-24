import { FC } from 'react'
import TableEmployees from './TableEmployees'

interface EmployeeListProps {
	data: Record<string, string>[]
	headings: string[]
}

const EmployeeList: FC<EmployeeListProps> = ({ data, headings }) => {
	return (
		<>
			{data.length > 0 ? (
				<TableEmployees
					data={data}
					searchBar={true}
					headings={headings}
				/>
			) : (
				<h2 className='pt-24 text-3xl text-slate-800 dark:text-slate-300'>
					You do not have any employees currently, add them below:
				</h2>
			)}
		</>
	)
}

export default EmployeeList
