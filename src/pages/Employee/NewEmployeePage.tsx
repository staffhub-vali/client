import { FC } from 'react'
import NewEmployeeForm from '../../components/Employee/NewEmployeeForm'

interface NewEmployeePageProps {}

const NewEmployeePage: FC<NewEmployeePageProps> = ({}) => {
	return (
		<div className='flex flex-col items-center pt-24 dark:text-slate-300'>
			<h1 className='mb-4 text-4xl'>Add an Employee </h1>
			<NewEmployeeForm />
		</div>
	)
}

export default NewEmployeePage
