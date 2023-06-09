import Heading from '../../components/ui/Heading'
import Container from '../../components/ui/Container'
import NewEmployeeForm from '../../components/Employee/NewEmployeeForm'

const NewEmployeePage = () => {
	return (
		<Container>
			<Heading size='sm'>Create an Employee</Heading>
			<NewEmployeeForm />
		</Container>
	)
}

export default NewEmployeePage
