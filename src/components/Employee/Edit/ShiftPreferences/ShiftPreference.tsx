import axios from 'axios'
import Modal from '../../../ui/Modal'
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import Paragraph from '../../../ui/Paragraph'
import { Check, XCircle, Trash2, Pencil } from 'lucide-react'
import { FC, useState, SetStateAction, Dispatch } from 'react'

interface ShiftPreferenceProps {
	index: number
	loading: boolean
	employee: Employee
	shiftPreference: string
	setError: Dispatch<SetStateAction<string>>
	setMessage: Dispatch<SetStateAction<string>>
	setLoading: Dispatch<SetStateAction<boolean>>
}

interface Employee {
	notes: string[]
	_id: string
}

const ShiftPreference: FC<ShiftPreferenceProps> = ({
	shiftPreference: sf,
	index,
	employee,
	loading,
	setError,
	setLoading,
	setMessage,
}) => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [shiftPreference, setShiftPreference] = useState<string>(sf)
	const [editShiftPreference, setEditShiftPreference] = useState<boolean>(false)
	const [shiftPreferenceIndex, setShiftPreferenceIndex] = useState<number | null>(null)

	const deleteShiftPreference = async (index: number | null) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.delete(
				`http://localhost:8080/v1/employees/preferences/?employeeId=${employee?._id}&index=${index}`,
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

	const updateShiftPreference = async (index: number | null, shiftPreference: string) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.put(
				`http://localhost:8080/v1/employees/preferences`,
				{
					shiftPreference: shiftPreference,
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
			setEditShiftPreference(false)
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
			{editShiftPreference ? (
				<>
					<Input
						type='text'
						value={shiftPreference}
						className='m-0 w-fit'
						onChange={(e) => setShiftPreference(e.target.value)}
					/>
					<Button
						size={'sm'}
						variant={'link'}
						className='w-10 min-w-[3rem]'
						onClick={() => {
							setShiftPreferenceIndex(index)
							updateShiftPreference(index, shiftPreference)
						}}
						title='Save changes'>
						{<Check />}
					</Button>
					<Button
						size={'sm'}
						variant={'link'}
						className='w-10 min-w-[3rem]'
						onClick={() => setEditShiftPreference(false)}
						title='Cancel'>
						{<XCircle />}
					</Button>
				</>
			) : (
				<div className='flex items-center'>
					<Paragraph
						size={'lg'}
						className='min-w-[16rem]'
						key={employee?._id}>
						{shiftPreference}
					</Paragraph>
					<Button
						size={'sm'}
						variant={'link'}
						className='w-16 min-w-0 rounded-full p-5 hover:bg-slate-200'
						onClick={() => {
							setEditShiftPreference(true)
							setShiftPreferenceIndex(index)
						}}
						title='Edit shift preference'>
						{<Pencil />}
					</Button>
					<Button
						size={'sm'}
						variant={'link'}
						className='w-16 min-w-0 rounded-full p-5 hover:bg-slate-200'
						onClick={() => {
							setShowModal(true)
							setShiftPreferenceIndex(index)
						}}
						title='Delete shift preference'>
						{<Trash2 />}
					</Button>

					{showModal && (
						<Modal
							loading={loading}
							text={'Delete shift preference?'}
							showModal={showModal}
							cancel={() => setShowModal(false)}
							submit={() => deleteShiftPreference(shiftPreferenceIndex)}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export default ShiftPreference
