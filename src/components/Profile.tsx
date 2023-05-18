import { FC } from 'react'

interface ProfileProps {
	employee: {
		name: string
		email: string
		vacationDays: number
	}
}

const Profile: FC<ProfileProps> = ({ employee }) => {
	return (
		<div className='w-2/3 text-center'>
			<h1 className='mb-6 text-4xl font-medium'>{employee?.name}</h1>
			<h2 className='mb-3 text-3xl'>Vacation Days</h2>
			<p className='text-xl font-medium'>{employee.vacationDays}</p>
		</div>
	)
}

export default Profile
