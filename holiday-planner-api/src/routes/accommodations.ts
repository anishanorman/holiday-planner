import express from "express";
import Accommodation from "../models/Accommodation";
import { ApiError } from "../utils/errors";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const body = req.body;

		try {
			const accommodation = await Accommodation.create(body);
			res.status(201).json(accommodation);
		} catch (error) {
			if (error instanceof ApiError) {
				res.status(error.status).json({ message: error.message });
				return;
			}
			throw error;
		}
	} catch (error) {
		console.error("Error creating accommodation:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;

		const accommodation = await Accommodation.findByPk(id);

		if (!accommodation) {
			res.status(404).json({ message: `Accommodation ${id} not found` });
			return;
		}

		try {
			await accommodation.update(body);
			res.status(200).json(accommodation);
		} catch (error) {
			if (error instanceof ApiError) {
				res.status(error.status).json({ message: error.message });
				return;
			}
			throw error;
		}
	} catch (error) {
		console.error("Error updating accommodation:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const accommodation = await Accommodation.findByPk(id);

		if (!accommodation) {
			res.status(404).json({ message: `Accommodation ${id} not found` });
			return;
		}

		try {
			await accommodation.destroy();
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
