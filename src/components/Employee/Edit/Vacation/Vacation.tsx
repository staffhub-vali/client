import axios from 'axios'
import Modal from '../../../ui/Modal'
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import Paragraph from '../../../ui/Paragraph'
import { Check, XCircle, Trash2 } from 'lucide-react'
import { FC, useState, SetStateAction, Dispatch, useEffect } from 'react'
import { formatDate } from '../../../../utils/DateFormatting'

interface VacationProps {
	index: number
	loading: boolean
	employee: Employee
	vacation: { start: number; end: number }
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

interface Employee {
	_id: string
	vacations: [{ start: number | string; end: number | string }]
}

const Vacation: FC<VacationProps> = ({ vacation: v, index, employee, loading, setError, setLoading, setMessage }) => {
	const [editVacation, setEditVacation] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [vacationIndex, setVacationIndex] = useState<number | null>(null)
	const [end, setEnd] = useState<number | string>(v.end)
	const [start, setStart] = useState<number | string>(v.start)
	const [vacation, setVacation] = useState<{ start: number | string; end: number | string }>(v)

	useEffect(() => {
		setVacation({ start: start, end: end })
	}, [start, end])

	const deleteVacation = async (index: number | null) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.delete(
				`http://localhost:8080/v1/employees/vacation/?employeeId=${employee?._id}&index=${index}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setError('')
			setLoading(false)
			setShowModal(false)
			setMessage(data.message)
		} catch (error: any) {
			setMessage('')
			setLoading(false)
			setShowModal(false)
			setError(error.response.data.message)
		}
	}

	const updateVacation = async (index: number | null, vacation: { start: number | string; end: number | string }) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.put(
				`http://localhost:8080/v1/employees/vacation`,
				{
					vacation: vacation,
					index: index,
					employeeId: employee?._id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setError('')
			setLoading(false)
			setEditVacation(false)
			setShowModal(false)
			setMessage(data.message)
		} catch (error: any) {
			setMessage('')
			setLoading(false)
			setShowModal(false)
			setError(error.response.data.message)
		}
	}

	return (
		<div className='flex w-full items-center justify-center'>
			<div className='mt-6 flex items-center space-x-6'>
				<Paragraph
					size={'xl'}
					className='min-w-[16rem]'
					key={employee?._id}>
					{formatDate(Number(vacation.start) / 1000)} - {formatDate(Number(vacation.end) / 1000)}
				</Paragraph>

				<Button
					size={'sm'}
					variant={'link'}
					className='w-16 min-w-0 rounded-full p-5 text-red-500 hover:bg-slate-200 dark:text-red-400'
					onClick={() => {
						setShowModal(true)
						setVacationIndex(index)
					}}
					title='Delete vacation'>
					{<Trash2 />}
				</Button>

				{showModal && (
					<Modal
						loading={loading}
						showModal={showModal}
						text={'Delete vacation?'}
						cancel={() => setShowModal(false)}
						submit={() => deleteVacation(vacationIndex)}
					/>
				)}
			</div>
		</div>
	)
}

export default Vacation
