import axios from 'axios'
import Vacation from './Vacation.tsx'
import Input from '../../../ui/Input.tsx'
import Button from '../../../ui/Button.tsx'
import Heading from '../../../ui/Heading.tsx'
import { Logout } from '../../../../Auth.tsx'
import Container from '../../../ui/Container.tsx'
import VacationPlanner from './VacationPlanner.tsx'
import { Check, FileDigit, Palmtree, X } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'

interface VacationListProps {
	loading: boolean
	employee: Employee
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

interface Employee {
	_id: string
	name: string
	email: string
	phone: string
	notes: string[]
	vacationDays: number
	shiftPreferences: string[]
	vacations: [{ start: number; end: number }]
}

const VacationList: FC<VacationListProps> = ({ loading, setLoading, employee, setMessage, setError }) => {
	const [daysPlanned, setDaysPlanned] = useState<number>(0)
	const [showPlanner, setShowPlanner] = useState<boolean>(false)
	const [amount, setAmount] = useState<number>(employee.vacationDays)
	const [showChangeAmount, setShowChangeAmount] = useState<boolean>(false)

	const updateAmount = async (e: React.FormEvent) => {
		e.preventDefault()

		if (employee.vacationDays === amount) {
			return setShowChangeAmount(false)
		}

		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const { data } = await axios.put(
				`${import.meta.env.VITE_BASE_URL}/employees/employees/vacation`,
				{
					employeeId: employee._id,
					amount: amount,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)

			setMessage(data.message)
			setShowChangeAmount(false)
		} catch (error: any) {
			setError(error.data.response.message)
			if (error.response.status === 401) {
				Logout()
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container size={'lg'}>
			<Heading
				size={'sm'}
				className='mb-6'>
				{employee.name}
			</Heading>
			<div className='items-auto slide-in-bottom flex space-x-2'>
				{!showPlanner && (
					<>
						<Button
							className='w-36'
							size={'sm'}
							title='Create a new vacation'
							onClick={() => {
								setShowPlanner(true)
								setShowChangeAmount(false)
							}}>
							New Vacation <Palmtree className='ml-2' />
						</Button>
						{showChangeAmount ? (
							<Button
								className='w-56'
								size={'sm'}
								variant={'outline'}
								onClick={() => setShowChangeAmount(false)}>
								Cancel
								<X className='ml-2' />
							</Button>
						) : (
							<Button
								className='w-56'
								size={'sm'}
								variant={'outline'}
								title='Change the amount of vacation days'
								onClick={() => setShowChangeAmount(true)}>
								Change number of days
								<FileDigit className='ml-2' />
							</Button>
						)}
					</>
				)}
			</div>
			{!showPlanner && !showChangeAmount && (
				<div className='items-auto mt-12 flex w-full justify-center space-x-2 border-b-2 pb-3 dark:border-slate-700'>
					<Heading
						size={'xs'}
						className='slide-in-bottom font-normal '>
						Vacation days remaining:
					</Heading>
					<Heading
						size={'xs'}
						className=' slide-in-bottom text-green-500 dark:text-green-400 '>
						{employee.vacationDays}
					</Heading>
				</div>
			)}
			{showChangeAmount && (
				<form
					onSubmit={updateAmount}
					className='mt-9 flex w-full items-center justify-center border-b-2 pb-3 dark:border-slate-700'>
					<Input
						type='text'
						value={amount}
						className='slide-in-bottom m-0 w-fit text-center text-2xl font-bold shadow-md '
						onChange={(e) => setAmount(Number(e.target.value))}
					/>
					<Button
						size={'sm'}
						variant={'link'}
						className='slide-in-bottom w-20 min-w-0 '>
						<Check size={36} />
					</Button>
				</form>
			)}
			{showPlanner && (
				<>
					{' '}
					<Heading
						size={'xs'}
						className='slide-in-bottom font-normal'>
						Days planned: {daysPlanned}
					</Heading>
					<VacationPlanner
						loading={loading}
						employee={employee}
						setError={setError}
						setAmount={setAmount}
						setMessage={setMessage}
						setLoading={setLoading}
						daysPlanned={daysPlanned}
						setDaysPlanned={setDaysPlanned}
						setShowPlanner={setShowPlanner}
					/>
				</>
			)}

			{!showPlanner && employee.vacations.length > 0 ? (
				<div className='slide-in-bottom-h1'>
					<Heading
						size={'xs'}
						className='mb-3 mt-16 text-center'>
						Vacations
					</Heading>
					{employee.vacations.map((vacation, index) => (
						<Vacation
							key={index}
							index={index}
							loading={loading}
							vacation={vacation}
							employee={employee}
							setError={setError}
							setAmount={setAmount}
							setLoading={setLoading}
							setMessage={setMessage}
						/>
					))}
				</div>
			) : (
				!showPlanner && (
					<Heading
						className='slide-in-bottom-h1 mt-16'
						size={'xs'}>
						This employee has no planned vacations.
					</Heading>
				)
			)}
		</Container>
	)
}

export default VacationList
