interface Shift {
	start: number
	end: number
}

interface WorkDay {
	start?: number
	end?: number
	total?: number
	date: number
}

export const calculateMonthlyHours = (shifts: Shift[]) => {
	const now = new Date()
	const currentMonth = now.getMonth()

	const totalHours = shifts.reduce((acc: number, shift: Shift) => {
		const start = shift.start
		const end = shift.end

		// Convert start and end timestamps to date objects
		const startDate = new Date(start * 1000)
		const endDate = new Date(end * 1000)

		// Check if the shift falls within the current month
		if (startDate.getMonth() === currentMonth && endDate.getMonth() === currentMonth) {
			const hours = (end - start) / 3600
			return acc + hours
		}

		return acc
	}, 0)

	return totalHours
}

export const calculateTotalHours = (shifts: Shift[] | any) => {
	const totalHours = shifts.reduce((acc: number, shift: Shift) => {
		if (shift.start && shift.end) {
			const start = shift.start
			const end = shift.end
			const hours = (end - start) / 3600
			return acc + hours
		} else {
			return acc // Skip shifts without start and end properties
		}
	}, 0)
	return totalHours
}
