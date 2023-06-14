import axios from 'axios'
import { Logout } from '../../Auth.tsx'
import { useEffect, useState } from 'react'
import Heading from '../../components/ui/Heading.tsx'
import Spinner from '../../components/ui/Spinner.tsx'
import Button from '../../components/ui/Button.tsx'
import Container from '../../components/ui/Container.tsx'

const HomePage = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		verifyUser()
	}, [])

	const verifyUser = async () => {
		const token = localStorage.getItem('token')
		try {
			await axios.get('http://localhost:8080/v1/auth/verify', {
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

	return (
		<Container>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Heading
						size={'sm'}
						className='mt-6'>
						Home
					</Heading>

					<Button
						className='mt-6'
						onClick={Logout}>
						Logout
					</Button>
				</>
			)}
		</Container>
	)
}

export default HomePage
