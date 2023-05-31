import { formatDate, formatTime, formatDay } from '../DateFormatting'

describe('formatDate', () => {
	it('should format unix code to european date format', () => {
		expect(formatDate(1617168000)).toBe('31/03/2021')
	})

	it('should format a unix code to european date format', () => {
		expect(formatDate(1625097600)).toBe('01/07/2021')
	})

	it('should format the minimum unix code value to european date format', () => {
		expect(formatDate(0)).toBe('01/01/1970')
	})

	it('should format the maximum unix code value to european date format', () => {
		expect(formatDate(2147483647)).toBe('19/01/2038')
	})
})

describe('formatTime', () => {
	it('should format unix code to european time format', () => {
		expect(formatTime(1617168000)).toBe('07:20')
	})

	it('should format a different unix code to european time format', () => {
		expect(formatTime(1625097600)).toBe('02:00')
	})

	it('should format the maximum unix code value to european time format', () => {
		expect(formatTime(2147483647)).toBe('04:14')
	})

	it('should ignore the date portion of the unix code and format the time to european time format', () => {
		expect(formatTime(1617168000123)).toBe('06:22')
	})

	it('should format a unix code representing a different time of day to european time format', () => {
		expect(formatTime(1617204000)).toBe('17:20')
	})
})

describe('formatDay', () => {
	it('should format unix code to a day of the week ', () => {
		expect(formatDay(1617168000)).toBe('Wednesday')
		expect(formatDay(1625097600)).toBe('Thursday')
		expect(formatDay(1617716000)).toBe('Tuesday')
	})
})
