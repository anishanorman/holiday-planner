import {
	InputAdornment,
	inputBaseClasses,
	TextField as MUITextField,
} from "@mui/material";
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
	const [field, , helpers] = useField(name);
	const { setValue } = helpers;

	return (
		<div className={`${className ? " " + className : ""}`}>
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
					input: {
						endAdornment: (
							<InputAdornment
								position="end"
								sx={{
									opacity: 0,
									pointerEvents: "none",
									[`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
										opacity: 1,
									},
								}}
							>
								{suffix}
							</InputAdornment>
						),
					},
					htmlInput: {
						maxLength: maxLength,
					},
				}}
			/>
		</div>
	);
};
