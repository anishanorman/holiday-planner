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
				place: values.departureCity,
				airport: {
					iata: values.departureAirport,
				}
			},
			arrival: {
				time: values.arrivalTime?.format('YYYY-MM-DDTHH:mm:ss'),
				place: values.arrivalCity,
				airport: {
					iata: values.arrivalAirport,
				}
			},
			duration: {
				hours: values.hours,
				minutes: values.minutes
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
		};
	} else {
		return {
            holidayId: holidayId,
			date: values.date?.format('YYYY-MM-DD'),
			booked: false,
			departure: {
				place: values.departureCity
			},
			arrival: {
				place: values.arrivalCity
			}
		};
	}
};
