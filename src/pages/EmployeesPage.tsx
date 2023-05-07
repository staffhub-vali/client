import { FC } from 'react'
import EmployeeList from '../components/EmployeeList'

interface EmployeesPageProps {}

const headings = ['Name', 'Phone', 'Email', 'Vacation', 'Sick']
const data = [
	['Mark Davis', '555-1234', 'mark.davis@example.com', 'No', 'No'],
	['Julia Moore', '555-5678', 'julia.moore@example.com', 'No', 'No'],
	['Hugo Barlow', '555-9876', 'hugo.barlow@example.com', 'No', 'No'],
	['Emma Johnson', '555-5555', 'emma.johnson@example.com', 'No', 'No'],
	['Sophie Lee', '555-2345', 'sophie.lee@example.com', 'Yes', 'No'],
	['Jack Smith', '555-3456', 'jack.smith@example.com', 'No', 'No'],
	['Oliver Taylor', '555-7890', 'oliver.taylor@example.com', 'No', 'Yes'],
	['Isabella Brown', '555-4321', 'isabella.brown@example.com', 'No', 'No'],
	['Noah Wilson', '555-8765', 'noah.wilson@example.com', 'No', 'No'],
	['Ava Davis', '555-9999', 'ava.davis@example.com', 'No', 'No'],
]

const EmployeesPage: FC<EmployeesPageProps> = ({}) => {
	return (
		<div className='flex flex-col items-center pt-24'>
			<h1 className='mb-4 text-4xl'>Employees </h1>
			<EmployeeList
				data={data}
				headings={headings}
			/>
		</div>
	)
}

export default EmployeesPage
