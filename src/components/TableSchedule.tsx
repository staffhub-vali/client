import { FC } from 'react'
import { Card, Typography } from '@material-tailwind/react'

interface TableScheduleProps {
	data: {
		date: string
		start: string | null
		end: string | null
	}[]
}

const TableSchedule: FC<TableScheduleProps> = ({ data }) => {
	console.log(data)
	const TABLE_HEAD = ['Date', 'Start', 'End', '']
	return (
		<Card className='h-full w-full overflow-scroll'>
			<table className='w-full min-w-max table-auto text-left'>
				<thead>
					<tr>
						{TABLE_HEAD.map((head) => (
							<th
								key={head}
								className='border-blue-gray-100 bg-blue-gray-50 border-b p-4'>
								<Typography
									variant='small'
									color='blue-gray'
									className='font-normal leading-none opacity-70'>
									{head}
								</Typography>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map(({ date, start, end }, index) => {
						const isLast = index === data.length - 1
						const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

						return (
							<tr key={date}>
								<td className={classes}>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-normal'>
										{new Date(date).toLocaleDateString('en-GB')}
									</Typography>
								</td>
								<td className={classes}>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-normal'>
										{start ? new Date(start).toLocaleTimeString('en-GB').slice(0, 5) : ''}
									</Typography>
								</td>
								<td className={classes}>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-normal'>
										{end ? new Date(end).toLocaleTimeString('en-GB').slice(0, 5) : ''}
									</Typography>
								</td>
								<td className={classes}>
									<Typography
										as='a'
										href='#'
										variant='small'
										color='blue'
										className='font-medium'>
										Edit
									</Typography>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</Card>
	)
}

export default TableSchedule
