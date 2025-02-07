import { ApiError } from "./errors";

export const getFlightDuration = (
	depTime: string,
	depOffset: number,
	arrTime: string,
	arrOffset: number
) => {
	const offsetToMinutes = (offset: number) => offset / 60;

	const depLocal = new Date(depTime);
	const arrLocal = new Date(arrTime);

	const depUTC = new Date(
		depLocal.getTime() - offsetToMinutes(depOffset) * 60000
	);
	const arrUTC = new Date(
		arrLocal.getTime() - offsetToMinutes(arrOffset) * 60000
	);

	if (arrUTC < depUTC) {
		throw new ApiError(400, "Arrival time cannot be before departure time.");
	}

	let durationMinutes = (arrUTC.getTime() - depUTC.getTime()) / 60000;

	const hours = Math.floor(durationMinutes / 60);
	const minutes = durationMinutes % 60;

	return { hours, minutes };
};
