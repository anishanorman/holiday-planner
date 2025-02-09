import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { updateHolidayTimestamp } from "../utils/updateHoliday";
import Holiday from "./Holiday";

class Airport {
	public iata!: string;
	public name!: string;
	public city!: string;
	public region!: string;
	public country!: string;
	public latitude!: string;
	public longitude!: string;
}

class Duration {
	public hours!: number;
	public minutes!: number;
}

class FlightLocation {
	public place!: string;
	public time!: string | null;
	public airport!: Airport | null;
}

class Flight extends Model {
	declare id: number;
	public holidayId!: number;
	public date!: string;
	public booked!: boolean;
	public airline!: { name: string; logoUrl: string } | null;
	public arrival!: FlightLocation;
	public departure!: FlightLocation;
	public flightNumber!: string | null;
	public duration!: Duration | null;
	public stops!: { airport: Airport; duration: Duration }[] | null;
}

Flight.init(
	{
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		booked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		airline: {
			type: DataTypes.JSONB,
			allowNull: true,
		},
		arrival: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		departure: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		flightNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		duration: {
			type: DataTypes.JSONB,
			allowNull: true,
		},
		stops: {
			type: DataTypes.JSONB,
			allowNull: true,
		},
		holidayId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Holiday,
				key: "id",
			},
			onDelete: "CASCADE",
		},
	},
	{
		sequelize,
		modelName: "Flight",
		tableName: "flights",
		timestamps: true,
	}
);

Flight.afterCreate(updateHolidayTimestamp);
Flight.afterUpdate(updateHolidayTimestamp);
Flight.afterDestroy(updateHolidayTimestamp);

export default Flight;
