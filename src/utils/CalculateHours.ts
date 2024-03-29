interface Shift {
	start: number
	end: number
}

interface WorkDay {
	start?: number
	end?: number
	total?: number
	date: number
	shifts: Shift[]
}

export const calculateTotalHours = (days: WorkDay[] | any) => {
	const totalHours = days.reduce((acc: number, day: WorkDay) => {
		const dayHours = day.shifts.reduce((dayAcc: number, shift: Shift) => {
			if (shift.start && shift.end) {
				const start = shift.start
				const end = shift.end
				const hours = (end - start) / 3600
				return dayAcc + hours
			} else {
				return dayAcc // Skip shifts without start and end properties
			}
		}, 0)
		return acc + dayHours
	}, 0)
	return totalHours
}

export const calculateTotalMonthlyHours = (days: any) => {
	const totalMinutes = days.reduce((acc: number, day: any) => {
		if (day.start && day.end) {
			const start = day.start
			const end = day.end
			const seconds = end - start
			const minutes = seconds / 60
			return acc + minutes
		}
		return acc
	}, 0)

	const hours = Math.floor(totalMinutes / 60)
	const minutes = Math.floor(totalMinutes % 60)

	const formattedTime = `${hours}h ${minutes}min`
	return formattedTime
}
