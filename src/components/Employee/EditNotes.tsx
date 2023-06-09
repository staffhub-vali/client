import { Dispatch, FC, SetStateAction, useState } from 'react'
import Container from '../ui/Container'
import Paragraph from '../ui/Paragraph'
import Button from '../ui/Button'
import { Check, PlusCircle } from 'lucide-react'
import Input from '../ui/Input'
import axios from 'axios'
import Note from './Note'

interface EditNotesProps {
	employee: {
		_id: string
		name: string
		email: string
		phone: string
		notes: string[]
		shiftPreferences: string[]
		vacationDays: number | string
	}
	loading: boolean
	setEdit: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string>>
	setMessage: Dispatch<SetStateAction<string>>
	setLoading: Dispatch<SetStateAction<boolean>>
}

const EditNotes: FC<EditNotesProps> = ({ employee, setEdit, loading, setLoading, setError, setMessage }) => {
	const [note, setNote] = useState<string>('')
	const [showAddNote, setShowAddNote] = useState<boolean>(false)

	const addNote = async (e: React.FormEvent) => {
		setLoading(true)
		e.preventDefault()
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				`http://localhost:8080/v1/employees/notes`,
				{
					note: note,
					employeeId: employee._id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setNote('')
			setMessage(data.message)
			setShowAddNote(false)
			setLoading(false)
		} catch (error: any) {
			setShowAddNote(false)
			setError(error.response.data.message)
			setLoading(false)
		}
	}

	return (
		<Container>
			{!showAddNote && (
				<Button
					onClick={() => setShowAddNote(true)}
					variant={'outline'}>
					New Note
					<PlusCircle className='ml-2 h-5 w-5' />
				</Button>
			)}
			{showAddNote && (
				<form
					onSubmit={addNote}
					className='flex w-2/3 space-x-1'>
					<Input
						type='text'
						value={note}
						placeholder=' Add a note...'
						onChange={(e) => setNote(e.target.value)}
					/>
					<Button className='shadow-md'>
						Add <Check className='ml-2 h-5 w-5' />
					</Button>
				</form>
			)}
			<>
				{employee.notes.map((note, index) => (
					<Note
						employee={employee}
						loading={loading}
						setLoading={setLoading}
						setError={setError}
						setMessage={setMessage}
						note={note}
						index={index}
						key={index}
					/>
				))}
			</>
		</Container>
	)
}

export default EditNotes
