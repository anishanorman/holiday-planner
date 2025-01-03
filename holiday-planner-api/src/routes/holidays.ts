import express from "express";
import Holiday from "../models/Holiday";

const router = express.Router();

router.get("/", async (_, res) => {
	try {
		const holidays = await Holiday.findAll({
			attributes: ["id", "title", "startDate", "endDate", "image", "updatedAt"],
		});
		res.json(holidays);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching holidays" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const holiday = await Holiday.findByPk(req.params.id);
		if (!holiday) {
			res.status(404).json({ message: "Holiday not found" });
			return;
		}
		res.json(holiday);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching holiday details" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { title, startDate, endDate, image } = req.body;

		const holiday = await Holiday.create({
			title,
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			image,
		});

		res.status(201).json(holiday);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Error creating new holiday" });
	}
});

export default router;
