import { FC } from 'react'
import TableEmployees from './TableEmployees'
import { Link } from 'react-router-dom'

interface EmployeeListProps {
	data: Record<string, string>[]
	headings: string[]
}

const EmployeeList: FC<EmployeeListProps> = ({ data, headings }) => {
	return (
		<TableEmployees
			data={data}
			searchBar={true}
			headings={headings}
		/>
	)
}

export default EmployeeList
