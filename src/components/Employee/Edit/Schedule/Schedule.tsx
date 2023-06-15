import { Calendar } from 'react-calendar'
import Button from '../../../ui/Button.tsx'
import Heading from '../../../ui/Heading.tsx'
import Container from '../../../ui/Container.tsx'
import Paragraph from '../../../ui/Paragraph.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import ReactPDF, { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'
import { calculateMonthlyHours, calculateTotalHours } from '../../../../utils/CalculateHours.ts'
import { formatDate, formatDay, formatMonth, formatTime, formatTotal } from '../../../../utils/DateFormatting.ts'

interface ScheduleProps {
	employee: {
		_id: string
		name: string
		email: string
		phone: string
		notes: string[]
		shiftPreferences: string[]
		vacationDays: number | string
	}
	shifts: Shift[]
	loading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	setMessage: Dispatch<SetStateAction<string | null>>
}

interface Shift {
	_id: string
	start: number
	end: number
	employee: string
	workDay: { date: number; _id: string }
}

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	title: {
		textAlign: 'center',
		fontSize: 24,
		padding: 16,
		borderBottom: '1px solid black',
	},
	section: {
		padding: 3.32,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderBottom: '1px solid #ccc',
	},

	shift: {
		width: 200,
		fontSize: 16,
		textAlign: 'center',
	},
})

const Schedule: FC<ScheduleProps> = ({ loading, setError, setMessage, employee, setLoading, shifts }) => {
	const navigate = useNavigate()

	const [value, setValue] = useState(new Date())
	const [month, setMonth] = useState<string | null>(null)
	const [filteredShifts, setFilteredShifts] = useState<Shift[]>(shifts)

	const [mergedData, setMergedData] = useState([])

	const handleMonthChange: any = (date: Date) => {
		const monthData = updateMonthData(date)

		setValue(date)
		updateMonthData(date)
		setMonth(formatMonth(value.getTime() / 1000))
		const filteredShifts = shifts.filter((shift) => {
			const startTimestamp = shift.start
			const startDate = new Date(startTimestamp * 1000)
			const startMonth = startDate.getMonth()

			return startMonth === date.getMonth()
		})

		setFilteredShifts(filteredShifts.sort((a: any, b: any) => a.date - b.date))

		setMergedData(combineArrays(monthData, filteredShifts))
	}

	const updateMonthData = (date: Date) => {
		const year = date.getFullYear()
		const monthIndex = date.getMonth()
		const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

		const data = new Array(daysInMonth).fill(null).map((_, index) => {
			const day = index + 1
			const dateUnixTimestamp = new Date(year, monthIndex, day).getTime() / 1000

			return {
				date: dateUnixTimestamp,
			}
		})

		return data
	}

	const combineArrays = (emptyDays: any, shifts: any) => {
		const combinedArray = emptyDays.map((day: any) => {
			const matchingDateShift = shifts.find((shift: any) => shift.workDay.date === day.date)
			if (matchingDateShift) {
				return {
					_id: matchingDateShift.workDay._id,
					date: matchingDateShift.workDay.date,
					start: matchingDateShift.start,
					end: matchingDateShift.end,
				}
			} else {
				return day
			}
		})

		return combinedArray
	}

	const MyDocument = () => (
		<Document pageLayout='singlePage'>
			<Page
				size='A4'
				orientation='portrait'
				style={styles.page}>
				<View style={styles.title}>
					<Text>
						{employee.name} - {month} ({calculateTotalHours(mergedData)}h)
					</Text>
				</View>
				{mergedData.map((shift: { date: number; _id: string; start: number; end: number }) => (
					<View
						key={shift._id}
						style={styles.section}>
						<Text style={styles.shift}>{formatDate(shift.date)}</Text>

						{shift.start && shift.end ? (
							<>
								<Text style={styles.shift}>
									{formatTime(shift.start)} - {formatTime(shift.end)}
								</Text>
								<Text style={styles.shift}>{formatTotal(shift.start, shift.end)}</Text>
							</>
						) : (
							<>
								<Text style={styles.shift}></Text>
								<Text style={styles.shift}></Text>
							</>
						)}
					</View>
				))}
			</Page>
		</Document>
	)

	return (
		<Container size={'lg'}>
			<Heading size={'sm'}>{employee.name}</Heading>

			<Heading
				size={'xs'}
				className='my-3 w-full border-b-2 p-4 text-center font-normal dark:border-slate-700'>
				Total hours for {formatMonth(new Date().getTime() / 1000)} - {calculateMonthlyHours(shifts)}
			</Heading>

			<div className='mt-4 flex w-full'>
				<div
					className={`${
						filteredShifts.length > 0
							? 'overflow-y-scroll border bg-white shadow dark:border-slate-500 dark:bg-slate-800'
							: 'border-none'
					}  mx-auto h-[37rem] overflow-x-hidden rounded border`}>
					{filteredShifts.length <= 0 && (
						<Heading
							size={'sm'}
							className='mx-auto mt-36 w-[48.5rem] text-center'>
							There are no shifts for {formatMonth(value.getTime() / 1000)}
						</Heading>
					)}
					{filteredShifts.length > 0 && month && (
						<Heading
							size={'xs'}
							className='text-md flex items-center justify-evenly border-b-2 border-t bg-white py-4 text-center font-normal dark:border-slate-500 dark:bg-slate-800'>
							{formatMonth(value.getTime() / 1000)} - {filteredShifts.length}{' '}
							{filteredShifts.length === 1 ? 'Shift' : 'Shifts'} ({calculateTotalHours(filteredShifts)} hours)
							<Button
								size={'lg'}
								className='text-xl hover:text-sky-500 dark:hover:text-sky-400'
								variant={'outlineHover'}>
								<PDFDownloadLink
									document={<MyDocument />}
									fileName={`${employee.name} - ${formatMonth(value.getTime() / 1000)}`}>
									Save as PDF
								</PDFDownloadLink>
							</Button>
						</Heading>
					)}
					{!month && filteredShifts.length > 0 && (
						<Heading
							size={'sm'}
							className='border-b-2 bg-white pb-3 pt-6 text-center font-normal dark:border-slate-500 dark:bg-slate-800'>
							All shifts
						</Heading>
					)}
					{filteredShifts.length > 0 &&
						mergedData.map((shift: { date: number; _id: string; start: number; end: number }, index) => (
							<div
								key={shift._id}
								onClick={() => shift._id && navigate(`/days/${shift._id}`)}
								className={`${
									shift._id && 'group cursor-pointer '
								} flex w-[48rem] items-center space-y-4 border-b-2 dark:border-slate-500 ${
									index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-700' : 'bg-white dark:bg-slate-800'
								} py-2`}>
								<div className='mx-auto flex flex-col items-center group-hover:text-sky-500 dark:group-hover:text-sky-400'>
									{formatDay(shift.date)}
									<Paragraph
										className='group-hover:text-sky-500 dark:group-hover:text-sky-400'
										size={'xl'}>
										{formatDate(shift.date)}
									</Paragraph>
								</div>

								<Paragraph
									size={'xl'}
									className='mx-auto w-48 pb-2 group-hover:text-sky-500 dark:group-hover:text-sky-400'>
									{shift.start && (
										<>
											{formatTime(shift.start)} - {formatTime(shift.end)}
										</>
									)}
								</Paragraph>
							</div>
						))}
				</div>
				<div className='mx-auto mt-24'>
					<Calendar
						value={value}
						view={'month'}
						maxDetail='year'
						className='h-fit'
						onChange={handleMonthChange}
					/>
				</div>
			</div>
		</Container>
	)
}

export default Schedule
