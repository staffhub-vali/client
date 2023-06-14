import { FC } from 'react'
import Heading from '../ui/Heading.tsx'
import Spinner from '../ui/Spinner.tsx'
import EmployeesTable from './EmployeesTable.tsx'
import Button, { buttonVariants } from '../ui/Button.tsx'
import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'

interface EmployeesListProps {
	loading: boolean
	data: Employee[]
	headings: string[]
}

interface Employee {
	_id: string
	name: string
	email: string
	phone: string
	notes: string[]
	shiftPreferences: string[]
	vacationDays: number | string
}

const EmployeesList: FC<EmployeesListProps> = ({ data, headings, loading }) => {
	return (
		<>
			{loading ? (
				<Spinner />
			) : data.length > 0 ? (
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
					<Link
						to='/employees/new'
						className={`${buttonVariants({
							variant: 'default',
							size: 'lg',
						})} mt-6`}>
						New Employee {<UserPlus className='ml-2' />}
					</Link>
				</>
			)}
		</>
	)
}

export default EmployeesList
