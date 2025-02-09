import Accommodation from "../models/Accommodation";
import Flight from "../models/Flight";
import Holiday from "../models/Holiday";

export const updateHolidayTimestamp = async (item: Flight | Accommodation) => {
	try {
		const holiday = await Holiday.findByPk(item.holidayId);
		if (!holiday) {
			console.error(`Holiday with ID ${item.holidayId} not found`);
			return;
		}
		holiday.changed("updatedAt", true);
		await holiday.update({
			updatedAt: new Date(),
		});
	} catch (error) {
		console.error("Error updating holiday timestamp:", error);
	}
};
