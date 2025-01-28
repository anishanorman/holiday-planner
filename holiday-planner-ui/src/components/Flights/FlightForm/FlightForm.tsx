import { Checkbox, Collapse } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FieldArray, Form, Formik } from "formik";
import { useParams } from "react-router";
import { postFlight, putFlight } from "../../../api/FlightService";
import { Flight } from "../../../utils/types";
import { Divider } from "../../Divider";
import { DateField } from "../../Fields/DateField";
import { DateTimeField } from "../../Fields/DateTimeField";
import { NumberField } from "../../Fields/NumberField";
import { SwitchField } from "../../Fields/SwitchField";
import { TextField } from "../../Fields/TextField";
import { IconButton } from "../../IconButton";
import { formatFormValues } from "./FlightForm.helpers";
import { validationSchema } from "./validationSchema";

export interface FlightFormValues {
	placeOfDeparture?: string;
	placeOfArrival?: string;
	date?: Dayjs;
	booked?: boolean;
	airlineQuery?: string;
	airline?: string;
	flightNumber?: string;
	departureTime?: Dayjs;
	departureAirport?: string;
	arrivalTime?: Dayjs;
	arrivalAirport?: string;
	hours?: number;
	minutes?: number;
	direct?: boolean;
	stops?: {
		airportCode: string;
		hours: number;
		minutes: number;
	}[];
}

interface FlightFormProps {
	selectedFlight: Flight | null;
	onClose: () => void;
}

export const FlightForm = ({ selectedFlight, onClose }: FlightFormProps) => {
	const { id } = useParams();

	const verticalGap = "gap-6";
	const horizontalGap = "gap-8";

	const initialValues: FlightFormValues = {
		placeOfDeparture: selectedFlight?.departure?.place,
		placeOfArrival: selectedFlight?.arrival?.place,
		date: dayjs(selectedFlight?.date),
		booked: Boolean(selectedFlight?.booked),
		airlineQuery: "",
		airline: selectedFlight?.booked ? selectedFlight.airline.name : undefined,
		flightNumber: selectedFlight?.booked
			? selectedFlight?.flightNumber
			: undefined,
		departureTime: selectedFlight?.booked
			? dayjs(selectedFlight?.departure?.time)
			: undefined,
		departureAirport: selectedFlight?.booked
			? selectedFlight?.departure?.airport?.iata
			: "",
		arrivalTime: selectedFlight?.booked
			? dayjs(selectedFlight?.arrival?.time) || undefined
			: undefined,
		arrivalAirport: selectedFlight?.booked
			? selectedFlight?.arrival?.airport?.iata
			: "",
		hours: selectedFlight?.booked ? selectedFlight?.duration?.hours : undefined,
		minutes: selectedFlight?.booked
			? selectedFlight?.duration?.minutes
			: undefined,
		direct: selectedFlight?.booked ? selectedFlight?.stops?.length === 0 : true,
		stops: selectedFlight?.booked
			? selectedFlight?.stops?.map((stop) => ({
					airportCode: stop.airport.iata || "",
					hours: stop.duration.hours || 0,
					minutes: stop.duration.minutes || 0,
			  })) || []
			: [],
	};

	return (
		<Formik<FlightFormValues>
			initialValues={initialValues}
			validateOnChange={false}
			validateOnBlur={false}
			validateOnMount={false}
			validationSchema={validationSchema}
			onSubmit={async (values) => {
				const formattedFormValues = formatFormValues(values, Number(id!));
				if (selectedFlight?.id) {
					await putFlight(String(selectedFlight.id), formattedFormValues);
				} else {
					await postFlight(formattedFormValues);
				}
				onClose();
			}}
		>
			{({ touched, errors, setFieldError, setFieldValue, values }) => {
				return (
					<Form className={`flex flex-col ${verticalGap}`}>
						<div
							className={`flex justify-between items-center ${horizontalGap}`}
						>
							<TextField
								name="placeOfDeparture"
								label="Place of Departure"
								error={Boolean(
									touched.placeOfDeparture && errors.placeOfDeparture
								)}
								helperText={
									touched.placeOfDeparture && errors.placeOfDeparture
										? errors.placeOfDeparture
										: ""
								}
								onFocus={() => setFieldError("placeOfDeparture", "")}
								className="grow"
							/>
							<TextField
								name="placeOfArrival"
								label="Place of Arrival"
								error={Boolean(touched.placeOfArrival && errors.placeOfArrival)}
								helperText={
									touched.placeOfArrival && errors.placeOfArrival
										? errors.placeOfArrival
										: ""
								}
								onFocus={() => setFieldError("placeOfArrival", "")}
								className="grow"
							/>
							<DateField name="date" label="Date" />
						</div>

						<SwitchField name="booked" label="Booked" />
						<Collapse in={values.booked}>
							<div className={`flex flex-col ${verticalGap}`}>
								<div className="flex justify-center items-center gap-6">
									<TextField
										name="airline"
										label="Airline"
										error={Boolean(touched.airline && errors.airline)}
										helperText={
											touched.airline && errors.airline ? errors.airline : ""
										}
										onFocus={() => setFieldError("airline", "")}
										className="mb-1 grow"
									/>
									<TextField
										name="flightNumber"
										label="Flight number"
										error={Boolean(touched.flightNumber && errors.flightNumber)}
										helperText={
											touched.flightNumber && errors.flightNumber
												? errors.flightNumber
												: ""
										}
										onFocus={() => setFieldError("flightNumber", "")}
										className="w-32"
									/>
									<NumberField name="hours" label="Hours" />
									<NumberField name="minutes" label="Minutes" />
								</div>
								<div className={`flex justify-between items-center`}>
									<div className={`flex flex-col`}>
										<h2 className="font-medium">Departure</h2>
										<div className="flex gap-6">
											<DateTimeField name="departureTime" label="Date / Time" />
											<TextField
												name="departureAirport"
												label="Airport code"
												error={Boolean(
													touched.departureAirport && errors.departureAirport
												)}
												helperText={
													touched.departureAirport && errors.departureAirport
														? errors.departureAirport
														: ""
												}
												onFocus={() => setFieldError("departureAirport", "")}
												className="self-end w-24"
												maxLength={3}
											/>
										</div>
									</div>
									<span className="material-symbols-outlined font-light text-5xl text-cyan-900">
										trending_flat
									</span>
									<div className={`flex flex-col`}>
										<h2 className="font-medium">Arrival</h2>
										<div className="flex gap-6">
											<DateTimeField name="arrivalTime" label="Date / Time" />
											<TextField
												name="arrivalAirport"
												label="Airport code"
												className="self-end w-24"
												maxLength={3}
											/>
										</div>
									</div>
								</div>

								<div className="flex items-center">
									<Checkbox
										name="direct"
										checked={values.direct}
										onChange={(event) => {
											event.target.checked
												? setTimeout(() => {
														setFieldValue("stops", []);
												  }, 200)
												: setFieldValue("stops", [
														{ airportCode: "", hours: 0, minutes: 0 },
												  ]);
											setFieldValue("direct", event.target.checked);
										}}
									/>
									<p>Direct</p>
								</div>

								<Collapse in={!values.direct}>
									<div className={`flex flex-col ${verticalGap}`}>
										<h3 className="font-medium mb-1">Stops</h3>
										<FieldArray
											name="stops"
											render={(arrayHelpers) => (
												<div className="flex flex-col items-center gap-4">
													{values.stops?.map((_, index) => (
														<div
															key={index}
															className={`flex justify-center items-center ${horizontalGap}`}
														>
															<p className="self-end">Stop {index + 1}:</p>
															<TextField
																name={`stops[${index}].airportCode`}
																label="Airport code"
																className="w-24"
																maxLength={3}
															/>
															<Divider />
															<div className="flex gap-6">
																<NumberField
																	name={`stops[${index}].hours`}
																	label="Hours"
																/>
																<NumberField
																	name={`stops[${index}].minutes`}
																	label="Minutes"
																/>
															</div>

															<IconButton
																onClick={() => arrayHelpers.remove(index)}
																icon="delete"
																color="text-red-500"
																className="self-end"
															/>
														</div>
													))}
													<IconButton
														onClick={() =>
															arrayHelpers.push({
																airportCode: "",
																hours: undefined,
																minutes: undefined,
															})
														}
														icon="add"
														color="text-cyan-900"
														size="text-3xl"
													/>
												</div>
											)}
										/>
									</div>
								</Collapse>
							</div>
						</Collapse>
						<button
							type="submit"
							className="bg-cyan-600 text-white px-10 py-1 rounded-full hover:bg-cyan-700"
						>
							Save
						</button>
					</Form>
				);
			}}
		</Formik>
	);
};
