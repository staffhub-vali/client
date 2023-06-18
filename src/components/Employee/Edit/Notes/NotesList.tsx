import axios from 'axios'
import Note from './Note.tsx'
import Input from '../../../ui/Input.tsx'
import Button from '../../../ui/Button.tsx'
import Heading from '../../../ui/Heading.tsx'
import { Logout } from '../../../../Auth.tsx'
import { Check, Scroll, X } from 'lucide-react'
import Container from '../../../ui/Container.tsx'
import { Dispatch, FC, SetStateAction, useState } from 'react'

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
		e.preventDefault()
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/employees/notes`,
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
			setMessage(data.message)
		} catch (error: any) {
			setError(error.response.data.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
			setShowAddNote(false)
		}
	}

	return (
		<Container>
			<div className='flex w-full items-center justify-center space-x-8 border-b-2 pb-4 dark:border-slate-600'>
				<Heading
					size={'sm'}
					className=''>
					Notes for {employee.name}
				</Heading>
				{showAddNote ? (
					<Button
						size={'sm'}
						className=' w-36'
						variant={'outline'}
						onClick={() => setShowAddNote(false)}>
						Cancel
						<X className='ml-2 h-5 w-5' />
					</Button>
				) : (
					<Button
						size={'sm'}
						className=' w-36'
						onClick={() => setShowAddNote(true)}
						variant={'outline'}>
						New Note
						<Scroll className='ml-2 h-5 w-5' />
					</Button>
				)}
			</div>

			{!showAddNote && (
				<div className='slide-in-bottom mt-36'>
					{employee.notes.length > 0 && (
						<Heading
							size={'xs'}
							className='mb-3 text-center'>
							{employee.notes.length} {employee.notes.length === 1 ? 'note' : 'notes'}
						</Heading>
					)}
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
					className='slide-in-bottom mt-36 flex w-2/3 flex-col items-center space-x-4'>
					<Heading
						size={'xs'}
						className='mb-3'>
						New note
					</Heading>
					<div className='flex w-full'>
						<Input
							type='text'
							value={note}
							size={'lg'}
							placeholder=' Add a note...'
							onChange={(e) => setNote(e.target.value)}
						/>
						<Button
							title='Add note'
							variant={'link'}
							className='w-20 min-w-0'>
							<Check
								size={36}
								className='mt-2'
							/>
						</Button>
					</div>
				</form>
			)}
		</Container>
	)
}

export default NotesList
