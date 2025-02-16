import { Alert } from "@mui/material";
import { useAccommodations } from "../../context/AccommodationsContext";

export const Accommodations = () => {
	const { accommodations } = useAccommodations();

	return (
		<div className="flex flex-col shadow-xl bg-white px-8 py-4 rounded w-fit items-center">
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-2xl leading-normal">Accommodation</h2>
			</div>
			{accommodations && accommodations.length > 0 ? (
				accommodations
					.slice()
					.sort(
						(a, b) =>
							new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
					)
					.map((accommodation) => <p>{accommodation.name}</p>)
			) : (
				<Alert severity="info">No accommodation added yet</Alert>
			)}
		</div>
	);
};
