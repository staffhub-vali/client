import { FC, useState, useEffect } from 'react'
import { WorkDay } from '../pages/DashboardPage'

interface TableDashboardProps {
	data: WorkDay[]
}

function formatDate(unixTimestamp: number) {
	const date = new Date(unixTimestamp * 1000)

	const year = date.getFullYear()
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')

	return `${day}/${month}/${year}`
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

	return (
		<div>
			<table className='min-w-full divide-y-2 divide-slate-200 border bg-white text-center text-lg'>
				<thead>
					<tr>
						{headings.map((heading, index) => (
							<th
								key={index}
								className='whitespace-nowrap px-4 py-3 font-medium text-slate-900'>
								{heading}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='divide-y-2 divide-slate-200'>
					{currentData.map((item, index) => (
						<tr
							key={item._id}
							className={`cursor-pointer duration-75 hover:bg-slate-200 ${
								index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
							}`}>
							<td className='h-14 cursor-pointer whitespace-nowrap px-4 py-3 text-slate-700'>
								{formatDate(item.date)}
							</td>
							<td className='h-14 cursor-pointer whitespace-nowrap px-4 py-3 text-slate-700'>
								{item.shifts.length}
							</td>
							<td className='h-14 cursor-pointer whitespace-nowrap px-4 py-3 text-slate-700'>
								{item.notes.length}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<div className='mt-4 flex justify-center'>
				{data.length > itemsPerPage && (
					<nav className='block'>
						<ul className='flex list-none flex-wrap space-x-2 rounded pl-0'>
							{/* Left Arrow */}
							<li>
								<button
									onClick={() => handlePageChange(currentPage - 1)}
									className={`relative block px-3 py-2 text-lg leading-tight text-slate-900 ${
										currentPage === 1 ? 'cursor-pointer bg-gray-300 text-gray-600' : 'bg-white text-black'
									}`}
									disabled={currentPage === 1}>
									<i className='fa-solid fa-less-than'></i>
								</button>
							</li>

							{/* Right Arrow */}
							<li>
								<button
									onClick={() => handlePageChange(currentPage + 1)}
									className={`relative block px-3 py-2 text-lg leading-tight text-slate-900 ${
										currentPage === Math.ceil(data.length / itemsPerPage)
											? 'cursor-pointer bg-gray-300 text-gray-600'
											: 'bg-white text-black'
									}`}
									disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
									<i className='fa-solid fa-greater-than'></i>
								</button>
							</li>
						</ul>
					</nav>
				)}
			</div>
		</div>
	)
}

export default TableDashboard
