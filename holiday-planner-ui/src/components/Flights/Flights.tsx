import { Alert } from "@mui/material";
import { useState } from "react";
import { Flight } from "../../utils/types";
import { IconButton } from "../IconButton";
import { FlightCard } from "./FlightCard";
import { FlightDialog } from "./FlightDialog";

interface FlightsProps {
	flights: Flight[];
	refetch: () => void;
}

export const Flights = ({ flights, refetch }: FlightsProps) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

	return (
		<div className="flex flex-col shadow-xl bg-white px-8 py-4 rounded w-fit items-center">
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-2xl leading-normal">Flights</h2>
			</div>
			{flights.length > 0 ? (
				flights
					.slice()
					.sort(
						(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
					)
					.map((flight) => (
						<FlightCard
							key={flight.id}
							flight={flight}
							onClick={() => {
								setSelectedFlight(flight);
								setDialogOpen(true);
							}}
						/>
					))
			) : (
				<Alert severity="info">No flights added yet</Alert>
			)}
			<IconButton
				onClick={() => {
					setSelectedFlight(null);
					setDialogOpen(true);
				}}
				icon="add"
				color="cyan-700"
				size="3xl"
			/>

			{dialogOpen && (
				<FlightDialog
					open={dialogOpen}
					onClose={() => {
						setDialogOpen(false);
						refetch();
					}}
					selectedFlight={selectedFlight}
				/>
			)}
		</div>
	);
};
