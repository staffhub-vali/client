import { FC } from 'react'

interface ProfileProps {
	data: {
		name: string
		email: string
	}
}

const Profile: FC<ProfileProps> = ({ data }) => {
	return (
		<div className='text-center text-xl font-medium'>
			<h1>{data.name}</h1>
		</div>
	)
}

export default Profile
