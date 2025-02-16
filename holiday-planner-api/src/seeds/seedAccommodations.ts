import Accommodation from "../models/Accommodation";

export const seedAccommodations = async () => {
	const accommodations = [
		{
			holidayId: 2,
			name: "Hotel Fancy",
			booked: true,
			bookingReference: "00000000",
			checkIn: "2024-06-01",
			checkOut: "2024-06-17",
			location: "Auckland",
		},
		{
			holidayId: 2,
			name: "Hotel Fancier",
			booked: true,
			bookingReference: "12345678",
			checkIn: "2024-06-17",
			checkOut: "2024-06-18",
			location: "Hobbiton",
		},
		{
			holidayId: 2,
			booked: false,
			checkIn: "2024-06-20",
			checkOut: "2024-06-21",
			location: "Auckland",
		},
	];

	try {
		await Accommodation.bulkCreate(accommodations, { validate: true });
		console.log("Seeded accommodation successfully.");
	} catch (error) {
		console.error("Error seeding accommodation:", error);
	}
};
