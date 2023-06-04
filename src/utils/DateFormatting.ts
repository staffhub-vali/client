export function formatDate(unixTimestamp: number) {
	const date = new Date(unixTimestamp * 1000)

	const year = date.getFullYear()
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')

	return `${day}/${month}/${year}`
}

export function formatDay(unixTimestamp: number) {
	const date = new Date(unixTimestamp * 1000)

	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	const weekday = weekdays[date.getDay()]

	return `${weekday}`
}

export function formatMonth(unixTimestamp: number) {
	const date = new Date(unixTimestamp * 1000)

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	const month = months[date.getMonth()]
	const year = date.getFullYear()

	return `${month} ${year}`
}

export function formatTime(unixTimestamp: number | null) {
	if (unixTimestamp) {
		const date = new Date(unixTimestamp * 1000)

		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')

		return `${hours}:${minutes}`
	}
}

export function formatTotal(start: number | null, end: number | null) {
	if (start && end) {
		const totalSeconds = end - start
		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)

		let result = ''

		if (hours > 0) {
			result += `${hours}h `
		}

		if (minutes > 0) {
			result += `${minutes}min`
		}

		return result
	} else return `${0}h ${0}min`
}
