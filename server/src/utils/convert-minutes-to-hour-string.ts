export function convertMinutesToHourString(minutes: number) {
	let hour = Math.floor(minutes / 60);
	let min = minutes % 60;
	return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}
