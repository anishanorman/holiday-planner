import { AirportResponse } from "../types/airport";
import { ApiError } from "../utils/errors";
import { getTimezone } from "./timezoneService";

export async function getAirportByIATA(
	query: string
): Promise<AirportResponse> {
	const url = `https://api.api-ninjas.com/v1/airports?iata=${query}`;
	const headers = {
		"X-Api-Key": `${process.env.API_NINJAS_API_KEY}`,
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new ApiError(
				response.status,
				`Request failed with status: ${response.status}`
			);
		}

		const data = (await response.json()) as AirportResponse[];

		if (!data || data.length === 0) {
			throw new ApiError(404, `Airport with code '${query}' not found.`);
		}

		const UTCOffset = await getTimezone(data[0].latitude, data[0].longitude);

		const result = {
			iata: data[0].iata,
			name: data[0].name,
			city: data[0].city,
			region: data[0].region,
			country: data[0].country,
			latitude: data[0].latitude,
			longitude: data[0].longitude,
			UTCOffset,
		};

		return result;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		console.error("Error fetching airport data:", error);
		throw new ApiError(
			500,
			"Internal server error while fetching airport data."
		);
	}
}

export async function getAirportsByCity(query: string) {
	const url = `https://api.api-ninjas.com/v1/airports?city=${query}`;
	const headers = {
		"X-Api-Key": `${process.env.API_NINJAS_API_KEY}`,
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`);
		}

		const data = (await response.json()) as AirportResponse[];

		const result = data.map((airport) => ({
			iata: airport.iata,
			name: airport.name,
			city: airport.city,
			region: airport.region,
			country: airport.country,
			latitude: airport.latitude,
			longitude: airport.longitude,
		}));

		return result;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}
