import express from "express";
import Flight from "../models/Flight";
import { getAirportByIATA, searchAirlines } from "../services/airlineService";

interface ReqBody {
	holidayId: number;
	airline?: {
		name: string; // Airline name, e.g., 'EasyJet'
	};
	flightNumber?: string; // Flight number, e.g., 'EZ404'
	date: string; // Flight date, e.g., '2025-08-03'
	departure?: {
		time?: string; // Departure time, e.g., '2025-08-03T08:00:00Z'
		place?: string; // Departure city or place name
		airport?: {
			iata: string; // Departure airport IATA code, e.g., 'BRS'
		};
	};
	arrival?: {
		time?: string; // Arrival time, e.g., '2025-08-03T12:00:00Z'
		place?: string; // Arrival city or place name
		airport?: {
			iata: string; // Arrival airport IATA code, e.g., 'LGW'
		};
	};
	booked: boolean; // Indicates if the flight is booked
	duration?: {
		hours: number; // Flight duration in hours
		minutes: number; // Flight duration in minutes
	};
	stops?: {
		airport?: {
			iata: string; // Stop airport IATA code, e.g., 'MAN'
		};
		duration: {
			hours: number; // Stop duration in hours
			minutes: number; // Stop duration in minutes
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

		const updatedFlightData = await expandFlightData(body);

		flight.update(updatedFlightData);
		res.status(200).json(flight);
		return;
	} catch (error) {
		console.error("Error updating flight:", error);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
});

export default router;
