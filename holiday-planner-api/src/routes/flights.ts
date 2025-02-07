import express from "express";
import Flight from "../models/Flight";
import { expandFlightData } from "../services/flightService";
import { ReqBody } from "../types/flight";
import { ApiError } from "../utils/errors";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const body = req.body;

		if (!body.booked) {
			const flight = await Flight.create(body);
			res.status(201).json(flight);
			return;
		}

		try {
			const updatedFlightData = await expandFlightData(body);
			const flight = await Flight.create(updatedFlightData);
			res.status(201).json(flight);
		} catch (error) {
			if (error instanceof ApiError) {
				res.status(error.status).json({ message: error.message });
				return;
			}
			throw error;
		}
	} catch (error) {
		console.error("Error creating flight:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const body: ReqBody = req.body;

		const flight = await Flight.findByPk(id);

		if (!flight) {
			res.status(404).json({ message: `Flight ${id} not found` });
			return;
		}

		if (!body.booked) {
			await flight.update(body);
			res.status(200).json(flight);
			return;
		}

		try {
			const updatedFlightData = await expandFlightData(body);
			await flight.update(updatedFlightData);
			res.status(200).json(flight);
		} catch (error) {
			if (error instanceof ApiError) {
				res.status(error.status).json({ message: error.message });
				return;
			}
			throw error;
		}
	} catch (error) {
		console.error("Error updating flight:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const flight = await Flight.findByPk(id);

		if (!flight) {
			res.status(404).json({ message: `Flight ${id} not found` });
			return;
		}

		try {
			await flight.destroy();
			res.status(204).end();
		} catch (error) {
			if (error instanceof ApiError) {
				res.status(error.status).json({ message: error.message });
			}
			throw error;
		}
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

export default router;
