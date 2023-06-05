import axios from 'axios'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Delete, Pencil } from 'lucide-react'

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
	const [loading, setLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const deleteEmployee = async () => {
		const token = localStorage.getItem('token')
		try {
			setLoading(true)
			await axios.delete(`http://localhost:8080/v1/employees/${data._id}?id=${data._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setShowModal(false)
			window.location.href = '/employees'
		} catch (error) {
			setLoading(false)
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
					<Button
						size={'lg'}
						onClick={() => setEdit(true)}>
						Edit {<Pencil className='ml-2 h-5 w-5' />}
					</Button>
					<Button
						size={'lg'}
						onClick={() => setShowModal(true)}
						variant={'danger'}>
						Delete {<Delete className='ml-2 h-5 w-5' />}
					</Button>
				</div>

				{showModal && (
					<Modal
						loading={loading}
						showModal={showModal}
						submit={() => deleteEmployee}
						cancel={() => setShowModal(false)}
						text={'Are you sure you want to delete this employee?'}
					/>
				)}
			</div>
		</Container>
	)
}

export default EmployeeProfile
