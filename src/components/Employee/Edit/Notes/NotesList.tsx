import { Dispatch, FC, SetStateAction, useState } from 'react'
import Container from '../../../ui/Container'
import Paragraph from '../../../ui/Paragraph'
import Button from '../../../ui/Button'
import { Check, CheckCircle, CheckCircle2, PlusCircle, Scroll, X } from 'lucide-react'
import Input from '../../../ui/Input'
import axios from 'axios'
import Note from './Note'
import Heading from '../../../ui/Heading'

interface NotesListProps {
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
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

const NotesList: FC<NotesListProps> = ({ employee, loading, setLoading, setError, setMessage }) => {
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
			<div className='flex items-center space-x-8'>
				<Heading size={'sm'}>Notes</Heading>
				{showAddNote ? (
					<Button
						size={'sm'}
						className='w-36'
						onClick={() => setShowAddNote(false)}
						variant={'outline'}>
						Cancel
						<X className='ml-2 h-5 w-5' />
					</Button>
				) : (
					<Button
						size={'sm'}
						className='w-36'
						onClick={() => setShowAddNote(true)}
						variant={'outline'}>
						New Note
						<Scroll className='ml-2 h-5 w-5' />
					</Button>
				)}
			</div>

			{!showAddNote && (
				<div className='mt-32'>
					{employee.notes.length > 0 ? (
						employee.notes.map((note, index) => (
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
						))
					) : (
						<>
							{!showAddNote && (
								<Heading
									className='font-normal'
									size={'xs'}>
									There are no notes for this employee.
								</Heading>
							)}
						</>
					)}
				</div>
			)}
			{showAddNote && (
				<form
					onSubmit={addNote}
					className='mt-32 flex w-2/3 space-x-4'>
					<Input
						type='text'
						value={note}
						placeholder=' Add a note...'
						onChange={(e) => setNote(e.target.value)}
					/>
					<Button
						className='w-16 min-w-0'
						variant={'link'}>
						<Check className='scale-110' />
					</Button>
				</form>
			)}
		</Container>
	)
}

export default NotesList
