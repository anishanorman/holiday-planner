import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { getAccommodationsByHolidayId } from "../api/HolidayService";
import { Accommodation } from "../utils/types";

interface AccommodationsContextType {
	editAccommodationDialogOpen: boolean;
	setEditAccommodationDialogOpen: (open: boolean) => void;
	accommodations: Accommodation[] | undefined;
	selectedAccommodation: Accommodation | null;
	setSelectedAccommodation: (accommodation: Accommodation | null) => void;
	isLoading: boolean;
	error: unknown;
	refetchAccommodations: () => void;
}

const AccommodationsContext = createContext<AccommodationsContextType | undefined>(
	undefined
);

export const AccommodationsProvider = ({
	children,
	holidayId,
}: {
	children: React.ReactNode;
	holidayId: number;
}) => {
	const [editAccommodationDialogOpen, setEditAccommodationDialogOpen] = useState(false);
	const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);

	const {
		data: accommodations,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["accommodations", holidayId],
		queryFn: () => getAccommodationsByHolidayId(String(holidayId)),
		enabled: !!holidayId,
		staleTime: 5 * 60 * 1000,
	});

	return (
		<AccommodationsContext.Provider
			value={{
				editAccommodationDialogOpen,
				setEditAccommodationDialogOpen,
				accommodations,
				selectedAccommodation,
				setSelectedAccommodation,
				isLoading,
				error,
				refetchAccommodations: refetch,
			}}
		>
			{children}
		</AccommodationsContext.Provider>
	);
};

export const useAccommodations = () => {
	const context = useContext(AccommodationsContext);
	if (!context) {
		throw new Error("useAccommodations must be used within a AccommodationsProvider");
	}
	return context;
};
