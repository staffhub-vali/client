import Heading from '../../components/ui/Heading.tsx'
import Container from '../../components/ui/Container.tsx'
import NewEmployeeForm from '../../components/Employee/NewEmployeeForm.tsx'

const NewEmployeePage = () => {
	return (
		<Container>
			<Heading size='sm'>Create an Employee</Heading>
			<NewEmployeeForm />
		</Container>
	)
}

export default NewEmployeePage
