import { DateTimePicker } from "@mui/x-date-pickers";
import { useField } from "formik";

interface DateTimeFieldProps {
	name: string;
	label: string;
	className?: string;
	[key: string]: any;
}

export const DateTimeField = ({
	name,
	label,
	className,
	...props
}: DateTimeFieldProps) => {
	const [field, meta, helpers] = useField(name);
	const { setValue, setError } = helpers;

	return (
		<div className={`w-52${className ? " " + className : ""}`}>
			<DateTimePicker
				{...props}
				label={label}
				value={field.value || null}
				onChange={(value) => {
					setValue(value);
				}}
				onClose={() => setError("")}
				slotProps={{
					field: {
						clearable: true
					},
					textField: {
						sx: {
							"& label.Mui-focused": {
								color: "rgb(14 116 144)",
							},
							"& .MuiInput-underline:after": {
								borderBottomColor: "rgb(14 116 144)",
							},
							"& .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
								{
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
			/>
		</div>
	);
};
