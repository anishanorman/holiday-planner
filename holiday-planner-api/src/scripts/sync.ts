import Holiday from "../models/Holiday";
import sequelize from "../utils/database";
import seedHolidays from "./seedHolidays";

const syncDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection to PostgreSQL established.");

		await sequelize.sync({ force: true });
		console.log("Database synchronized.");

    await seedHolidays();
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	} finally {
		await sequelize.close();
	}
};

syncDatabase();
