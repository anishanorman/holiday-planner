import { createContext, useContext, useState } from "react";
import { Flight } from "../utils/types";

interface FlightsContextType {
	editFlightDialogOpen: boolean;
	setEditFlightDialogOpen: (open: boolean) => void;
	flights: Flight[] | null;
	setFlights: (flights: Flight[] | null) => void;
	selectedFlight: Flight | null;
	setSelectedFlight: (flight: Flight | null) => void;
}

const FlightDialogContext = createContext<FlightsContextType | undefined>(
	undefined
);

export const FlightsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [editFlightDialogOpen, setEditFlightDialogOpen] = useState(false);
	const [flights, setFlights] = useState<Flight[] | null>(null);
	const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

	return (
		<FlightDialogContext.Provider
			value={{
				editFlightDialogOpen,
				setEditFlightDialogOpen,
				flights,
				setFlights,
				selectedFlight,
				setSelectedFlight,
			}}
		>
			{children}
		</FlightDialogContext.Provider>
	);
};

export const useFlights = () => {
	const context = useContext(FlightDialogContext);
	if (!context) {
		throw new Error(
			"useFlightDialog must be used within a FlightDialogProvider"
		);
	}
	return context;
};
