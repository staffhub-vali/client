import axios from 'axios'
import { FC, useEffect } from 'react'
import Button from '../components/ui/Button'
import { buttonVariants } from '../components/ui/Button'

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
	const token = localStorage.getItem('token')
	useEffect(() => {
		axios
			.get('http://localhost:8080/v1/auth/verify', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.catch((error) => {
				if (token && error.response.status === 401) {
					localStorage.setItem('token', '')
					localStorage.setItem('user', '')
					window.location.reload()
				}
			})
	}, [])

	return (
		<div className='flex flex-col items-center justify-center space-y-4 pt-24'>
			<h1 className='mb-12 text-4xl dark:text-slate-300'>Home</h1>
			<Button
				variant='default'
				size='default'>
				Default
			</Button>

			<Button
				variant='outline'
				size='lg'>
				Outline
			</Button>

			<Button variant='link'>Link</Button>
		</div>
	)
}

export default HomePage
