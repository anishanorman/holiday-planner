import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	placeOfDeparture: Yup.string().required("Required"),
	placeOfArrival: Yup.string().required("Required"),
	date: Yup.date().required("Required"),
	booked: Yup.boolean(),
	airline: Yup.string().when("booked", {
		is: true,
		then: (schema) => schema.required("Required"),
		otherwise: (schema) => schema.optional(),
	}),
	flightNumber: Yup.string().when("booked", {
		is: true,
		then: (schema) => schema.required("Required"),
	}),
	departureTime: Yup.string().when("booked", {
		is: true,
		then: (schema) =>
			schema
				.required("Required")
				.test(
					"same-date-as-earlier-stated",
					"Must match date above",
					function (value) {
						const { date } = this.parent;
						const prevDate = new Date(date);
						const thisDate = new Date(value);
						return (
							prevDate.getFullYear() === thisDate.getFullYear() &&
							prevDate.getMonth() === thisDate.getMonth() &&
							prevDate.getDate() === thisDate.getDate()
						);
					}
				),
	}),
	departureAirport: Yup.string().when("booked", {
		is: true,
		then: (schema) =>
			schema.min(3, "Must be 3 characters").required("Required"),
	}),
	arrivalTime: Yup.string()
		.when("booked", {
			is: true,
			then: (schema) => schema.required("Required"),
		})
		.when("booked", {
			is: false,
			then: (schema) => schema.notRequired(),
		}),
	arrivalAirport: Yup.string().when("booked", {
		is: true,
		then: (schema) =>
			schema.min(3, "Must be 3 characters").required("Required"),
	}),
	stops: Yup.array().of(
		Yup.object().shape({
			airportCode: Yup.string()
				.min(3, "Must be 3 characters")
				.required("Required"),
			hours: Yup.number()
				.default(0)
				.when("minutes", {
					is: 0,
					then: (schema) => schema.min(1, "Invalid duration"),
				})
				.test("duration-not-0", "Invalid duration", function (value) {
					const { minutes } = this.parent;
					return Number(value) + Number(minutes) > 0;
				}),
			minutes: Yup.number()
				.default(0)
				.max(59, "Must be less than 60")
				.test("duration-not-0", "Invalid duration", function (value) {
					const { hours } = this.parent;
					return Number(value) + Number(hours) > 0;
				}),
		})
	),
});
