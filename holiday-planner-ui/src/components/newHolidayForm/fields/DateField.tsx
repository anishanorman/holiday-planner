import { DatePicker } from "@mui/x-date-pickers";
import { useField } from "formik";

export const DateField = ({
	name,
	label,
	...props
}: {
	name: string;
	label: string;
	[key: string]: any;
}) => {
	const [field, meta, helpers] = useField(name);
	const { setValue, setError } = helpers;

	return (
		<DatePicker
			{...props}
			label={label}
			value={field.value || null}
			onChange={(value) => {
				setValue(value);
			}}
			onClose={() => setError("")}
			slotProps={{
				textField: {
					sx: {
						"& label.Mui-focused": {
							color: "rgb(14 116 144)",
						},
						"& .MuiInput-underline:after": {
							borderBottomColor: "rgb(14 116 144)",
						},
						"& .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
							borderBottomColor: "rgb(8 51 68)",
						},
					},
					variant: "standard",
					size: "small",
					error: Boolean(meta.touched && meta.error),
					helperText: meta.touched && meta.error ? meta.error : "",
					onFocus: () => setError(""),
				},
			}}
			className="transition-colors grow"
		/>
	);
};
