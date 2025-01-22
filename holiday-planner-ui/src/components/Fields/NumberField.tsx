import { TextField } from "./TextField";

interface NumberFieldProps {
	name: string;
	label: string;
}

export const NumberField = ({ name, label }: NumberFieldProps) => {
	return (
		<div className="w-24">
			<TextField
				type="number"
				name={name}
				label={label}
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
