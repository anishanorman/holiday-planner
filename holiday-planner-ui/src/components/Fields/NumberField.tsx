import { useField } from "formik";
import { TextField } from "./TextField";

interface NumberFieldProps {
	name: string;
	label: string;
}

export const NumberField = ({ name, label }: NumberFieldProps) => {

		const [, meta, helpers] = useField(name);

		const { setError } = helpers;

	return (
		<div className="w-24">
			<TextField
				type="number"
				name={name}
				label={label}
				error={Boolean(meta.touched && meta.error)}
				helperText={meta.touched && meta.error ? meta.error : ""}
				onFocus={() => setError("")}
				slotProps={{
					htmlInput: {
						step: 1,
					},
				}}
				onWheel={(event: React.WheelEvent<HTMLInputElement>) => {
					(event.target as HTMLInputElement).blur();
				}}
			/>
		</div>
	);
};
