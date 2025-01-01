import cors from "cors";
import express from "express";
import holidaysRouter from "./routes/holidays";
import sequelize from "./utils/database";
import seedHolidays from "./scripts/seedHolidays";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/holidays", holidaysRouter);

const initializeDatabase = async () => {
	try {
	  await sequelize.authenticate();
	  console.log('Connection to PostgreSQL established.');
  
	  await sequelize.sync({ force: true });
	  console.log('Database synchronized.');
  
	  await seedHolidays();
	  console.log('Database seeded with initial data.');
	} catch (error) {
	  console.error('Error initializing database:', error);
	  throw error;
	}
  };
  
  initializeDatabase()
	.then(() => {
	  console.log('Database setup completed.');
	  app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	  });
	})
	.catch((error) => {
	  console.error('Failed to initialize application:', error);
	  process.exit(1);
	});
