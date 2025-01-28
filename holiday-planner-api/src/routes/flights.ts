import express from "express";
import Flight from "../models/Flight";
import { getAirportByIATA, searchAirlines } from "../services/airlineService";
import { ApiError } from "../utils/errors";

interface ReqBody {
	holidayId: number;
	airline?: {
		name: string;
	};
	flightNumber?: string;
	date: string;
	departure?: {
		time?: string;
		place?: string;
		airport?: {
			iata: string;
		};
	};
	arrival?: {
		time?: string;
		place?: string;
		airport?: {
			iata: string;
		};
	};
	booked: boolean;
	duration?: {
		hours: number;
		minutes: number;
	};
	stops?: {
		airport?: {
			iata: string;
		};
		duration: {
			hours: number;
			minutes: number;
		};
	}[];
}

const expandFlightData = async (body: ReqBody) => {
	const arrivalAirport = body.arrival?.airport?.iata
		? await getAirportByIATA(body.arrival.airport.iata)
		: null;

	const departureAirport = body.departure?.airport?.iata
		? await getAirportByIATA(body.departure.airport.iata)
		: null;

	const airline = body.airline?.name
		? await searchAirlines(body.airline.name)
		: null;

	return {
		...body,
		arrival: {
			...body.arrival,
			airport: arrivalAirport,
		},
		departure: {
			...body.departure,
			airport: departureAirport,
		},
		airline: airline,
	};
};

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const body = req.body;

		if (!body.booked) {
			const flight = await Flight.create(body);
			res.status(201).json(flight);
			return;
		}

		const updatedFlightData = await expandFlightData(body);

		const flight = await Flight.create(updatedFlightData);
		res.status(201).json(flight);
		return;
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Error creating new holiday" });
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

export default router;
