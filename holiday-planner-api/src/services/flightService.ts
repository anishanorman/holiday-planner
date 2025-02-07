import { BookedReqBody } from "../types/flight";
import { getFlightDuration } from "../utils/time";
import { searchAirlines } from "./airlineService";
import { getAirportByIATA } from "./airportService";

export const expandFlightData = async (body: BookedReqBody) => {
	const departureAirport = await getAirportByIATA(body.departure.airport.iata);
	const arrivalAirport = await getAirportByIATA(body.arrival.airport.iata);
	const airline = await searchAirlines(body.airline.name);

	const duration = getFlightDuration(
		body.departure.time,
		departureAirport.UTCOffset,
		body.arrival.time,
		arrivalAirport.UTCOffset
	);

	const stops = body.stops
		? await Promise.all(
				body.stops.map(async (stop) => ({
					airport: await getAirportByIATA(stop.airport.iata),
					duration: {
						hours: stop.duration.hours || 0,
						minutes: stop.duration.minutes || 0,
					},
				}))
		  )
		: [];

	return {
		...body,
		departure: { ...body.departure, airport: departureAirport },
		arrival: { ...body.arrival, airport: arrivalAirport },
		airline,
		duration,
		stops,
	};
};
