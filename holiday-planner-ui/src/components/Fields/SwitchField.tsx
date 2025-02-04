import { alpha, FormControlLabel, Switch } from "@mui/material";
import { useField } from "formik";

interface SwitchFieldProps {
	name: string;
	label: string;
	className?: string;
	[key: string]: any;
}

export const SwitchField = ({
	name,
	label,
	className,
	...props
}: SwitchFieldProps) => {
	const [field, , helpers] = useField(name);
	const { setValue } = helpers;

	return (
		<FormControlLabel
			{...props}
			checked={field.value}
			onChange={(event) => setValue((event.target as HTMLInputElement).checked)}
			control={<Switch color="primary" />}
			label={label}
			labelPlacement="end"
			className={className}
			sx={{
				"& .MuiSwitch-switchBase.Mui-checked": {
					color: "rgb(8 145 178)",
					"&:hover": {
						backgroundColor: alpha("rgb(8 145 178)", 0.2),
					},
				},
				"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
					backgroundColor: "rgb(8 145 178)",
				},
			}}
		/>
	);
};
