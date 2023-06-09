import axios from 'axios'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import Container from '../../../ui/Container'
import Button from '../../../ui/Button'
import { Check, PlusCircle } from 'lucide-react'
import Input from '../../../ui/Input'
import ShiftPreference from './ShiftPreference'

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
	setEdit: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string>>
	setMessage: Dispatch<SetStateAction<string>>
	setLoading: Dispatch<SetStateAction<boolean>>
}

const ShiftPreferencesList: FC<ShiftPreferencesListProps> = ({
	employee,
	setEdit,
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
			{!showAddShiftPreference && (
				<Button
					onClick={() => setShowAddShiftPreference(true)}
					variant={'outline'}>
					New Shift Preference
					<PlusCircle className='ml-2 h-5 w-5' />
				</Button>
			)}
			{showAddShiftPreference && (
				<form
					onSubmit={addShiftPreference}
					className='flex w-2/3 space-x-1'>
					<Input
						type='text'
						value={shiftPreference}
						placeholder=' Add a shift preference...'
						onChange={(e) => setShiftPreference(e.target.value)}
					/>
					<Button className='shadow-md'>
						Add <Check className='ml-2 h-5 w-5' />
					</Button>
				</form>
			)}
			<>
				{employee.shiftPreferences.map((shiftPreference, index) => (
					<ShiftPreference
						key={index}
						index={index}
						loading={loading}
						employee={employee}
						setError={setError}
						setLoading={setLoading}
						setMessage={setMessage}
						shiftPreference={shiftPreference}
					/>
				))}
			</>
		</Container>
	)
}

export default ShiftPreferencesList
