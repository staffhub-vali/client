import { FC, useState } from 'react'

interface NewScheduleSearchProps {
	value: string
	isOpen: boolean
	setValue: (value: string) => void
	setIsOpen: (isOpen: boolean) => void
}

const options = ['Vali', 'Maria', 'Johnny']

const NewScheduleSearch: FC<NewScheduleSearchProps> = ({ isOpen, setIsOpen, value, setValue }) => {
	const filteredOptions = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()))

	const handleSelect = (option: string) => {
		setIsOpen(false)
		setValue(option)
	}

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		setIsOpen(true)
	}

	return (
		<div className='relative w-96 text-lg '>
			<div
				className='group w-full cursor-pointer rounded bg-white px-4 py-3  shadow'
				onClick={() => setIsOpen(!isOpen)}>
				<input
					placeholder='For...'
					type='text'
					value={value}
					onChange={handleSearch}
					className='group w-full cursor-pointer focus:cursor-text focus:outline-none'
				/>
			</div>
			{isOpen && (
				<div className='absolute left-0 top-10 z-10 mt-4 w-full rounded bg-white shadow'>
					<ul>
						{filteredOptions.map((option, index) => (
							<li
								className='cursor-pointer px-4 py-3 hover:bg-gray-200'
								key={index}
								onClick={() => handleSelect(option)}>
								{option}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default NewScheduleSearch
