import { FC, useState } from 'react'
import NewScheduleSearch from '../components/NewScheduleSearch'
import ScheduleMaker from '../components/ScheduleMaker'

interface NewSchedulePageProps {}

const NewSchedulePage: FC<NewSchedulePageProps> = ({}) => {
	const [value, setValue] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div
			onClick={() => (isOpen ? setIsOpen(false) : null)}
			className='flex h-screen w-screen flex-col items-center pb-16 pt-24'>
			<NewScheduleSearch
				value={value}
				setValue={setValue}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			{value && <ScheduleMaker value={value} />}
		</div>
	)
}

export default NewSchedulePage
