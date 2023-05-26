import { FC } from 'react'

interface EmployeeProfileProps {
	employee: {
		name: string
		email: string
		vacationDays: number | null
	}
}

const EmployeeProfile: FC<EmployeeProfileProps> = ({ employee }) => {
	return (
		<div className='w-2/3 text-center text-slate-800 dark:text-slate-300'>
			<h1 className='mb-6 text-4xl font-medium'>{employee?.name}</h1>
		</div>
	)
}

export default EmployeeProfile
