import "../config/associations";
import { seedAccommodations } from "../seeds/seedAccommodations";
import { seedFlights } from "../seeds/seedFlights";
import seedHolidays from "../seeds/seedHolidays";
import sequelize from "./database";

export const initializeDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("✅ Connected to PostgreSQL");

		await sequelize.sync({ force: true });
		console.log("🔄 Database synchronized");

		await seedHolidays();
		await seedFlights();
		await seedAccommodations();
		console.log("🌱 Database seeded with initial data.");
	} catch (error) {
		console.error("❌ Error initializing database:", error);
		throw error;
	}
};
