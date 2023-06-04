import { FC, useState, useEffect } from 'react'
import { WorkDay } from '../../pages/Dashboard/DashboardPage'
import { formatDate, formatDay } from '../../utils/DateFormatting'
import { useNavigate } from 'react-router-dom'
import Heading from '../ui/Heading'
import Paragraph from '../ui/Paragraph'

interface DashboardProps {
	data: WorkDay[]
}

const Dashboard: FC<DashboardProps> = ({ data }) => {
	const navigate = useNavigate()

	const weekDays: any = {
		Monday: [],
		Tuesday: [],
		Wednesday: [],
		Thursday: [],
		Friday: [],
		Saturday: [],
		Sunday: [],
	}

	data.forEach((day) => {
		weekDays[formatDay(day.date)].push(day)
	})

	const firstOfTheMonth = formatDay(data[0].date)

	return (
		<div className='flex space-x-24 text-center'>
			<div>
				<Heading
					size={'xs'}
					className='my-6'>
					Monday
				</Heading>
				{weekDays.Monday.map((day: WorkDay, index: number) => (
					<Paragraph
						size={'xl'}
						className='cursor-pointer py-2 hover:text-sky-500'
						onClick={() => navigate(`/days/${day._id}`)}>
						{formatDate(day.date)}
					</Paragraph>
				))}
			</div>
			<div>
				<Heading
					size={'xs'}
					className='my-6'>
					Tuesday
				</Heading>
				{weekDays.Tuesday.map((day: WorkDay) => (
					<Paragraph
						size={'xl'}
						className='cursor-pointer py-2 hover:text-sky-500'
						onClick={() => navigate(`/days/${day._id}`)}>
						{formatDate(day.date)}
					</Paragraph>
				))}
			</div>
			<div>
				<Heading
					size={'xs'}
					className='my-6'>
					Wednesday
				</Heading>
				{weekDays.Wednesday.map((day: WorkDay) => (
					<Paragraph
						size={'xl'}
						className='cursor-pointer py-2 hover:text-sky-500'
						onClick={() => navigate(`/days/${day._id}`)}>
						{formatDate(day.date)}
					</Paragraph>
				))}
			</div>
			<div>
				<Heading
					size={'xs'}
					className='my-6'>
					Thursday
				</Heading>
				{weekDays.Thursday.map((day: WorkDay) => (
					<Paragraph
						size={'xl'}
						className='cursor-pointer py-2 hover:text-sky-500'
						onClick={() => navigate(`/days/${day._id}`)}>
						{formatDate(day.date)}
					</Paragraph>
				))}
			</div>
			<div>
				<Heading
					size={'xs'}
					className='my-6'>
					Friday
				</Heading>
				{weekDays.Friday.map((day: WorkDay) => (
					<Paragraph
						size={'xl'}
						className='cursor-pointer py-2 hover:text-sky-500'
						onClick={() => navigate(`/days/${day._id}`)}>
						{formatDate(day.date)}
					</Paragraph>
				))}
			</div>
			<div>
				<Heading
					size={'xs'}
					className='my-6'>
					Saturday
				</Heading>
				{weekDays.Saturday.map((day: WorkDay) => (
					<Paragraph
						size={'xl'}
						className='cursor-pointer py-2 hover:text-sky-500'
						onClick={() => navigate(`/days/${day._id}`)}>
						{formatDate(day.date)}
					</Paragraph>
				))}
			</div>
			<div>
				<Heading
					size={'xs'}
					className='my-6'>
					Sunday
				</Heading>
				{weekDays.Sunday.map((day: WorkDay) => (
					<Paragraph
						size={'xl'}
						className='cursor-pointer py-2 hover:text-sky-500'
						onClick={() => navigate(`/days/${day._id}`)}>
						{formatDate(day.date)}
					</Paragraph>
				))}
			</div>
		</div>
	)
}
export default Dashboard
