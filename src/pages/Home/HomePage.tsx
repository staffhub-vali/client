import axios from 'axios'
import { useEffect, useState } from 'react'
import { Logout, UserData } from '../../Auth.tsx'
import Button from '../../components/ui/Button.tsx'
import Heading from '../../components/ui/Heading.tsx'
import Spinner from '../../components/ui/Spinner.tsx'
import Container from '../../components/ui/Container.tsx'

const HomePage = () => {
	const token = localStorage.getItem('token')
	const [loading, setLoading] = useState(true)

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
		<Container size={'lg'}>
			{loading ? (
				<Spinner />
			) : (
				<>
					<div className='flex'>
						<a
							className='hover:text-underline inline-block h-10 p-2 text-center text-blue-300 no-underline hover:text-indigo-800 md:h-auto md:p-4'
							data-tippy-content='@twitter_handle'
							href='https://twitter.com/intent/tweet?url=#'>
							<svg
								className='h-6 fill-current'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 32 32'>
								<path d='M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z'></path>
							</svg>
						</a>
						<a
							className='hover:text-underline inline-block h-10 p-2 text-center text-blue-300 no-underline hover:text-indigo-800 md:h-auto md:p-4 '
							data-tippy-content='#facebook_id'
							href='https://www.facebook.com/sharer/sharer.php?u=#'>
							<svg
								className='h-6 fill-current'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 32 32'>
								<path d='M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z'></path>
							</svg>
						</a>
					</div>

					<div className='flex w-full pt-12'>
						<div className='flex flex-col justify-center overflow-y-hidden'>
							<h1 className='slide-in-bottom-h1 text-center text-3xl font-bold leading-tight text-purple-800 md:text-left md:text-5xl'>
								Main Hero Message to sell your app
							</h1>
							<p className='slide-in-bottom-subtitle text-center text-base leading-normal md:text-left md:text-2xl'>
								Sub-hero message, not too long and not too short. Make it just right!
							</p>

							<p className='fade-in text-center font-bold text-blue-400 md:text-left'>Download our app:</p>
							<div className='fade-in flex w-full md:justify-start'>
								<img
									src='./app-store.svg'
									className='bounce-top-icons h-12'
								/>
								<img
									src='./play-store.svg'
									className='bounce-top-icons h-12'
								/>
							</div>
						</div>

						<div className='ml-auto w-1/2 overflow-y-hidden'>
							<img
								className='slide-in-bottom mx-auto lg:mr-0'
								src='./date-icon.svg'
							/>
						</div>
					</div>
					<div className='fade-in w-full text-center text-sm md:text-center'>
						<a
							className='text-gray-500 no-underline hover:no-underline'
							href='#'>
							&copy; App 2019
						</a>
					</div>
				</>
			)}
		</Container>
	)
}

export default HomePage
