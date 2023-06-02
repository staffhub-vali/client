import axios from 'axios'
import Modal from 'react-modal'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'
import { Dispatch, FC, SetStateAction, useState } from 'react'

interface EmployeeProfileProps {
	data: {
		_id: string
		name: string
		email: string
		phone: string
		sickDays: number | string
		vacationDays: number | string
	}

	setEdit: Dispatch<SetStateAction<boolean>>
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

const EmployeeProfile: FC<EmployeeProfileProps> = ({ data, setEdit }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const deleteEmployee = async () => {
		const token = localStorage.getItem('token')
		try {
			setIsLoading(true)
			await axios.delete(`http://localhost:8080/v1/employees/${data._id}?id=${data._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setShowModal(false)
			window.location.href = '/employees'
		} catch (error) {
			setIsLoading(false)
			console.log(error)
		}
	}
	return (
		<Container>
			<Heading size={'sm'}>{data.name}</Heading>

			<div className='mt-6 flex flex-col items-center'>
				<Paragraph>Email: {data.email}</Paragraph>
				<Paragraph>Phone: {data.phone}</Paragraph>
				<Paragraph>Sick Days: {data.sickDays}</Paragraph>
				<Paragraph>Vacation Days: {data.vacationDays}</Paragraph>

				<div className='mt-2 flex space-x-2'>
					<Button onClick={() => setEdit(true)}>Edit</Button>
					<Button
						onClick={() => setShowModal(true)}
						variant={'danger'}>
						Delete
					</Button>
				</div>

				{showModal && (
					<Modal
						isOpen={showModal}
						style={customStyles}
						contentLabel='Delete Modal'>
						Are you sure you want to delete this employee?
						<div className='mt-2 flex justify-center space-x-2'>
							<Button
								className='my-2'
								variant={'danger'}
								isLoading={isLoading}
								onClick={deleteEmployee}>
								Yes
							</Button>
							<Button
								className='my-2 bg-slate-400 text-white hover:bg-slate-400 dark:bg-slate-400 dark:text-white dark:hover:bg-slate-400'
								isLoading={isLoading}
								onClick={() => setShowModal(false)}>
								Cancel
							</Button>
						</div>
					</Modal>
				)}
			</div>
		</Container>
	)
}

export default EmployeeProfile
