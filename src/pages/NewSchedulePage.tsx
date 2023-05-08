import { FC, useState } from 'react'
import NewScheduleSearch from '../components/NewScheduleSearch'
import ScheduleMaker from '../components/ScheduleMaker'

interface NewSchedulePageProps {}

const NewSchedulePage: FC<NewSchedulePageProps> = ({}) => {
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div
			onClick={() => (isOpen ? setIsOpen(false) : null)}
			className='flex h-screen w-screen flex-col items-center pb-16 pt-24'>
			<NewScheduleSearch
				name={name}
				setId={setId}
				isOpen={isOpen}
				setName={setName}
				setIsOpen={setIsOpen}
			/>
			{name && (
				<ScheduleMaker
					id={id}
					name={name}
				/>
			)}
		</div>
	)
}

export default NewSchedulePage
