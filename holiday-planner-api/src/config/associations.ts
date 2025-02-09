import Accommodation from "../models/Accommodation";
import Flight from "../models/Flight";
import Holiday from "../models/Holiday";

Holiday.hasMany(Flight, { foreignKey: "holidayId", as: "flights" });
Flight.belongsTo(Holiday, { foreignKey: "holidayId", as: "holiday" });

Holiday.hasMany(Accommodation, {
	foreignKey: "holidayId",
	as: "accommodations",
});
Accommodation.belongsTo(Holiday, { foreignKey: "holidayId", as: "holiday" });
