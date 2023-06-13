import axios from 'axios'
import { useEffect, useState } from 'react'
import Heading from '../../components/ui/Heading'
import Container from '../../components/ui/Container'
import { Logout } from '../../Auth'
import Spinner from '../../components/ui/Spinner'

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
				<Heading
					size={'sm'}
					className='mt-6'>
					Home
				</Heading>
			)}
		</Container>
	)
}

export default HomePage
