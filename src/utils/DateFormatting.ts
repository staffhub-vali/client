export function formatDate(unixTimestamp: number) {
	const date = new Date(unixTimestamp * 1000)

	const year = date.getFullYear()
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')

	return `${day}/${month}/${year}`
}

export function formatTime(unixTimestamp: number) {
	if (unixTimestamp) {
		const date = new Date(unixTimestamp * 1000)

		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')

		return `${hours}:${minutes}`
	}
}
