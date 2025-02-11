import { NewHolidayFormValues } from "../components/newHolidayForm/NewHolidayForm";
import { Holiday } from "../utils/types";

export const getHolidays = async () => {
	const response = await fetch("http://localhost:5000/api/holidays");
	if (!response.ok) {
		throw new Error("An error occurred while fetching the holidays data");
	}

	const data: Holiday[] = await response.json();

	const result = data.sort((a: Holiday, b: Holiday) => {
		return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
	});

	return result;
};

export const getHoliday = async (id: string): Promise<Holiday> => {
	const response = await fetch(`http://localhost:5000/api/holidays/${id}`);
	if (!response.ok) {
		throw new Error("An error occured while fetching the holiday");
	}

	return await response.json();
};

export const postHoliday = async (values: NewHolidayFormValues) => {
	const response = await fetch("http://localhost:5000/api/holidays", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: values.title,
			startDate: values.startDate,
			endDate: values.endDate,
			image: values.selectedImage,
		}),
	});

	if (!response.ok) {
		throw new Error("An error occurred while creating the holiday");
	}

	return response.json();
};

export const getFlightsByHolidayId = async (holidayId: string) => {
	try {
		const response = await fetch(
			`http://localhost:5000/api/holidays/${holidayId}/flights`
		);
		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message ||
					`Failed to get flights associated with holidayId ${holidayId}`
			);
		}
		return await response.json();
	} catch (error) {
		throw error;
	}
};

export const getAccommodationsByHolidayId = async (holidayId: string) => {
	try {
		const response = await fetch(
			`http://localhost:5000/api/holidays/${holidayId}/accommodations`
		);
		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message ||
					`Failed to get accommodations associated with holidayId ${holidayId}`
			);
		}
		return await response.json();
	} catch (error) {
		throw error;
	}
};
