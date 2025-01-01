import { useQuery } from "@tanstack/react-query";
import { HolidayCard } from "../components/holidayCard.tsx/HolidayCard";
import { Holiday } from "../utils/types";

export const Dashboard = () => {
	const {
		isPending,
		error,
		data,
	} = useQuery({
		queryKey: ["holidays"],
		queryFn: async () => {
			const response = await fetch("http://localhost:5000/api/holidays");
			if (!response.ok) {
				throw new Error("An error occurred while fetching the holidays data");
			}
			return response.json();
		},
	});

	if (isPending) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	const holidays = [...data].sort((a: Holiday, b: Holiday) => {
		return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
	});

	return (
		<div className="flex flex-wrap gap-8 content-center justify-center">
			{holidays &&
				holidays.map((holiday: Holiday) => (
					<HolidayCard key={holiday.id} holiday={holiday} />
				))}
		</div>
	);
};
