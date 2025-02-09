import { initializeDatabase } from "./config/initializeDatabase";
import { app } from "./server";

const PORT = process.env.PORT || 5000;

initializeDatabase()
	.then(() => {
		console.log("🚀 Database setup completed.");
		app.listen(PORT, () => {
			console.log(`🌍 Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("❌ Failed to initialize application:", error);
		process.exit(1);
	});
