import axios from 'axios'
import { useEffect } from 'react'
import Heading from '../../components/ui/Heading'
import Container from '../../components/ui/Container'

const HomePage = () => {
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
		<Container>
			<Heading
				size={'sm'}
				className='mt-6'>
				Home
			</Heading>
		</Container>
	)
}

export default HomePage
