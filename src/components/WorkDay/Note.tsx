import { FC, useState } from 'react'
import Paragraph from '../ui/Paragraph'
import Button from '../ui/Button'
import { Check, XCircle, Trash2, Pencil } from 'lucide-react'
import Modal from '../ui/Modal'
import axios from 'axios'
import Input from '../ui/Input'

interface NoteProps {
	note: string
	index: number
	loading: boolean
	workDay: WorkDay
	setError: any
	setLoading: any
	setMessage: any
}

interface WorkDay {
	notes: []
	_id: string
}

const Note: FC<NoteProps> = ({ note: n, index, workDay, loading, setError, setLoading, setMessage }) => {
	const [editNote, setEditNote] = useState<boolean>(false)
	const [note, setNote] = useState<string>(n)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [noteIndex, setNoteIndex] = useState<number | null>(null)

	const deleteNote = async (index: number | null) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.delete(
				`http://localhost:8080/v1/days/notes/?workDay=${workDay?._id}&index=${index}`,
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

	const updateNote = async (index: number | null, note: string) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			const { data } = await axios.put(
				`http://localhost:8080/v1/days/notes`,
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
			setError('')
			setLoading(false)
			setEditNote(false)
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
