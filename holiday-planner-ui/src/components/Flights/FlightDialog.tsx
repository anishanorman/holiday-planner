import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useFlights } from "../../context/FlightsContext";
import { FlightForm } from "./FlightForm/FlightForm";

export interface FlightDialogProps {
	onClose: () => void;
}

export const FlightDialog = ({ onClose }: FlightDialogProps) => {
	const { editFlightDialogOpen } = useFlights();

	return (
		<Dialog
			fullWidth
			maxWidth={"md"}
			onClose={onClose}
			open={editFlightDialogOpen}
		>
			<DialogTitle style={{ padding: "3rem 4rem 2rem 4rem" }}>
				Edit flight details
			</DialogTitle>
			<DialogContent style={{ padding: "0rem 4rem 3rem 4rem" }}>
				<FlightForm onClose={onClose} />
			</DialogContent>
		</Dialog>
	);
};
