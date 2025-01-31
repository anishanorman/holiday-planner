import { BookedFlight, UnbookedFlight } from "../../../utils/types";
import { FlightFormValues } from "./FlightForm";

export const formatFormValues = (values: FlightFormValues, holidayId: number) => {
	if (values.booked) {
		return {
            holidayId: holidayId,
			date: values.date?.format('YYYY-MM-DD'),
			booked: true,
			airline: {
				name: values.airline,
			},
			flightNumber: values.flightNumber,
			departure: {
				time: values.departureTime?.format('YYYY-MM-DDTHH:mm:ss'),
				place: values.placeOfDeparture,
				airport: {
					iata: values.departureAirport,
				}
			},
			arrival: {
				time: values.arrivalTime?.format('YYYY-MM-DDTHH:mm:ss'),
				place: values.placeOfArrival,
				airport: {
					iata: values.arrivalAirport,
				}
			},
			stops: values.stops?.map((stop) => ({
				airport: {
					iata: stop.airportCode,
				},
				duration: {
					hours: stop.hours,
					minutes: stop.minutes
				}
			}))
		} as BookedFlight;
	} else {
		return {
            holidayId: holidayId,
			date: values.date?.format('YYYY-MM-DD'),
			booked: false,
			departure: {
				place: values.placeOfDeparture
			},
			arrival: {
				place: values.placeOfArrival
			}
		} as UnbookedFlight;
	}
};
