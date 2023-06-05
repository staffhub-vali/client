import axios from 'axios'
import { FC, useState } from 'react'
import Button from '../ui/Button'

interface AddNoteProps {
	workDay: WorkDay | null
	setLoading: any
	setError: any
	setMessage: any
	showAddNote: boolean
	setShowAddNote: any
	setShowAddShift: any
}

interface WorkDay {
	notes: []
	_id: string
	date: number
}

const AddNote: FC<AddNoteProps> = ({
	workDay,
	setLoading,
	setError,
	setMessage,
	showAddNote,
	setShowAddNote,
	setShowAddShift,
}) => {
	const [note, setNote] = useState<string>('')

	const addNote = async () => {
		if (!showAddNote) {
			setShowAddNote(true)
			setShowAddShift(false)
			return
		}
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				'http://localhost:8080/v1/days/notes',
				{
					day: workDay?._id,
					note: note,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setNote('')
			setError('')
			setLoading(false)
			setShowAddNote(false)
			setMessage(data.message)
		} catch (error: any) {
			setMessage('')
			setLoading(false)
			setError(error.response.data.message)
		}
	}
	return (
		<>
			<textarea
				name='note'
				rows={5}
				cols={50}
				className='resize-none rounded p-2 shadow'
				placeholder='Anything to note?'
				onChange={(e) => setNote(e.target.value)}>
				{note}
			</textarea>
			<Button
				onClick={addNote}
				className=''>
				Add Note
			</Button>
		</>
	)
}

export default AddNote
