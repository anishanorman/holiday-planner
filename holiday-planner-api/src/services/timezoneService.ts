import { ApiError } from "../utils/errors";

interface timezoneResponse {
	timezone: string;
	utc_offset: number;
	city: string;
}

export async function getTimezone(latitude: string, longitude: string) {
	const url = `https://api.api-ninjas.com/v1/timezone?lat=${latitude}&lon=${longitude}`;
	const headers = {
		"X-Api-Key": `${process.env.API_NINJAS_API_KEY}`,
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`);
		}
		const data = (await response.json()) as timezoneResponse;

		return data.utc_offset;
	} catch (error) {
		throw new ApiError(404, 'Cannot find timezone information');
	}
}
