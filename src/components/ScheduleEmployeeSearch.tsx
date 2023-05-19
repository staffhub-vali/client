import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import Logout from '../Auth'

interface Employee {
	_id: string
	name: string
}

interface ScheduleEmployeeSearchProps {
	name: string
	isOpen: boolean
	setId: (id: string) => void
	setName: (value: string) => void
	setIsOpen: (isOpen: boolean) => void
}

const ScheduleEmployeeSearch: FC<ScheduleEmployeeSearchProps> = ({
	setId,
	isOpen,
	setIsOpen,
	name,
	setName,
}) => {
	const [data, setData] = useState<Employee[]>([])

	useEffect(() => {
		fetchEmployees()
	}, [])

	const handleSelect = (option: string, id: string) => {
		setIsOpen(false)
		setName(option)
		setId(id)
	}

	const fetchEmployees = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get<Employee[]>('http://localhost:8080/v1/employees', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setData(response.data)
		} catch (error: any) {
			console.log(error)
			if (error.response.status === 401) {
				Logout()
			}
		}
	}

	return (
		<div className='relative mt-0.5 w-96 text-lg '>
			<div
				className='group w-full cursor-pointer rounded bg-white shadow hover:shadow-md'
				onClick={() => setIsOpen(!isOpen)}>
				<input
					placeholder='Choose an Employee...'
					type='text'
					value={name}
					className='group w-full cursor-pointer px-4 py-3  caret-transparent placeholder:text-slate-500 focus:outline-none'
				/>
			</div>
			{isOpen && (
				<div className='absolute left-0 top-10 z-10 mt-4 w-full rounded bg-white shadow'>
					<ul>
						{data.map((employee) => (
							<li
								className='cursor-pointer px-4 py-3 hover:bg-gray-200'
								key={employee._id}
								onClick={() => handleSelect(employee.name, employee._id)}>
								{employee.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default ScheduleEmployeeSearch
