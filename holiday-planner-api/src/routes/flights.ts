import express from "express";
import Flight from "../models/Flight";
import { getAirportByIATA, searchAirlines } from "../services/airlineService";
import { ApiError } from "../utils/errors";

interface BookedReqBody {
	holidayId: number;
	airline: {
		name: string;
	};
	flightNumber: string;
	date: string;
	departure: {
		time: string;
		place: string;
		airport: {
			iata: string;
		};
	};
	arrival: {
		time: string;
		place: string;
		airport: {
			iata: string;
		};
	};
	booked: true;
	duration: {
		hours: number;
		minutes: number;
	};
	stops?: {
		airport: {
			iata: string;
		};
		duration: {
			hours: number;
			minutes: number;
		};
	}[];
}

interface UnbookedReqBody {
	holidayId: number;
	date: string;
	departure: {
		place: string;
	};
	arrival: {
		place: string;
	};
	booked: false;
}

type ReqBody = BookedReqBody | UnbookedReqBody;

const getFlightDuration = (
	depTime: string,
	depOffset: number,
	arrTime: string,
	arrOffset: number
) => {
	const offsetToMinutes = (offset: number) => offset / 60;

	const depLocal = new Date(depTime);
	const arrLocal = new Date(arrTime);

	const depUTC = new Date(
		depLocal.getTime() - offsetToMinutes(depOffset) * 60000
	);
	const arrUTC = new Date(
		arrLocal.getTime() - offsetToMinutes(arrOffset) * 60000
	);

	if (arrUTC < depUTC) {
		throw new ApiError(400, "Arrival time cannot be before departure time.");
	}

	let durationMinutes = (arrUTC.getTime() - depUTC.getTime()) / 60000;

	const hours = Math.floor(durationMinutes / 60);
	const minutes = durationMinutes % 60;

	return { hours, minutes };
};

const expandFlightData = async (body: BookedReqBody) => {
	const departureAirport = await getAirportByIATA(body.departure.airport.iata);

	const arrivalAirport = await getAirportByIATA(body.arrival.airport.iata);

	const airline = await searchAirlines(body.airline.name);

	const duration = getFlightDuration(
		body.departure?.time,
		departureAirport?.UTCOffset,
		body.arrival?.time,
		arrivalAirport?.UTCOffset
	);

	const stops = body.stops
		? await Promise.all(
				body.stops.map(async (stop) => {
					const airport = await getAirportByIATA(stop.airport.iata);

					return {
						airport: airport,
						duration: {
							hours: stop.duration.hours || 0,
							minutes: stop.duration.minutes || 0,
						},
					};
				})
		  )
		: [];

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
		duration: duration,
		stops: stops || [],
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
