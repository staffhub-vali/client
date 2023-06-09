import axios from 'axios'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import Container from '../../../ui/Container'
import Button from '../../../ui/Button'
import { Check, Plus, PlusCircle, Scroll, X } from 'lucide-react'
import Input from '../../../ui/Input'
import ShiftPreference from './ShiftPreference'
import Heading from '../../../ui/Heading'

interface ShiftPreferencesListProps {
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
	setError: Dispatch<SetStateAction<string>>
	setMessage: Dispatch<SetStateAction<string>>
	setLoading: Dispatch<SetStateAction<boolean>>
}

const ShiftPreferencesList: FC<ShiftPreferencesListProps> = ({
	employee,

	loading,
	setError,
	setLoading,
	setMessage,
}) => {
	const [shiftPreference, setShiftPreference] = useState<string>('')
	const [showAddShiftPreference, setShowAddShiftPreference] = useState<boolean>(false)

	const addShiftPreference = async (e: React.FormEvent) => {
		setLoading(true)
		e.preventDefault()
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				`http://localhost:8080/v1/employees/preferences`,
				{
					shiftPreference: shiftPreference,
					employeeId: employee._id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			setShiftPreference('')
			setMessage(data.message)
			setShowAddShiftPreference(false)
			setLoading(false)
		} catch (error: any) {
			setShowAddShiftPreference(false)
			setError(error.response.data.message)
			setLoading(false)
		}
	}

	return (
		<Container>
			<div className='flex items-center space-x-8'>
				<Heading size={'sm'}>Shift preferences</Heading>
				{showAddShiftPreference ? (
					<Button
						size={'sm'}
						className='w-48 min-w-0'
						onClick={() => setShowAddShiftPreference(false)}
						variant={'outline'}>
						Cancel
						<X className='ml-2 h-5 w-5' />
					</Button>
				) : (
					<Button
						size={'sm'}
						className='w-48'
						onClick={() => setShowAddShiftPreference(true)}
						variant={'outline'}>
						New Shift Preference
						<Plus className='ml-2 h-5 w-5' />
					</Button>
				)}
			</div>

			{!showAddShiftPreference && (
				<div className='mt-32'>
					{employee.shiftPreferences.length > 0 ? (
						employee.shiftPreferences.map((shiftPreference, index) => (
							<ShiftPreference
								key={index}
								index={index}
								loading={loading}
								employee={employee}
								setError={setError}
								setMessage={setMessage}
								setLoading={setLoading}
								shiftPreference={shiftPreference}
							/>
						))
					) : (
						<>
							{!showAddShiftPreference && (
								<Heading
									className='font-normal'
									size={'xs'}>
									There are no shift preferences for this employee.
								</Heading>
							)}
						</>
					)}
				</div>
			)}
			{showAddShiftPreference && (
				<form
					onSubmit={addShiftPreference}
					className='mt-32 flex w-2/3 space-x-4'>
					<Input
						type='text'
						value={shiftPreference}
						placeholder=' Add a shift preference...'
						onChange={(e) => setShiftPreference(e.target.value)}
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

export default ShiftPreferencesList
