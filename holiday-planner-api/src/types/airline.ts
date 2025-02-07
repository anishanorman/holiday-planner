export interface AirlineResponse {
	iata: string;
	icao: string;
	fleet: {
		total: number;
		[key: string]: number;
	};
	logo_url: string;
	name: string;
}

export interface DefaultAirline {
	name: string;
	logoUrl: string;
}
