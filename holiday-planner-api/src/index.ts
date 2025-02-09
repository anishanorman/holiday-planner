import cors from "cors";
import express from "express";
import Accommodation from "./models/Accommodation";
import Flight from "./models/Flight";
import Holiday from "./models/Holiday";
import accommodationsRouter from "./routes/accommodations";
import airlinesRouter from "./routes/airlines";
import flightsRouter from "./routes/flights";
import holidaysRouter from "./routes/holidays";
import pexelsRouter from "./routes/pexels";
import sequelize from "./utils/database";
import seedHolidays from "./scripts/seedHolidays";
import { seedFlights } from "./scripts/seedFlights";
import { seedAccommodations } from "./scripts/seedAccommodations";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/holidays", holidaysRouter);
app.use("/api/pexels", pexelsRouter);
app.use("/api/airlines", airlinesRouter);
app.use("/api/flights", flightsRouter);
app.use("/api/accommodations", accommodationsRouter);

const initializeDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection to PostgreSQL established.");

		await sequelize.sync({ force: true });
		console.log("Database synchronized.");
		Holiday.hasMany(Flight, {
			foreignKey: "holidayId",
			as: "flights",
		});

		Flight.belongsTo(Holiday, {
			foreignKey: "holidayId",
			as: "holiday",
		});

		Holiday.hasMany(Accommodation, {
			foreignKey: "holidayId",
			as: "accommodations",
		});

		Accommodation.belongsTo(Holiday, {
			foreignKey: "holidayId",
			as: "holiday",
		});

		await seedHolidays();
		await seedFlights();
		await seedAccommodations();

		console.log("Database seeded with initial data.");
	} catch (error) {
		console.error("Error initializing database:", error);
		throw error;
	}
};

initializeDatabase()
	.then(() => {
		console.log("Database setup completed.");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to initialize application:", error);
		process.exit(1);
	});
