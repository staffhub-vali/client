import Heading from '../../components/ui/Heading.tsx'
import Container from '../../components/ui/Container.tsx'
import Paragraph from '../../components/ui/Paragraph.tsx'

const DocumentationPage = () => {
	return (
		<Container size='lg'>
			<Heading
				size={'sm'}
				className='w-1/2 border-b-2 pb-4 text-center dark:border-slate-500'>
				Documentation
			</Heading>
			<Heading
				size={'xs'}
				className='mb-3 mt-16'>
				Employees
			</Heading>
			<Paragraph size={'xl'}>
				First thing to do is to create some employees which you can manage. After you have at least 1 employee you can
				create a monthly schedule for that employee. On the employees profile page you can set and edit things like
				notes, vacation, schedules or shift preferences.
			</Paragraph>
			<Heading
				size={'xs'}
				className='mb-3 mt-16'>
				Schedules
			</Heading>
			<Paragraph size={'xl'}>
				Once you have at least 1 employee you can create a monthly schedule for that employee. This schedule will be
				avaliable from the profile page of that employee. There you can print it as PDF to send it to your employee. On
				the dashboard page you will be able to see all the work days for the entire year. There you can easily see if
				there are any notes for a specific work day, and the number of employees that have shifts.
			</Paragraph>
			<Heading
				size={'xs'}
				className='mb-3 mt-16'>
				Work days
			</Heading>
			<Paragraph size={'xl'}>
				By accessing a specific work day from the dashboard, you will see details of that work day. Here you can add or
				edit shifts or notes for that day.
			</Paragraph>
			<Heading
				size={'xs'}
				className='mb-3 mt-16'>
				Shifts
			</Heading>
			<Paragraph size={'xl'}>
				When creating a shift, the correct format is the european format. For example: 09:00 - 17:00.
			</Paragraph>
			<Paragraph size={'xl'}>
				If your shift ends at midnight, you will have to write it as 24:00 and it will instantly change to 00:00 and
				calculate the total hours of the shift. Writing 00:00 yourself will not work.
			</Paragraph>
		</Container>
	)
}

export default DocumentationPage
