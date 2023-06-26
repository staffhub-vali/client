import Heading from '../../components/ui/Heading.tsx'
import Container from '../../components/ui/Container.tsx'
import NewEmployeeForm from '../../components/EmployeeProfile/NewEmployeeForm.tsx'

const NewEmployeePage = () => {
	return (
		<Container
			size={'lg'}
			className='overflow-y-hidden px-2'>
			<Heading
				size='sm'
				className='slide-in-bottom '>
				Create an Employee
			</Heading>
			<NewEmployeeForm />
		</Container>
	)
}

export default NewEmployeePage
