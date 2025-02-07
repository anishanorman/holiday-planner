export interface BookedReqBody {
	holidayId: number;
	airline: {
		name: string;
	};
	flightNumber: string;
	date: string;
	departure: {
		time: string;
		place: string;
		airport: {
			iata: string;
		};
	};
	arrival: {
		time: string;
		place: string;
		airport: {
			iata: string;
		};
	};
	booked: true;
	duration: {
		hours: number;
		minutes: number;
	};
	stops?: {
		airport: {
			iata: string;
		};
		duration: {
			hours: number;
			minutes: number;
		};
	}[];
}

export interface UnbookedReqBody {
	holidayId: number;
	date: string;
	departure: {
		place: string;
	};
	arrival: {
		place: string;
	};
	booked: false;
}

export type ReqBody = BookedReqBody | UnbookedReqBody;
