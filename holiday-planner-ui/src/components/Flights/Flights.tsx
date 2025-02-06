import { Alert } from "@mui/material";
import { useFlights } from "../../context/FlightsContext";
import { Flight } from "../../utils/types";
import { IconButton } from "../IconButton";
import { FlightCard } from "./FlightCard";
import { FlightDialog } from "./FlightDialog";

interface FlightsProps {
	flights: Flight[];
	refetch: () => void;
}

export const Flights = ({ flights, refetch }: FlightsProps) => {
	const { editFlightDialogOpen, setEditFlightDialogOpen, setSelectedFlight } =
		useFlights();

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
								setEditFlightDialogOpen(true);
							}}
						/>
					))
			) : (
				<Alert severity="info">No flights added yet</Alert>
			)}
			<IconButton
				onClick={() => {
					setSelectedFlight(null);
					setEditFlightDialogOpen(true);
				}}
				icon="add"
				color="cyan-700"
				size="3xl"
			/>

			{editFlightDialogOpen && (
				<FlightDialog
					onClose={() => {
						setEditFlightDialogOpen(false);
						refetch();
					}}
				/>
			)}
		</div>
	);
};
