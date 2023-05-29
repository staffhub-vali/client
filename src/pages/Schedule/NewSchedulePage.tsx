import { FC, useEffect, useState } from 'react'
import ScheduleMaker from '../../components/Schedule/ScheduleMaker'
import axios from 'axios'
import Logout from '../../Auth'
import { buttonVariants } from '../../components/ui/Button'
import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'

interface NewSchedulePageProps {}

const NewSchedulePage: FC<NewSchedulePageProps> = ({}) => {
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [employees, setEmployees] = useState([])

	useEffect(() => {
		fetchEmployees()
	}, [])

	const fetchEmployees = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get('http://localhost:8080/v1/employees', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setEmployees(response.data)
		} catch (error: any) {
			console.log(error)
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<div
			onClick={() => (isOpen ? setIsOpen(false) : null)}
			className='flex h-full w-screen flex-col items-center pb-16 pt-24'>
			{employees.length > 0 ? (
				<ScheduleMaker
					id={id}
					name={name}
					setId={setId}
					isOpen={isOpen}
					setName={setName}
					employees={employees}
					setIsOpen={setIsOpen}
				/>
			) : (
				<div className='pt-24 text-center text-3xl text-slate-800 dark:text-slate-200'>
					<h2>You do not currently have any employees on your account.</h2>
					<h3>Click below if you wish to create an employee.</h3>
					<Link
						to='/employees/new'
						className={`${buttonVariants({ variant: 'default', size: 'lg' })} mt-6`}>
						New Employee {<UserPlus className='ml-2' />}
					</Link>
				</div>
			)}
		</div>
	)
}

export default NewSchedulePage
