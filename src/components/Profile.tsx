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
		<div className='text-center'>
			<h1 className='mb-6 text-4xl font-medium'>{data.name}</h1>
			<div className='text-2xl'>
				<h2 className='mb-3 border-b border-slate-300 text-3xl'>Rosters</h2>
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
