import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ProfileProps {
	data: {
		name: string
		email: string
		rosters: []
	}
}

const Profile: FC<ProfileProps> = ({ data }) => {
	return (
		<div className='max-w-xl text-center'>
			<h1 className='mb-6 text-4xl font-medium'>{data.name}</h1>
			<h2 className='mb-3  text-3xl'>Rosters</h2>
			<div className='space-x-6 text-2xl'>
				{data.rosters?.map((roster: { _id: string; month: string }) => (
					<Link
						to={`/rosters/${roster._id}`}
						key={roster._id}>
						{roster.month}
					</Link>
				))}
			</div>
		</div>
	)
}

export default Profile
