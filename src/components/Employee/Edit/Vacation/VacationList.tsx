import axios from 'axios'
import Vacation from './Vacation'
import Input from '../../../ui/Input'
import Button from '../../../ui/Button'
import Heading from '../../../ui/Heading'
import Container from '../../../ui/Container'
import VacationPlanner from './VacationPlanner'
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
				`http://localhost:8080/v1/employees/vacation`,
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
			<div className='items-auto flex space-x-2	'>
				{showPlanner ? (
					<Button
						size={'sm'}
						className='w-36'
						onClick={() => setShowPlanner(false)}>
						Cancel <X className='ml-2' />
					</Button>
				) : (
					<>
						<Button
							className='w-36'
							size={'sm'}
							onClick={() => setShowPlanner(true)}>
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
								onClick={() => setShowChangeAmount(true)}>
								Change vacation amount
								<FileDigit className='ml-2' />
							</Button>
						)}
					</>
				)}
			</div>
			{!showPlanner && (
				<div className='items-auto mt-12 flex w-full justify-center space-x-2 border-b-2 pb-3 dark:border-slate-700'>
					<Heading
						size={'xs'}
						className='font-normal'>
						Vacation days remaining:
					</Heading>
					<Heading
						size={'xs'}
						className=' text-green-500 dark:text-green-400'>
						{employee.vacationDays}
					</Heading>
				</div>
			)}
			{showPlanner && (
				<VacationPlanner
					loading={loading}
					employee={employee}
					setError={setError}
					setAmount={setAmount}
					setMessage={setMessage}
					setLoading={setLoading}
					setShowPlanner={setShowPlanner}
				/>
			)}

			{!showPlanner && employee.vacations.length > 0 ? (
				<>
					<Heading
						size={'xs'}
						className='mt-16'>
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
				</>
			) : (
				!showPlanner &&
				!showChangeAmount && (
					<Heading
						className='mt-16'
						size={'xs'}>
						This employee has no planned vacations.
					</Heading>
				)
			)}
			{showChangeAmount && (
				<form
					onSubmit={updateAmount}
					className='mt-12 flex space-x-2'>
					<Input
						type='text'
						value={amount}
						className='text-center'
						onChange={(e) => setAmount(Number(e.target.value))}
					/>
					<Button
						size={'sm'}
						variant={'link'}>
						<Check className=' h-6 w-6' />
					</Button>
				</form>
			)}
		</Container>
	)
}

export default VacationList
