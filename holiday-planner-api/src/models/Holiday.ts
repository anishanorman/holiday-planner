import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Holiday extends Model {
	declare id: number;
	public title!: string;
	public startDate!: Date;
	public endDate!: Date;
	public image!: object;
	public activities!: object;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Holiday.init(
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		startDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: "start_date",
		},
		endDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: "end_date",
		},
		image: {
			type: DataTypes.JSONB,
			allowNull: true,
		},
		activities: {
			type: DataTypes.JSONB,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: "Holiday",
		tableName: "holidays",
		timestamps: true,
	}
);

export default Holiday;
