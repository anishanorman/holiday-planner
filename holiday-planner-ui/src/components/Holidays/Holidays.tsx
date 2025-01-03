import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getHolidays } from "../../api/HolidayService";
import { Holiday } from "../../utils/types";
import { Spinner } from "../Spinner";
import { HolidayCard } from "./HolidayCard";

export const Holidays = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["holidays"],
		queryFn: getHolidays,
	});

	if (isLoading) {
		return <Spinner className="my-32" />;
	}

	if (error) {
		return <Alert severity="error">Sorry, something went wrong. Please try again later.</Alert>;
	}

	return (
		<div className="flex flex-wrap gap-8 content-center justify-center">
			{data ? (
				data.map((holiday: Holiday) => (
					<HolidayCard key={holiday.id} holiday={holiday} />
				))
			) : (
				<Alert severity="info" className="my-6">
					No holidays found. To begin, click 'New holiday' above.
				</Alert>
			)}
		</div>
	);
};
