import fetch from "node-fetch";
import { AirlineResponse, DefaultAirline } from "../types/airline";

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
				logoUrl:
					"https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
			};
		}

		for (let airline of data) {
			if (airline.name && airline.logo_url) {
				return {
					name: airline.name,
					logoUrl: airline.logo_url,
				};
			}
		}
		return {
			name: `${query} (Unknown)`,
			logoUrl:
				"https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
		};
	} catch (error) {
		console.error("Error fetching airline data:", error);
		return {
			name: `${query} (Unknown)`,
			logoUrl:
				"https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
		};
	}
}
