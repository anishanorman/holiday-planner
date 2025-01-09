import express from "express";
import { searchAirlines } from "../services/airlineService";

const router = express.Router();

router.get("/search", async (req, res) => {
	const query = req.query.query as string;

	if (!query) {
		res.status(400).json({ message: "Query parameter is required" });
		return;
	}

	try {
		const airlines = await searchAirlines(query);
		res.status(200).json(airlines);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

export default router;
