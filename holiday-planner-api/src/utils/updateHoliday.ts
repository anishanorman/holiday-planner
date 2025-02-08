import Flight from "../models/Flight";
import Holiday from "../models/Holiday";

export const updateHolidayTimestamp = async (flight: Flight) => {
	try {
		const holiday = await Holiday.findByPk(flight.holidayId);
		if (!holiday) {
			console.error(`Holiday with ID ${flight.holidayId} not found`);
			return;
		}
		holiday.changed('updatedAt', true);
		await holiday.update({
			updatedAt: new Date(),
		});
	} catch (error) {
		console.error("Error updating holiday timestamp:", error);
	}
};