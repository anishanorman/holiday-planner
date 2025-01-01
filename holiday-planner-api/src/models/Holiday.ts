import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

class Holiday extends Model {
	declare id: number;
	public title!: string;
	public startDate!: Date;
	public endDate!: Date;
  public image!: object
	public flights!: object;
	public activities!: object;
	public accommodations!: object;
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
		flights: {
			type: DataTypes.JSONB,
			allowNull: true,
		},
		activities: {
			type: DataTypes.JSONB,
			allowNull: true,
		},
		accommodations: {
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
