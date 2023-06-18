import axios from 'axios'
import Input from '../../../ui/Input.tsx'
import Button from '../../../ui/Button.tsx'
import { Check, Plus, X } from 'lucide-react'
import Heading from '../../../ui/Heading.tsx'
import { Logout } from '../../../../Auth.tsx'
import Container from '../../../ui/Container.tsx'
import ShiftPreference from './ShiftPreference.tsx'
import { Dispatch, FC, SetStateAction, useState } from 'react'

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
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
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
		e.preventDefault()
		setLoading(true)

		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/employees/preferences`,
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
		} catch (error: any) {
			setError(error.response.data.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
			setShowAddShiftPreference(false)
		}
	}

	return (
		<Container>
			<div className='flex items-center space-x-8'>
				<Heading size={'sm'}>{employee.name}</Heading>
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
				<div className='slide-in-bottom mt-32'>
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
					className='slide-in-bottom mt-32 flex w-2/3 space-x-4'>
					<Input
						type='text'
						value={shiftPreference}
						size={'lg'}
						placeholder=' Add a shift preference...'
						onChange={(e) => setShiftPreference(e.target.value)}
					/>
					<Button
						title='Add shift preference'
						variant={'link'}
						className='w-20 min-w-0'>
						<Check
							size={36}
							className='mt-2'
						/>
					</Button>
				</form>
			)}
		</Container>
	)
}

export default ShiftPreferencesList
