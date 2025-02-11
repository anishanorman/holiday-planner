import express from "express";
import Accommodation from "../models/Accommodation";
import Flight from "../models/Flight";
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

router.get("/:holidayId/flights", async (req, res) => {
	try {
		const { holidayId } = req.params;
		const flights = await Flight.findAll({
			where: { holidayId },
		});

		res.json(flights);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching flights" });
	}
});

router.get("/:holidayId/accommodations", async (req, res) => {
	try {
		const { holidayId } = req.params;
		const accommodations = await Accommodation.findAll({
			where: { holidayId },
		});

		if (!accommodations.length) {
			res
				.status(404)
				.json({ message: "No accommodation found for this holiday" });
			return;
		}

		res.json(accommodations);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching accommodation" });
	}
});

export default router;
