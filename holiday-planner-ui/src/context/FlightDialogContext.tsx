import { createContext, useContext, useState } from "react";
import { Flight } from "../utils/types";

interface FlightDialogContextType {
  editFlightDialogOpen: boolean;
  setEditFlightDialogOpen: (open: boolean) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
}

const FlightDialogContext = createContext<FlightDialogContextType | undefined>(undefined);

export const FlightDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [editFlightDialogOpen, setEditFlightDialogOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  return (
    <FlightDialogContext.Provider value={{ editFlightDialogOpen, setEditFlightDialogOpen, selectedFlight, setSelectedFlight }}>
      {children}
    </FlightDialogContext.Provider>
  );
};

export const useFlightDialog = () => {
  const context = useContext(FlightDialogContext);
  if (!context) {
    throw new Error("useFlightDialog must be used within a FlightDialogProvider");
  }
  return context;
};
