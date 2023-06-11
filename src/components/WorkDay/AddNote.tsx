import axios from 'axios'
import Button from '../ui/Button'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Check, X } from 'lucide-react'
import Input from '../ui/Input'
import { Logout } from '../../Auth'

interface AddNoteProps {
	showAddNote: boolean
	workDay: WorkDay | null
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setShowAddNote: Dispatch<SetStateAction<boolean>>
	setShowAddShift: Dispatch<SetStateAction<boolean>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

interface WorkDay {
	notes: string[]
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
			setShowAddNote(false)
			setMessage(data.message)
		} catch (error: any) {
			setError(error.response.data.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className='flex space-x-2'>
			<Input
				type='text'
				name='note'
				placeholder='Anything to note?'
				onChange={(e) => setNote(e.target.value)}
				value={note}
			/>

			<Button
				size={'sm'}
				className='w-44'
				onClick={addNote}>
				Add Note {<Check className='ml-2 h-5 w-5' />}
			</Button>
			<Button
				size={'sm'}
				className='w-44'
				variant={'outline'}
				onClick={() => setShowAddNote(false)}>
				Cancel {<X className='ml-2 h-5 w-5' />}
			</Button>
		</div>
	)
}

export default AddNote
