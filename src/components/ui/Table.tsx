import { FC, useState } from 'react'

interface TableProps {
	headings: string[]
	data: string[][]
}

const Table: FC<TableProps> = ({ headings, data }) => {
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
	const [sortedData, setSortedData] = useState(data)

	const sortData = (columnIndex: number) => {
		const sortOrderFactor = sortOrder === 'asc' ? 1 : -1

		return [...sortedData].sort((row1, row2) => {
			const date1 = new Date(row1[columnIndex].replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'))
			const date2 = new Date(row2[columnIndex].replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'))

			return date1 > date2 ? sortOrderFactor : date1 < date2 ? -sortOrderFactor : 0
		})
	}

	return (
		<div className='w-2/3 overflow-x-auto shadow'>
			<table className={`min-w-full divide-y-2 divide-slate-200 border bg-white text-2xl  `}>
				<thead className=''>
					<tr>
						{headings.map((heading: string, index: number) => (
							<th
								key={index}
								className='whitespace-nowrap px-4 py-2 font-medium text-slate-900'>
								{heading}
								{index === 0 && heading === 'Date' && (
									<span
										className='cursor-pointer p-2 text-sm text-gray-400'
										onClick={() => {
											const sortedData = sortData(index)
											setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
											setSortedData(sortedData)
										}}>
										<i className='fa-solid fa-sort'></i>
									</span>
								)}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='divide-y-1 divide-slate-200 '>
					{sortedData.map((rowData: string[], index: number) => (
						<tr
							key={index}
							className={index % 2 === 0 ? 'bg-slate-100' : 'bg-white'}>
							{rowData.map((cellData, index) => (
								<td
									key={index}
									className='whitespace-nowrap px-4 py-2 text-center text-slate-700'>
									{cellData}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
