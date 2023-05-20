import React, { FC, useState, useEffect } from 'react'
import { WorkDay } from '../pages/DashboardPage'
import { formatDate, formatTime } from '../utils/DateFormatting'

interface TableDashboardProps {
	data: WorkDay[]
}

const TableDashboard: FC<TableDashboardProps> = ({ data }) => {
	const headings = ['Date', 'Shifts', 'Notes']
	const itemsPerPage = 7

	const [currentPage, setCurrentPage] = useState(1)

	// Calculate the index range of items to display based on the current page
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage

	// Get the current page's data slice
	const currentData = data.slice(startIndex, endIndex)

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	useEffect(() => {
		// Find the index of the current date in the data array
		const currentDateIndex = data.findIndex((item) => {
			const currentDate = new Date().setHours(0, 0, 0, 0) / 1000 // Get the current date at midnight in Unix timestamp format
			return item.date <= currentDate && item.date + 86400 > currentDate // Compare if the item's date falls within the current date
		})

		// Calculate the initial page based on the current date's position
		const initialPage = Math.floor(currentDateIndex / itemsPerPage) + 1

		setCurrentPage(initialPage)
	}, [data, itemsPerPage])

	const [activeRow, setActiveRow] = useState<string | null>(null)

	const toggleRow = (rowId: string) => {
		if (activeRow === rowId) {
			setActiveRow(null)
		} else {
			setActiveRow(rowId)
		}
	}

	return (
		<>
			<table className='min-w-full divide-y-2 divide-slate-200 border-2 bg-white text-center text-lg text-slate-800 dark:divide-slate-500 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-300'>
				<thead>
					<tr>
						{headings.map((heading, index) => (
							<th
								key={index}
								className='whitespace-nowrap px-4 py-3 font-medium'>
								{heading}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='divide-y-2 divide-slate-200 dark:divide-slate-500'>
					{currentData.map((item, index) => (
						<React.Fragment key={item._id}>
							<tr
								className={`cursor-pointer duration-75 hover:bg-slate-200 ${
									index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-600' : 'bg-white dark:bg-slate-700'
								}`}
								onClick={() => toggleRow(item._id)}>
								<td className='h-14 cursor-pointer whitespace-nowrap px-4 py-3'>{formatDate(item.date)}</td>
								<td className='h-14 cursor-pointer whitespace-nowrap px-4 py-3'>{item.shifts.length}</td>
								<td className='h-14 cursor-pointer whitespace-nowrap px-4 py-3'>{item.notes.length}</td>
							</tr>
							{activeRow === item._id && (
								<tr>
									<td
										colSpan={headings.length}
										className='text-md px-4 py-3'>
										{/* Dropdown content */}
										{item.shifts.map((shift, index) => (
											<div key={index}>
												{shift.employee.name} {formatTime(shift.start)} - {formatTime(shift.end)}
											</div>
										))}
									</td>
								</tr>
							)}
						</React.Fragment>
					))}
				</tbody>
			</table>
			{/* Pagination */}
			<div className='absolute bottom-56 left-0 right-0 flex justify-center rounded text-2xl'>
				{data.length > itemsPerPage && (
					<nav className='block'>
						<ul className='flex list-none flex-wrap rounded pl-0'>
							{/* Left Arrow */}
							<li>
								<button
									onClick={() => handlePageChange(currentPage - 1)}
									className='relative block bg-white px-3 py-2 leading-tight text-slate-400 dark:bg-slate-700'
									disabled={currentPage === 1}>
									<i className='fa-solid fa-angle-left'></i>
								</button>
							</li>
							{Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
								<li key={index}>
									<button
										onClick={() => handlePageChange(index + 1)}
										className={`relative block px-3 py-2 leading-tight text-slate-500 ${
											currentPage === index + 1
												? 'bg-slate-400 text-white dark:bg-slate-600'
												: 'bg-white text-slate-600 dark:bg-slate-700 dark:text-slate-400'
										}`}>
										{index + 1}
									</button>
								</li>
							))}
							{/* Right Arrow */}
							<li>
								<button
									onClick={() => handlePageChange(currentPage + 1)}
									className='relative block bg-white px-3 py-2 leading-tight text-slate-400 dark:bg-slate-700'
									disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
									<i className='fa-solid fa-angle-right'></i>
								</button>
							</li>
						</ul>
					</nav>
				)}
			</div>
		</>
	)
}

export default TableDashboard
