import { FC } from 'react'
import TableEmployees from './TableEmployees'
import Heading from '../ui/Heading'

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

export default EmployeeList
