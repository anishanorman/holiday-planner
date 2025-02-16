import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { updateHolidayTimestamp } from "../utils/updateHoliday";
import Holiday from "./Holiday";

class Accommodation extends Model {
	declare id: number;
	public holidayId!: number;
	public name!: string;
	public booked!: boolean;
	public checkIn!: Date;
	public checkOut!: Date;
	public location!: string;
}

Accommodation.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		booked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		bookingReference: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		checkIn: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		checkOut: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
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
		modelName: "Accommodation",
		tableName: "accommodations",
		timestamps: true,
	}
);

Accommodation.afterCreate(updateHolidayTimestamp);
Accommodation.afterUpdate(updateHolidayTimestamp);
Accommodation.afterDestroy(updateHolidayTimestamp);

export default Accommodation;
