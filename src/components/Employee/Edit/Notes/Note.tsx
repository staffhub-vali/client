import axios from 'axios'
import Modal from '../../../ui/Modal'
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import Paragraph from '../../../ui/Paragraph'
import { Check, XCircle, Trash2, Pencil } from 'lucide-react'
import { FC, useState, SetStateAction, Dispatch } from 'react'
import { Logout } from '../../../../Auth'

interface NoteProps {
	note: string
	index: number
	loading: boolean
	employee: Employee
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

interface Employee {
	notes: string[]
	_id: string
}

const Note: FC<NoteProps> = ({ note: n, index, employee, loading, setError, setLoading, setMessage }) => {
	const [note, setNote] = useState<string>(n)
	const [editNote, setEditNote] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [noteIndex, setNoteIndex] = useState<number | null>(null)

	const deleteNote = async (index: number | null) => {
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.delete(
				`http://localhost:8080/v1/employees/notes/?employeeId=${employee?._id}&index=${index}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setMessage(data.message)
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

	const updateNote = async (index: number | null, note: string) => {
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.put(
				`http://localhost:8080/v1/employees/notes`,
				{
					note: note,
					index: index,
					employeeId: employee?._id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)

			setEditNote(false)
			setMessage(data.message)
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
			{editNote ? (
				<>
					<Input
						type='text'
						value={note}
						className='m-0 w-fit'
						onChange={(e) => setNote(e.target.value)}
					/>
					<Button
						size={'sm'}
						variant={'link'}
						className='w-10 min-w-[3rem]'
						onClick={() => {
							setNoteIndex(index)
							updateNote(index, note)
						}}
						title='Save changes'>
						{<Check />}
					</Button>
					<Button
						size={'sm'}
						variant={'link'}
						className='w-10 min-w-[3rem]'
						onClick={() => setEditNote(false)}
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
						{note}
					</Paragraph>
					<Button
						size={'sm'}
						variant={'link'}
						className='w-16 min-w-0 rounded-full p-5 hover:bg-slate-200'
						onClick={() => {
							setEditNote(true)
							setNoteIndex(index)
						}}
						title='Edit note'>
						{<Pencil />}
					</Button>
					<Button
						size={'sm'}
						variant={'link'}
						className='w-16 min-w-0 rounded-full p-5 hover:bg-slate-200'
						onClick={() => {
							setShowModal(true)
							setNoteIndex(index)
						}}
						title='Delete note'>
						{<Trash2 />}
					</Button>

					{showModal && (
						<Modal
							loading={loading}
							text={'Delete note?'}
							showModal={showModal}
							cancel={() => setShowModal(false)}
							submit={() => deleteNote(noteIndex)}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export default Note
