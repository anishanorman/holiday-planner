import Flight from "../models/Flight";

export const seedFlights = async () => {
	const flights = [
		{
			holidayId: 3,
			airline: {
				name: "easyJet",
				logoUrl: "https://api-ninjas.com/images/airline_logos/easyjet.jpg",
			},
			flightNumber: "EZ 609",
			date: "2024-12-15",
			departure: {
				place: "Bristol",
				time: "2024-12-15T18:00:00Z",
				airport: {
					iata: "BRS",
					name: "Bristol International Airport",
					city: "Bristol",
					region: "England",
					country: "GB",
					latitude: "51.3827018738",
					longitude: "-2.7190899849",
				},
			},
			arrival: {
				place: "Rome",
				time: "2024-12-16T08:00:00Z",
				airport: {
					iata: "FCO",
					name: "Leonardo Da Vinci (Fiumicino) International Airport",
					city: "Rome",
					region: "Latium",
					country: "IT",
					latitude: "41.8045005798",
					longitude: "12.2508001328",
				},
			},
			booked: true,
			duration: {
				hours: 14,
				minutes: 0,
			},
			stops: [
				{
					airport: {
						iata: "ATH",
						name: "Athens International Airport",
						city: "Athens",
						region: "Attica",
						country: "GR",
						latitude: "37.9364013672",
						longitude: "23.9444999695",
					},
					duration: {
						hours: 9,
						minutes: 30,
					},
				},
			],
		},
		{
			holidayId: 3,
			date: "2024-12-30",
			arrival: {
				place: "Bristol",
			},
			departure: {
				place: "Rome",
			},
			booked: false,
		},
		{
			holidayId: 1,
			airline: {
				name: "Aegean Airlines",
				logoUrl:
					"https://api-ninjas.com/images/airline_logos/aegean_airlines.jpg",
			},
			flightNumber: "A3 453",
			date: "2024-07-10",
			departure: {
				place: "London",
				time: "2024-07-10T08:00:00Z",
				airport: {
					iata: "LGW",
					name: "London Gatwick Airport",
					city: "London",
					region: "England",
					country: "GB",
					latitude: "51.1481018066",
					longitude: "-0.1902779937",
				},
			},
			arrival: {
				place: "Santorini",
				time: "2024-07-10T14:00:00Z",
				airport: {
					iata: "JTR",
					name: "Santorini Airport",
					city: "Santorini Island",
					region: "South Aegean",
					country: "GR",
					latitude: "36.3992004395",
					longitude: "25.4792995453",
				},
			},
			booked: true,
			duration: {
				hours: 6,
				minutes: 0,
			},
			stops: [
				{
					airport: {
						iata: "ATH",
						name: "Athens International Airport",
						city: "Athens",
						region: "Attica",
						country: "GR",
						latitude: "37.9364013672",
						longitude: "23.9444999695",
					},
					duration: {
						hours: 1,
						minutes: 30,
					},
				},
			],
		},
	];

	try {
		await Flight.bulkCreate(flights, { validate: true });
		console.log("Seeded flights successfully.");
	} catch (error) {
		console.error("Error seeding flights:", error);
	}
};
