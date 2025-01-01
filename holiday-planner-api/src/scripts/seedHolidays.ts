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
				url: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
				alt: "White Concrete House Near Body of Water Under White and Blue Cloudy Sky",
			},
		},
		{
			title: "Tropical Escape",
			startDate: "2024-06-01",
			endDate: "2024-06-21",
			image: {
				photographer: "Mohamed Sarim",
				photographerUrl: "https://www.pexels.com/@sarimphotos",
				url: "https://images.pexels.com/photos/1033729/pexels-photo-1033729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
				alt: "Dirt Road Surrounded by Trees",
			},
		},
		{
			title: "Rome",
			startDate: "2024-12-15",
			endDate: "2024-12-30",
			image: {
				photographer: "Chait Goli",
				photographerUrl: "https://www.pexels.com/@chaitaastic",
				url: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
				alt: "Colusseum, Italy",
			},
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
