export function convertHourStringToMinutes(hourString: string) {
	const [hour, min] = hourString.split(':').map(Number);
	return hour * 60 + min;
}
