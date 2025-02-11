import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getHoliday } from "../api/HolidayService";
import { Flights } from "../components/Flights/Flights";
import { Spinner } from "../components/Spinner";
import { FlightsProvider } from "../context/FlightsContext";

export const View = () => {
	const { holidayId } = useParams();

	const {
		data: holiday,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["holiday", holidayId],
		queryFn: () => getHoliday(String(holidayId)),
		enabled: !!holidayId,
	});

	if (isLoading) return <Spinner />;
	if (error)
		return (
			<Alert severity="error">
				Sorry, something went wrong. Please try again later.
			</Alert>
		);

	if (!holiday) return <Alert severity="info">No holiday found.</Alert>;

	return (
		<div className="flex flex-col items-center gap-6 p-6">
			<h1 className="text-2xl">{holiday.title}</h1>
			<FlightsProvider holidayId={parseInt(holidayId!)}>
				<Flights />
			</FlightsProvider>
		</div>
	);
};
