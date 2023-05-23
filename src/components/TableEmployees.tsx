import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableEmployeesProps {
	headings: string[]
	searchBar?: boolean
	data: any
}

const TableEmployees: FC<TableEmployeesProps> = ({ headings, data, searchBar }) => {
	const [searchText, setSearchText] = useState<string>('')

	const filteredData = data.filter((row: any) => {
		const values = Object.values(row).join('').toLowerCase()
		return values.includes(searchText.toLowerCase())
	})

	const navigate = useNavigate()

	const path = window.location.pathname.split('/').pop()

	return (
		<div className='w-2/3 overflow-x-auto text-slate-800 dark:text-slate-200'>
			{searchBar && (
				<div className='mx-auto mb-2 flex w-1/3 items-center rounded bg-white px-2 py-1 shadow dark:bg-slate-700'>
					<i className='fa fa-search text-slate-500 dark:text-slate-400'></i>
					<input
						placeholder='Search...'
						className='w-full p-2 text-lg  outline-none dark:bg-slate-700 dark:text-slate-400'
						type='text'
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
					/>
				</div>
			)}
			<table className='divide-slate200 min-w-full divide-y-2 border-2 bg-white text-center text-lg dark:divide-slate-600 dark:border-slate-600 dark:bg-slate-700'>
				<thead>
					<tr>
						{headings.map((heading, index) => (
							<th
								key={`heading-${index}`}
								className='whitespace-nowrap px-4 py-3 font-medium '>
								{heading}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='divide-y-2 divide-slate-200 dark:divide-slate-600'>
					{filteredData.map((row: any, index: number) => (
						<tr
							onClick={() => navigate(`/${path}/${row._id}`)}
							key={`row-${index}`}
							className={` cursor-pointer duration-75 hover:bg-slate-200 dark:hover:bg-slate-600
							${index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800 ' : 'bg-white dark:bg-slate-700'}`}>
							{headings.map((heading, index) => (
								<td
									key={`row-${index}`}
									className={`cursor-pointer'} h-14 whitespace-nowrap px-4 py-3`}>
									{row[heading.toLowerCase()]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TableEmployees
