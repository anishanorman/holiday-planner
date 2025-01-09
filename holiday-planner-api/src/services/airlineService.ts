import fetch from "node-fetch";

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
	icao: string;
	city: string;
	country: string;
	name: string;
	region: string;
	elevation_ft: string;
	latitude: string;
	longitude: string;
	timezone: string;
}

interface DefaultAirport {
	iata: string;
	name: string;
	city: string;
	region: string;
	country: string;
	latitude: string;
	longitude: string;
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
				name: "Unknown Airline",
				logoUrl: "default-logo.png",
			};
		}

		return {
			name: data[0].name,
			logoUrl: data[0].logo_url,
		};
	} catch (error) {
		console.error("Error fetching airline data:", error);
		return {
			name: "Unknown Airline",
			logoUrl: "default-logo.png",
		};
	}
}

export async function getAirportByIATA(
	query: string
): Promise<AirportResponse | DefaultAirport> {
	const url = `https://api.api-ninjas.com/v1/airports?iata=${query}`;
	const headers = {
		"X-Api-Key": `${process.env.API_NINJAS_API_KEY}`,
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`);
		}

		const data = (await response.json()) as AirportResponse[];

		if (!data || data.length === 0) {
			return {
				iata: "UNKNOWN",
				name: "Unknown Airport",
				city: "Unknown City",
				region: "Unknown Region",
				country: "Unknown Country",
				latitude: "0.0",
				longitude: "0.0",
			};
		}

		const result = {
			iata: data[0].iata,
			name: data[0].name,
			city: data[0].city,
			region: data[0].region,
			country: data[0].country,
			latitude: data[0].latitude,
			longitude: data[0].longitude,
		};

		return result;
	} catch (error) {
		console.error("Error fetching airport data:", error);
		return {
			iata: "UNKNOWN",
			name: "Unknown Airport",
			city: "Unknown City",
			region: "Unknown Region",
			country: "Unknown Country",
			latitude: "0.0",
			longitude: "0.0",
		};
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
