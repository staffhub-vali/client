import { FC } from 'react'
import LoginForm from '../components/LoginForm'

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({}) => {
	return (
		<div className='lg:pt- pt-20'>
			<LoginForm />
		</div>
	)
}

export default LoginPage
