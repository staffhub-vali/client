import { FC } from 'react'
import NewEmployeeForm from '../../components/Employee/NewEmployeeForm'
import Heading from '../../components/ui/Heading'
import Container from '../../components/ui/Container'

interface NewEmployeePageProps {}

const NewEmployeePage: FC<NewEmployeePageProps> = ({}) => {
	return (
		<Container>
			<Heading size='sm'>Create an Employee</Heading>
			<NewEmployeeForm />
		</Container>
	)
}

export default NewEmployeePage
