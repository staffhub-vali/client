import axios from 'axios'
import Modal from '../ui/Modal.tsx'
import Input from '../ui/Input.tsx'
import Button from '../ui/Button.tsx'
import { Logout } from '../../Auth.tsx'
import Paragraph from '../ui/Paragraph.tsx'
import { Check, XCircle, Trash2, Pencil } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'

interface NoteProps {
	note: string
	index: number
	loading: boolean
	workDay: WorkDay
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

interface WorkDay {
	_id: string
	notes: string[]
}

const Note: FC<NoteProps> = ({ note: n, index, workDay, loading, setError, setLoading, setMessage }) => {
	const [note, setNote] = useState<string>(n)
	const [editNote, setEditNote] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [noteIndex, setNoteIndex] = useState<number | null>(null)

	const deleteNote = async (index: number | null) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.delete(
				`${import.meta.env.VITE_BASE_URL}/days/notes/?workDay=${workDay?._id}&index=${index}`,
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
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.put(
				`${import.meta.env.VITE_BASE_URL}/days/notes`,
				{
					note: note,
					index: index,
					workDayId: workDay?._id,
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
		<div className='slide-in-bottom my-1 flex w-full items-center justify-center rounded-md bg-white px-3 py-1 shadow dark:bg-slate-700'>
			{editNote ? (
				<>
					<Input
						type='text'
						value={note}
						className='m-0 w-[40rem] text-xl shadow-none focus:ring-0'
						onChange={(e) => setNote(e.target.value)}
					/>
					<Button
						size={'sm'}
						variant={'link'}
						className='w-16 min-w-0'
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
						className='w-16 min-w-0'
						onClick={() => setEditNote(false)}
						title='Cancel'>
						{<XCircle />}
					</Button>
				</>
			) : (
				<div className='flex items-center'>
					<Paragraph
						size={'lg'}
						className='w-[40rem] min-w-[16rem] rounded-md bg-white px-2 py-2 text-left dark:bg-slate-700'
						key={workDay?._id}>
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
							text={'Delete note?'}
							showModal={showModal}
							loading={loading}
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
