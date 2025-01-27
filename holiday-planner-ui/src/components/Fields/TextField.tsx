import { TextField as MUITextField } from "@mui/material";
import { useField } from "formik";

interface TextFieldProps {
	name: string;
	label: string;
	fullWidth?: boolean;
	className?: string;
	suffix?: string;
	maxLength?: number;
	[key: string]: any;
}

export const TextField = ({
	name,
	label,
	fullWidth,
	className,
	suffix,
	maxLength,
	...props
}: TextFieldProps) => {
	const [field, meta, helpers] = useField(name);
	const { setValue, setError } = helpers;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (props.type === "number") {
			if (
				event.key === "-" ||
				event.key === "e" ||
				event.key === "." ||
				event.key === "+"
			) {
				event.preventDefault();
			}
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (props.type === "number") {
			if (Number(event.target.value) <= 0) {
				setValue('0');
			} else if (Number(event.target.value) > 59) {
				setValue(59);
			} else {
				setValue(Number(event.target.value));
			}
		} else {
			setValue(event.target.value)
		}
	};

	return (
		<div className={`${className ? " " + className : ""}`}>
			<MUITextField
				{...props}
				label={label}
				value={field.value || ""}
				error={Boolean(meta.touched && meta.error)}
				helperText={meta.touched && meta.error ? meta.error : ""}
				onFocus={() => setError("")}
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				onBlur={field.onBlur}
				sx={{
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
				}}
				variant="standard"
				autoComplete="off"
				size="small"
				fullWidth
				slotProps={{
					htmlInput: {
						maxLength: maxLength,
					},
				}}
			/>
		</div>
	);
};
