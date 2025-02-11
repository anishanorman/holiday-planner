import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { getFlightsByHolidayId } from "../api/HolidayService";
import { Flight } from "../utils/types";

interface FlightsContextType {
	editFlightDialogOpen: boolean;
	setEditFlightDialogOpen: (open: boolean) => void;
	flights: Flight[] | undefined;
	selectedFlight: Flight | null;
	setSelectedFlight: (flight: Flight | null) => void;
	isLoading: boolean;
	error: unknown;
	refetchFlights: () => void;
}

const FlightDialogContext = createContext<FlightsContextType | undefined>(
	undefined
);

export const FlightsProvider = ({
	children,
	holidayId,
}: {
	children: React.ReactNode;
	holidayId: number;
}) => {
	const [editFlightDialogOpen, setEditFlightDialogOpen] = useState(false);
	const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

	const {
		data: flights,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["flights", holidayId],
		queryFn: () => getFlightsByHolidayId(String(holidayId)),
		enabled: !!holidayId,
		staleTime: 5 * 60 * 1000,
	});

	return (
		<FlightDialogContext.Provider
			value={{
				editFlightDialogOpen,
				setEditFlightDialogOpen,
				flights,
				selectedFlight,
				setSelectedFlight,
				isLoading,
				error,
				refetchFlights: refetch,
			}}
		>
			{children}
		</FlightDialogContext.Provider>
	);
};

export const useFlights = () => {
	const context = useContext(FlightDialogContext);
	if (!context) {
		throw new Error("useFlights must be used within a FlightsProvider");
	}
	return context;
};
