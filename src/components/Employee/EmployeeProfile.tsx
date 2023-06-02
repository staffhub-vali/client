import { FC } from 'react'
import Container from '../ui/Container'
import Heading from '../ui/Heading'

interface EmployeeProfileProps {
	employee: {
		name: string
		email: string
		vacationDays: number | null
	}
}

const EmployeeProfile: FC<EmployeeProfileProps> = ({ employee }) => {
	return (
		<Container>
			<Heading size={'sm'}>{employee.name}</Heading>
		</Container>
	)
}

export default EmployeeProfile
