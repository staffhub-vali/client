import axios from 'axios'
import { useEffect, useState } from 'react'
import { Logout, UserData } from '../../Auth.tsx'
import Button from '../../components/ui/Button.tsx'
import Heading from '../../components/ui/Heading.tsx'
import Spinner from '../../components/ui/Spinner.tsx'
import Container from '../../components/ui/Container.tsx'
import Paragraph from '../../components/ui/Paragraph.tsx'

const HomePage = () => {
	const token = localStorage.getItem('token')
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		verifyUser()
	}, [])

	const verifyUser = async () => {
		try {
			await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/verify`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		} catch (error: any) {
			if (token && error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
		}
	}

	let name
	let picture

	if (token) {
		name = UserData().name
		picture = UserData().picture
	}

	return (
		<Container
			size={'lg'}
			className='overflow-y-hidden p-0 px-24 pt-24'>
			{loading ? (
				<Spinner />
			) : (
				<>
					<div className='flex w-full items-center pt-12'>
						<div className='flex flex-col items-center overflow-y-hidden'>
							<Heading className='slide-in-bottom-h1'>Main Hero Message to sell your app</Heading>
							<Paragraph
								size={'xl'}
								className='slide-in-bottom-subtitle mt-2 '>
								Sub-hero message, not too long and not too short. Make it just right!
							</Paragraph>

							<div className='fade-in flex w-full justify-center space-x-2 pt-6'>
								<Button className='bounce-top-icons'>Get started</Button>
								<Button
									className='bounce-top-icons'
									variant={'outline'}>
									How to use
								</Button>
							</div>
						</div>

						<div className='slide-in-bottom mx-auto'>
							<img
								src='./calendar.svg'
								alt='Calendar'
							/>
						</div>
					</div>
					<div className='fade-in flex w-full flex-col items-center pt-44 text-center text-sm md:text-center'>
						<Paragraph className='text-gray-500 no-underline hover:no-underline'>
							&copy; App 2019 Marin Valenta
						</Paragraph>
					</div>
				</>
			)}
		</Container>
	)
}

export default HomePage
