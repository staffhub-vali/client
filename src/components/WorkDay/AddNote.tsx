import axios from 'axios'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { Logout } from '../../Auth'
import { Check, X } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'

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
				size={'lg'}
				type='text'
				name='note'
				className='w-96'
				placeholder='Anything to note?'
				onChange={(e) => setNote(e.target.value)}
				value={note}
			/>

			<Button
				title='Add note'
				variant={'link'}
				className=' min-w-0'
				onClick={addNote}>
				{
					<Check
						size={40}
						className='mt-2'
					/>
				}
			</Button>
			<Button
				title='Cancel'
				variant={'link'}
				className=' min-w-0'
				onClick={() => setShowAddNote(false)}>
				{
					<X
						size={40}
						className='mt-2'
					/>
				}
			</Button>
		</div>
	)
}

export default AddNote
