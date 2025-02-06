import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getHoliday } from "../api/HolidayService";
import { Flights } from "../components/Flights/Flights";
import { Spinner } from "../components/Spinner";
import { useFlights } from "../context/FlightsContext";
import { useEffect } from "react";

export const View = () => {
	const { id } = useParams();
	const { setFlights } = useFlights();

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["holiday", id],
		queryFn: () => getHoliday(id!),
		enabled: !!id,
		staleTime: 0,
	});

	useEffect(() => {
		if (data) {
			setFlights(data.flights || []);
		}
	}, [data, setFlights]);

	if (isLoading) return <Spinner />;
	if (error)
		return (
			<Alert severity="error">
				Sorry, something went wrong. Please try again later.
			</Alert>
		);

	if (!data) return <Alert severity="info">No holiday found.</Alert>;

	return (
		<div className="flex flex-col items-center gap-6 p-6">
			<h1 className="text-2xl">{data.title}</h1>

				<Flights flights={data.flights || []} refetch={refetch} />
		</div>
	);
};
