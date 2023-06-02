import { FC } from 'react'
import Heading from '../ui/Heading'
import EmployeesTable from './EmployeesTable'

interface EmployeesListProps {
	data: Record<string, string>[]
	headings: string[]
}

const EmployeesList: FC<EmployeesListProps> = ({ data, headings }) => {
	return (
		<>
			{data.length > 0 ? (
				<EmployeesTable
					data={data}
					searchBar={true}
					headings={headings}
				/>
			) : (
				<>
					<Heading
						className='mb-2 mt-6'
						size={'sm'}>
						You do not currently have any employees on your account.
					</Heading>
					<Heading size={'xs'}>Click below if you wish to create an employee.</Heading>{' '}
				</>
			)}
		</>
	)
}

export default EmployeesList
