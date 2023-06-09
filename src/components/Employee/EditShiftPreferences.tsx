import { Dispatch, FC, SetStateAction } from 'react'

interface EditShiftPreferencesProps {
	data: {
		_id: string
		name: string
		email: string
		phone: string
		notes: string[]
		shiftPreferences: string[]
		vacationDays: number | string
	}
	setEdit: Dispatch<SetStateAction<boolean>>
}

const EditShiftPreferences: FC<EditShiftPreferencesProps> = ({ data, setEdit }) => {
	return <div></div>
}

export default EditShiftPreferences
