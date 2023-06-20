import Heading from '../../components/ui/Heading.tsx'
import Container from '../../components/ui/Container.tsx'
import NewEmployeeForm from '../../components/EmployeeProfile/NewEmployeeForm.tsx'

const NewEmployeePage = () => {
	return (
		<Container className='overflow-y-hidden'>
			<Heading
				size='sm'
				className='slide-in-bottom'>
				Create an Employee
			</Heading>
			<NewEmployeeForm />
		</Container>
	)
}

export default NewEmployeePage
