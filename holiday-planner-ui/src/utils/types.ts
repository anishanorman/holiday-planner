export interface Image {
	photographer: string;
	photographerUrl: string;
	src: string;
	alt: string;
}

export interface Holiday {
	id: number;
	title: string;
	startDate: string;
	endDate: string;
	image: Image;
	flights?: Flight[];
	activities: Activity[];
	accommodation: {
		details: Accommodation[];
		complete: boolean;
	};
	createdAt: string;
	updatedAt: string;
}

export interface Duration {
	hours: number;
	minutes: number;
}

export interface Airline {
	name: string;
	logoUrl: string;
}

export interface Airport {
	iata: string;
	name: string;
	city: string;
	region: string;
	country: string;
	latitude: string;
	longitude: string;
}

export interface BookedFlightLocation {
	time: string;
	place: string;
	airport: Airport;
}

export interface UnbookedFlightLocation {
	place: string;
}
export interface Stop {
	airport: Airport;
	duration: Duration;
}

export interface BookedFlight {
	id: number;
	holidayId: number;
	date: string;
	booked: true;
	airline: Airline;
	flightNumber: string;
	arrival: BookedFlightLocation;
	departure: BookedFlightLocation;
	duration: Duration;
	stops: Stop[];
}

export interface UnbookedFlight {
	id: number;
	holidayId: number;
	date: string;
	booked: false;
	arrival: UnbookedFlightLocation;
	departure: UnbookedFlightLocation;
}

export type Flight = BookedFlight | UnbookedFlight;

export interface Activity {
	date: string | null;
	name: string;
	booked: boolean;
	location: string;
	needToBook: boolean;
}

export interface Accommodation {
	name: string;
	location: string;
	booked: boolean;
	checkIn: string;
	checkOut: string;
}
