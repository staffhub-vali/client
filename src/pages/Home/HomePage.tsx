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
		<Container>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Heading size={'sm'}>Hello {name}</Heading>
					{token && (
						<Button
							className='mt-6'
							onClick={Logout}>
							Logout
						</Button>
					)}
				</>
			)}
		</Container>
	)
}

export default HomePage
