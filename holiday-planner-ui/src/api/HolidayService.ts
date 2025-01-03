import { NewHolidayFormValues } from "../components/newHolidayForm/NewHolidayForm";

export const getHolidays = async () => {
	const response = await fetch("http://localhost:5000/api/holidays");
	if (!response.ok) {
		throw new Error("An error occurred while fetching the holidays data");
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
