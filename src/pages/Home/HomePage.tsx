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
					<div className='flex w-full items-center justify-evenly pt-12'>
						<div className='mx-auto flex flex-col items-center overflow-y-hidden'>
							<Heading className='slide-in-bottom-h1 text-center'>Simplify Administration, Maximize Results</Heading>
							<Paragraph
								size={'xl'}
								className='slide-in-bottom-subtitle mt-2 '>
								Optimize Shifts, Track Attendance, and Ensure Smooth Operations!
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

					<Paragraph className='absolute bottom-2 text-slate-500 dark:text-slate-500'>
						&copy; StaffHub 2023 Marin Valenta
					</Paragraph>
				</>
			)}
		</Container>
	)
}

export default HomePage
