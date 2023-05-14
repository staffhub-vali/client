import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ProfileProps {
	employee: {
		name: string
		email: string
		rosters: []
		vacationDays: number
	}
}

const Profile: FC<ProfileProps> = ({ employee }) => {
	return (
		<div className='w-2/3 text-center'>
			<h1 className='mb-6 text-4xl font-medium'>{employee.name}</h1>

			<div className='flex justify-evenly'>
				<div className='space-x-6 text-2xl'>
					<h2 className='mb-3 text-3xl'>Rosters</h2>
					{employee.rosters?.map((roster: { _id: string; month: string }) => (
						<Link
							to={`/rosters/${roster._id}`}
							key={roster._id}>
							{roster.month}
						</Link>
					))}
				</div>
				<div className='text-2xl'>
					<h2 className='mb-3 text-3xl'>Vacation Days</h2>
					{employee.vacationDays}
				</div>
			</div>
		</div>
	)
}

export default Profile
