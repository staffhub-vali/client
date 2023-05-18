import { FC, useState } from 'react'
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
						<ul className='flex list-none flex-wrap rounded pl-0'>
							{Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
								<li key={index}>
									<button
										onClick={() => handlePageChange(index + 1)}
										className={`relative block px-3 py-2 text-lg leading-tight text-slate-900 ${
											currentPage === index + 1 ? 'bg-black text-white' : 'bg-white text-black'
										}`}>
										{index + 1}
									</button>
								</li>
							))}
						</ul>
					</nav>
				)}
			</div>
		</div>
	)
}

export default TableDashboard
