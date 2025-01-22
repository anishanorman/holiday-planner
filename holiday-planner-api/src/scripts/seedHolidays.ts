import Holiday from "../models/Holiday";

const seedHolidays = async () => {
	const holidays = [
		{
			title: "Summer in Santorini",
			startDate: "2024-07-10",
			endDate: "2024-07-20",
			image: {
				photographer: "Aleksandar Pasaric",
				photographerUrl: "https://www.pexels.com/@apasaric",
				src: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
				alt: "White Concrete House Near Body of Water Under White and Blue Cloudy Sky",
			},
			accommodation: {
				complete: true,
				details: [
					{
						name: "Santorini Luxury Suites",
						checkIn: "2024-07-10",
						checkOut: "2024-07-20",
						location: "Santorini, Greece",
						booked: true,
					},
				],
			},
			activities: [
				{
					name: "Catamaran Sunset Cruise",
					booked: true,
					date: "2024-07-12",
					location: "Santorini Marina",
					needToBook: false,
				},
				{
					name: "Wine Tasting Tour",
					booked: false,
					date: null,
					location: "Santorini Vineyards",
					needToBook: true,
				},
			],
		},
		{
			title: "Tropical Escape",
			startDate: "2024-06-01",
			endDate: "2024-06-21",
			image: {
				photographer: "Mohamed Sarim",
				photographerUrl: "https://www.pexels.com/@sarimphotos",
				src: "https://images.pexels.com/photos/1033729/pexels-photo-1033729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
				alt: "Dirt Road Surrounded by Trees",
			},
			accommodation: {
				complete: true,
				details: [
					{
						name: "Tropical Beach Resort",
						checkIn: "2024-06-01",
						checkOut: "2024-06-21",
						location: "Maldives",
						booked: true,
					},
				],
			},
			activities: [
				{
					name: "Scuba Diving",
					booked: true,
					date: "2024-06-05",
					location: "Coral Reef Dive Center",
					needToBook: false,
				},
				{
					name: "Island Hopping",
					booked: false,
					date: null,
					location: "Various Islands",
					needToBook: true,
				},
			],
		},
		{
			title: "Rome",
			startDate: "2024-12-15",
			endDate: "2024-12-30",
			image: {
				photographer: "Chait Goli",
				photographerUrl: "https://www.pexels.com/@chaitaastic",
				src: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
				alt: "Colosseum, Italy",
			},
			accommodation: {
				complete: false,
				details: [],
			},
			activities: [
				{
					name: "Colosseum Guided Tour",
					booked: true,
					date: "2024-12-18",
					location: "Colosseum, Rome",
					needToBook: false,
				},
				{
					name: "Vatican Museum Visit",
					booked: true,
					date: "2024-12-20",
					location: "Vatican City",
					needToBook: false,
				},
			],
		},
	];

	try {
		await Holiday.bulkCreate(holidays, { validate: true });
		console.log("Seeded holidays successfully.");
	} catch (error) {
		console.error("Error seeding holidays:", error);
	}
};

export default seedHolidays;
