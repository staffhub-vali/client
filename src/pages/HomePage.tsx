import { FC } from 'react'

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
	return (
		<div className='flex justify-center pt-24'>
			<h1 className='text-4xl'>Home</h1>
		</div>
	)
}

export default HomePage
