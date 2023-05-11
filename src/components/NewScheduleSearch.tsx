import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import Logout from '../Auth'

interface Employee {
	_id: string
	name: string
}

interface NewScheduleSearchProps {
	name: string
	isOpen: boolean
	setId: (id: string) => void
	setName: (value: string) => void
	setIsOpen: (isOpen: boolean) => void
}

const NewScheduleSearch: FC<NewScheduleSearchProps> = ({ setId, isOpen, setIsOpen, name, setName }) => {
	const [data, setData] = useState<Employee[]>([])
	const filteredOptions = data.filter((employee) => employee.name.toLowerCase().includes(name.toLowerCase()))

	useEffect(() => {
		fetchEmployees()
	}, [])

	const handleSelect = (option: string, id: string) => {
		setIsOpen(false)
		setName(option)
		setId(id)
	}

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
		setIsOpen(true)
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
		<div className='relative w-96 text-lg '>
			<div
				className='group w-full cursor-pointer rounded bg-white px-4 py-3  shadow'
				onClick={() => setIsOpen(!isOpen)}>
				<input
					placeholder='For...'
					type='text'
					value={name}
					onChange={handleSearch}
					className='group w-full cursor-pointer focus:cursor-text focus:outline-none'
				/>
			</div>
			{isOpen && (
				<div className='absolute left-0 top-10 z-10 mt-4 w-full rounded bg-white shadow'>
					<ul>
						{filteredOptions.map((employee) => (
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

export default NewScheduleSearch
