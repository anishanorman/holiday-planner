import { TextField as MUITextField } from "@mui/material";
import { useField } from "formik";

export const TextField = ({
	name,
	label,
	...props
}: {
	name: string;
	label: string;
	[key: string]: any;
}) => {
	const [field, , helpers] = useField(name);
	const { setValue } = helpers;

	return (
		<MUITextField
			{...props}
			label={label}
			value={field.value || ""}
			onChange={(event) => setValue(event.target.value)}
			onBlur={field.onBlur}
			sx={{
				"& label.Mui-focused": {
					color: "rgb(14 116 144)",
				},
				"& .MuiInput-underline:after": {
					borderBottomColor: "rgb(14 116 144)",
				},
				"& .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
					borderBottomColor: "rgb(8 51 68)",
				},
			}}
			variant="standard"
			fullWidth
			autoComplete="off"
			size="small"
		/>
	);
};
