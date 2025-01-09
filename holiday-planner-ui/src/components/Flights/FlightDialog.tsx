import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Flight } from "../../utils/types";
import { FlightForm } from "./FlightForm/FlightForm";

export interface FlightDialogProps {
	open: boolean;
	onClose: () => void;
	selectedFlight: Flight | null;
}

export const FlightDialog = ({
	open,
	onClose,
	selectedFlight,
}: FlightDialogProps) => {
	return (
		<Dialog fullWidth maxWidth={"md"} onClose={onClose} open={open}>
			<DialogTitle style={{padding: "3rem 4rem 2rem 4rem"}}>
				Edit flight details
			</DialogTitle>
			<DialogContent style={{padding: "0rem 4rem 3rem 4rem"}}>
				<FlightForm selectedFlight={selectedFlight} onClose={onClose}/>
			</DialogContent>
		</Dialog>
	);
};
