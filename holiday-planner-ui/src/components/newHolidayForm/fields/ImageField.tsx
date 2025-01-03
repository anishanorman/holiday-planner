import { useState } from "react";
import { NewHolidayFormValues } from "../NewHolidayForm";
import { ImageSelection } from "./ImageSelection";
import { TextField } from "./TextField";

interface ImageFieldProps {
	name: string;
	values: NewHolidayFormValues;
	setFieldValue: (name: string, value: NewHolidayFormValues) => void;
}

export const ImageField = ({
	name,
	values,
	setFieldValue,
	...props
}: ImageFieldProps) => {
	const [query, setQuery] = useState("holiday");
	const [queryError, setQueryError] = useState(false);

	console.log(queryError)

	return (
		<div className="flex flex-col gap-6 border-b w-full" {...props}>
			<div className="flex gap-10">
				<TextField
					name="imageQuery"
					label="Search for images"
					onKeyDown={(event: React.KeyboardEvent) => {
						if (event.key === "Enter") {
							event.preventDefault();
							values.imageQuery
								? setQuery(values.imageQuery)
								: setQueryError(true);
						}
					}}
					onFocus={() => setQueryError(false)}
					error={queryError}
					helperText={queryError && "Search query cannot be empty"}
				/>
				<button
					type="button"
					onClick={() =>
						values.imageQuery
							? setQuery(values.imageQuery)
							: setQueryError(true)
					}
					className="bg-cyan-600 text-white px-3 py-1 rounded-full hover:bg-cyan-700 h-fit self-center"
				>
					Search
				</button>
			</div>
			<div className="flex flex-wrap gap-4 items-center justify-center max-w-[612px]">
				<ImageSelection
					query={query}
					setFieldValue={setFieldValue}
					selectedImage={values.selectedImage}
				/>
			</div>
			<a
				href="https://www.pexels.com"
				className="flex items-center justify-end gap-2 text-sm opacity-80 mb-4"
				target="_blank"
			>
				<p>Photos provided by</p>
				<img
					src="https://images.pexels.com/lib/api/pexels.png"
					className="h-6"
				/>
			</a>
		</div>
	);
};
