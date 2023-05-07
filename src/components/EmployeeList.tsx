import { FC } from 'react'
import Table from './ui/Table'
import { Link } from 'react-router-dom'

interface EmployeeListProps {
	data: string[][]
	headings: string[]
}

const EmployeeList: FC<EmployeeListProps> = ({ data, headings }) => {
	return (
		<>
			<Table
				data={data}
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
