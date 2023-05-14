import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface TableProps {
	noLink?: boolean
	headings: string[]
	editable?: boolean
	searchBar?: boolean
	data: any
}

const Table: FC<TableProps> = ({ headings, data, searchBar, editable, noLink }) => {
	const [searchText, setSearchText] = useState<string>('')

	const filteredData = data.filter((row: any) => {
		const values = Object.values(row).join('').toLowerCase()
		return values.includes(searchText.toLowerCase())
	})

	const navigate = useNavigate()

	const path = window.location.pathname.split('/').pop()

	return (
		<div className='w-2/3 overflow-x-auto'>
			{searchBar && (
				<div className='mx-auto mb-2 flex w-1/3 items-center rounded bg-white px-2 py-1 shadow'>
					<i className='fa fa-search text-slate-500'></i>
					<input
						placeholder='Search...'
						className='w-full p-2 text-lg  outline-none'
						type='text'
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
					/>
				</div>
			)}
			<table className='min-w-full divide-y-2 divide-slate-200 border bg-white text-center text-lg'>
				<thead className='ltr:text-left rtl:text-right'>
					<tr>
						{headings.map((heading, index) => (
							<th
								key={`heading-${index}`}
								className='whitespace-nowrap px-4 py-3 font-medium text-slate-900'>
								{heading}
							</th>
						))}
					</tr>
				</thead>

				<tbody className='divide-y-2 divide-slate-200'>
					{filteredData.map((row: any, index: number) => (
						<tr
							onClick={() => !editable && !noLink && navigate(`/${path}/${row._id}`)}
							key={`row-${index}`}
							className={`${!noLink ? 'cursor-pointer ' : ''}duration-75 ${
								!noLink ? 'hover:bg-slate-200 ' : ''
							}${index % 2 === 0 ? 'bg-slate-50 ' : 'bg-white'}`}>
							{headings.map((heading, index) => (
								<td
									key={`row-${index}`}
									className={`h-14 whitespace-nowrap px-4 py-3 text-slate-700${
										editable ? ' cursor-pointer' : ''
									}`}
									onDoubleClick={(event: any) => {
										if (editable) {
											event.target.contentEditable = true
											event.target.focus()
											event.target.classList.add('bg-white')
											event.target.classList.add('cursor-text')
										}
									}}
									onBlur={(event: any) => {
										if (editable) {
											event.target.contentEditable = false
											event.target.classList.remove('bg-white')
											event.target.classList.remove('cursor-text')
											const rowIndex = event.target.parentNode.rowIndex - 1
											const heading = headings[event.target.cellIndex]
											const newValue = event.target.innerText
											const newData = [...data]
											newData[rowIndex][heading.toLowerCase()] = newValue
										}
									}}
									onKeyDown={(event: any) => {
										if (event.key === 'Enter') {
											event.preventDefault()
											event.target.blur()
										}
									}}>
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

export default Table
