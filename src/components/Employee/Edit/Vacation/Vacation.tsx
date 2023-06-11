import axios from 'axios'
import Modal from '../../../ui/Modal'
import { Trash2 } from 'lucide-react'
import Button from '../../../ui/Button'
import Paragraph from '../../../ui/Paragraph'
import { formatDate } from '../../../../utils/DateFormatting'
import { FC, useState, SetStateAction, Dispatch, useEffect } from 'react'
import { Logout } from '../../../../Auth'

interface VacationProps {
	index: number
	loading: boolean
	employee: Employee
	vacation: { start: number; end: number }
	setAmount: Dispatch<SetStateAction<number>>
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

interface Employee {
	_id: string
	vacations: [{ start: number | string; end: number | string }]
}

const Vacation: FC<VacationProps> = ({
	vacation: v,
	index,
	employee,
	loading,
	setError,
	setLoading,
	setMessage,
	setAmount,
}) => {
	const [end, setEnd] = useState<number | string>(v.end)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [start, setStart] = useState<number | string>(v.start)
	const [vacationIndex, setVacationIndex] = useState<number | null>(null)
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
			setMessage(data.message)
			setAmount((prev) => prev + data.totalDays)
		} catch (error: any) {
			setError(error.response.data.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
			setShowModal(false)
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
