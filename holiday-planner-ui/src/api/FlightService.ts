import { Flight } from "../utils/types";

export const putFlight = async (id: string, updatedFlightData: Flight) => {
	const response = await fetch(`http://localhost:5000/api/flights/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedFlightData),
	});

	if (!response.ok) {
		throw new Error("An error occurred while updating the flight");
	}

	return response.json();
};

export const postFlight = async (flightData: Flight) => {
	const response = await fetch("http://localhost:5000/api/flights", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(flightData),
	});

	if (!response.ok) {
		throw new Error("An error occurred while updating the flight");
	}

	return response.json();
};
