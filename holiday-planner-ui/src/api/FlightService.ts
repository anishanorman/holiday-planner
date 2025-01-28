import { Flight } from "../utils/types";

export const putFlight = async (id: string, updatedFlightData: Flight) => {
	try {
		const response = await fetch(`http://localhost:5000/api/flights/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedFlightData),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to update flight");
		}

		return await response.json();
	} catch (error) {
		throw error;
	}
};

export const postFlight = async (flightData: Flight) => {
	try {
		const response = await fetch("http://localhost:5000/api/flights", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(flightData),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to create flight");
		}

		return await response.json();
	} catch (error) {
		throw error;
	}
};

