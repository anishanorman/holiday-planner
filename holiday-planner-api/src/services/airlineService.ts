import fetch from "node-fetch";
import { ApiError } from "../utils/errors";
import { getTimezone } from "./timezoneService";

interface AirlineResponse {
	iata: string;
	icao: string;
	fleet: {
		total: number;
		[key: string]: number;
	};
	logo_url: string;
	name: string;
}

interface AirportResponse {
	iata: string;
	city: string;
	country: string;
	name: string;
	region: string;
	latitude: string;
	longitude: string;
	UTCOffset: number;
}

interface DefaultAirline {
	name: string;
	logoUrl: string;
}

export async function getSingleAirline(query: string) {
	const url = `https://api.api-ninjas.com/v1/airlines?name=${query}`;
	const headers = {
		"X-Api-Key": `${process.env.API_NINJAS_API_KEY}`,
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`);
		}
		const data = (await response.json()) as AirlineResponse[];

		return {
			name: data[0].name,
			logoUrl: data[0].logo_url,
		};
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

export async function searchAirlines(
	query: string
): Promise<AirlineResponse | DefaultAirline> {
	const url = `https://api.api-ninjas.com/v1/airlines?name=${query}`;
	const headers = {
		"X-Api-Key": `${process.env.API_NINJAS_API_KEY}`,
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`);
		}

		const data = (await response.json()) as AirlineResponse[];

		if (!data || data.length === 0) {
			return {
				name: `${query} (Unknown)`,
				logoUrl: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
			};
		}

		return {
			name: data[0].name,
			logoUrl: data[0].logo_url,
		};
	} catch (error) {
		console.error("Error fetching airline data:", error);
		return {
			name: `${query} (Unknown)`,
			logoUrl: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
		};
	}
}

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
			throw new ApiError(response.status, `Request failed with status: ${response.status}`)
		}

		const data = (await response.json()) as AirportResponse[];

		if (!data || data.length === 0) {
			throw new ApiError(404, `Airport with code '${query}' not found.`);
		}

		const UTCOffset = await getTimezone(data[0].latitude, data[0].longitude)

		const result = {
			iata: data[0].iata,
			name: data[0].name,
			city: data[0].city,
			region: data[0].region,
			country: data[0].country,
			latitude: data[0].latitude,
			longitude: data[0].longitude,
			UTCOffset
		};

		return result;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		console.error("Error fetching airport data:", error);
		throw new ApiError(500, "Internal server error while fetching airport data.");
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
