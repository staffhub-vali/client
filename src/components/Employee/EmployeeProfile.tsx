import axios from 'axios'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Paragraph from '../ui/Paragraph'
import Container from '../ui/Container'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { calculateMonthlyHours } from '../../utils/HoursCalculation'

interface EmployeeProfileProps {
	data: {
		_id: string
		name: string
		email: string
		phone: string
		sickDays: number | string
		vacationDays: number | string
	}
	shifts: Shift[]
	setEdit: Dispatch<SetStateAction<boolean>>
}

interface Shift {
	start: number
	end: number
}

const EmployeeProfile: FC<EmployeeProfileProps> = ({ data, shifts, setEdit }) => {
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
				<Paragraph>Total hours for this month: {calculateMonthlyHours(shifts)}</Paragraph>

				<div className='mt-2 flex space-x-2'>
					<Button
						size={'sm'}
						onClick={() => setEdit(true)}>
						Edit {<Pencil className='ml-2 h-4 w-4' />}
					</Button>
					<Button
						size={'sm'}
						onClick={() => setShowModal(true)}
						variant={'danger'}>
						Delete {<Trash2 className='ml-2 h-4 w-4' />}
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
