import { Alert, Tooltip } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { getFriendlyDate, getTimeFromDate } from "../../utils/dates";
import { Flight } from "../../utils/types";

interface FlightCardProps {
	flight: Flight;
	onClick: () => void;
}

export const FlightCard = ({ flight, onClick }: FlightCardProps) => {
	const isOvernightFlight =
		flight.booked &&
		new Date(flight.arrival.time).getDate() !==
			new Date(flight.departure.time).getDate();

	const dateDifference = flight.booked
		? new Date(flight.arrival.time).getDate() -
		  new Date(flight.departure.time).getDate()
		: 0;

	return (
		<div
			className="bg-white shadow-md rounded border m-1 w-full hover:scale-[1.01] transition-transform cursor-pointer"
			draggable={false}
			onClick={onClick}
		>
			<div
				className={`flex justify-between gap-28 items-center p-2 ${
					flight.booked && "border-b"
				} bg-cyan-600/5`}
			>
				<div className="flex items-center px-2 gap-4">
					<div className="flex items-center gap-1">
						<p>{flight.departure.place}</p>
						<span className="material-symbols-outlined font-extralight">
							trending_flat
						</span>
						<p>{flight.arrival.place}</p>
					</div>
					<div className="h-1 w-1 rounded-full bg-cyan-700" />
					<p className="text-sm">{getFriendlyDate(flight.date, "short")}</p>
				</div>
				<div className="flex gap-2">
					{isOvernightFlight && (
						<Tooltip title="This flight is overnight" arrow>
							<span className="material-symbols-outlined font-light">
								bedtime
							</span>
						</Tooltip>
					)}
					{flight.booked ? (
						<Alert
							icon={false}
							severity="success"
							sx={{
								padding: "0px 8px",
								borderRadius: "10px",
								"& .MuiAlert-message": { padding: "3px" },
								boxShadow:
									"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
							}}
						>
							Booked
						</Alert>
					) : (
						<Alert
							icon={false}
							severity="warning"
							sx={{
								padding: "0px 8px",
								borderRadius: "10px",
								"& .MuiAlert-message": { padding: "3px" },
								boxShadow:
									"0px 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
							}}
						>
							Not booked
						</Alert>
					)}
				</div>
			</div>
			{flight.booked && (
				<div className="flex p-2 gap-2">
					<div className="flex flex-col max-w-28 items-center justify-center px-3 gap-1">
						<img
							src={flight.airline.logoUrl}
							className="object-contain"
							draggable={false}
						/>
						<p className="text-sm text-center">{flight.flightNumber}</p>
					</div>
					<div className="grow px-4">
						<div className="flex justify-between text-sm text-gray-500">
							<p className="text-xs">
								{getFriendlyDate(flight.departure.time, "short")}
							</p>
							<p className="text-xs">
								{getFriendlyDate(flight.arrival.time, "short")}
							</p>
						</div>
						<div className="flex justify-between">
							<div className="flex flex-col items-start justify-center pr-4">
								<p className="text-2xl font-bold leading-tight">
									{flight.departure.airport.iata}
								</p>
								<p className="text-sm">
									{getTimeFromDate(flight.departure.time)}
								</p>
							</div>
							<div className="flex flex-col items-center justify-center grow">
								<p className="text-sm">
									{flight.duration.hours}hr {flight.duration.minutes}min
								</p>
								<div className="w-full h-[2px] bg-cyan-600" />
								<div className="items-center">
									{flight.stops.length > 0 ? (
										<div className="flex flex-col items-center">
											<div className="absolute h-[6px] w-[6px] bg-cyan-600 -translate-y-[4px] rounded" />
											<p className="text-sm">
												{flight.stops.length} stop
												{flight.stops.length > 1 && "s"}
											</p>
											<div className="flex gap-2 flex-wrap">
												{flight.stops.map((stop, index) => (
													<Fragment key={index}>
														<p key={index} className="text-xxs text-gray-600">
															{stop.airport.iata}
															{stop.duration.hours > 0 &&
																` ${stop.duration.hours}hr`}
															{stop.duration.minutes > 0 &&
																` ${stop.duration.minutes}min`}
														</p>
														{index < flight.stops.length - 1 && (
															<p className="text-xxs text-gray-400">+</p>
														)}
													</Fragment>
												))}
											</div>
										</div>
									) : (
										<p className="text-sm">Direct</p>
									)}
								</div>
							</div>
							<div className="flex flex-col items-end justify-center pl-4">
								<p className="text-2xl font-bold leading-tight">
									{flight.arrival.airport.iata}
								</p>
								<div className="flex">
									<p className="text-sm">
										{getTimeFromDate(flight.arrival.time)}
									</p>
									{dateDifference < 0 && (
										<p className="text-xxs -translate-y-[1px] ml-[1px]">
											{dateDifference}
										</p>
									)}
									{dateDifference > 0 && (
										<p className="text-xxs -translate-y-[1px] ml-[0.5px]">
											+{dateDifference}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
