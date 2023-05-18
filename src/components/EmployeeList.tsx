import { FC } from 'react'
import TableEmployees from './TableEmployees'
import { Link } from 'react-router-dom'

interface EmployeeListProps {
	data: Record<string, string>[]
	headings: string[]
}

const EmployeeList: FC<EmployeeListProps> = ({ data, headings }) => {
	return (
		<>
			<TableEmployees
				data={data}
				searchBar={true}
				headings={headings}
			/>
			<Link
				className='mt-8 rounded bg-black px-8 py-2 text-2xl text-white active:scale-95 '
				to={'/employees/new'}>
				New <i className='fa-solid fa-user-plus'></i>
			</Link>
		</>
	)
}

export default EmployeeList
