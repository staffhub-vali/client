import { FC, useState } from 'react'
import ScheduleMaker from '../../components/Schedule/ScheduleMaker'

interface NewSchedulePageProps {}

const NewSchedulePage: FC<NewSchedulePageProps> = ({}) => {
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div
			onClick={() => (isOpen ? setIsOpen(false) : null)}
			className='flex h-full w-screen flex-col items-center pb-16 pt-24'>
			<ScheduleMaker
				id={id}
				name={name}
				setId={setId}
				isOpen={isOpen}
				setName={setName}
				setIsOpen={setIsOpen}
			/>
		</div>
	)
}

export default NewSchedulePage
