import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { deleteFlight } from "../../../api/FlightService";
import { useFlightDialog } from "../../../context/FlightDialogContext";
import { useSnackbar } from "../../../context/SnackbarContext";
import { Button } from "../../Button";

export interface FlightDialogProps {
	open: boolean;
	onClose: () => void;
}

export const DeleteFlightDialog = ({
	open,
	onClose,
}: FlightDialogProps) => {
	const { setEditFlightDialogOpen, selectedFlight } = useFlightDialog();
	const { showSnackbar } = useSnackbar();

	const deleteFlightMutation = useMutation({
		mutationFn: ({ id }: { id: string }) => deleteFlight(id),
	});

	const isRequestPending = deleteFlightMutation.isPending;

	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle style={{ padding: "2rem 3rem 1rem 3rem" }}>
				Delete flight?
			</DialogTitle>
			<DialogContent style={{ padding: "0rem 3rem 3rem 3rem" }}>
				<p className="mb-4">This cannot be undone.</p>
				<div className="flex gap-6">
					<Button
						variant="outlined"
						fullWidth
						label="Cancel"
						onClick={onClose}
					/>
					<Button
						loading={isRequestPending}
						fullWidth
						label="Delete"
						color="error"
						onClick={() =>
							deleteFlightMutation.mutate(
								{ id: String(selectedFlight?.id) },
								{
									onSuccess: () => {
										showSnackbar("Flight deleted successfully.", "success");
										onClose();
										setEditFlightDialogOpen(false);
									},
									onError: () => {
										showSnackbar("Something went wrong.", "error");
									},
								}
							)
						}
						endIcon={
							<span className="material-symbols-outlined">delete_forever</span>
						}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};
