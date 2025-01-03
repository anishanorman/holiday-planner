import { Checkbox } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Image } from "../../../utils/types";
import { Spinner } from "../../Spinner";
import { TextField } from "./TextField";
import { getImages } from "../../../api/ImageService";

export const ImageField = ({
	name,
	values,
	setFieldValue,
	...props
}: {
	name: string;
	values: any;
	setFieldValue: (name: string, value: any) => void;
	[key: string]: any;
}) => {
	const [query, setQuery] = useState("holiday");

	const { data, isLoading, error } = useQuery({
		queryKey: ["images", query],
		queryFn: () => getImages(query),
		enabled: !!query,
	});

	return (
		<div className="flex flex-col gap-6 border-b w-full" {...props}>
			<div className="flex gap-10">
				<TextField
					name="imageQuery"
					label="Search for images"
					onKeyDown={(event: React.KeyboardEvent) => {
						if (event.key === "Enter") {
							event.preventDefault();
							setQuery(values.imageQuery);}
					}}
				/>
				<button
					type="button"
					onClick={() => setQuery(values.imageQuery)}
					className="bg-cyan-600 text-white px-3 py-1 rounded-full hover:bg-cyan-700 h-fit self-center"
				>
					Search
				</button>
			</div>
			<div className="flex flex-wrap gap-4 items-center justify-center max-w-[612px]">
				{isLoading && <Spinner className="my-24" />}
				{error && <p>{error.message}</p>}
				{!isLoading && data === undefined && <p>No images found.</p>}
				{data &&
					data.map((image: Image) => (
						<div
							key={image.src}
							className="box-border relative hover:scale-[103%] cursor-pointer transition-transform"
						>
							<img
								className={`w-48 ${
									values.selectedImage.src === image.src &&
									"outline outline-cyan-600"
								}`}
								src={image.src}
								alt={image.alt}
								onClick={() => setFieldValue("selectedImage", image)}
								draggable="false"
							/>
							{values.selectedImage.src === image.src && (
								<div className="box-content absolute top-0 right-0 flex items-center justify-center w-4 h-4 m-2 bg-white rounded-md border-2 border-cyan-700/80">
									<Checkbox
										disableRipple
										checked
										name="selectedImage"
										sx={{
											color: "rgb(8 145 178)",
											"&.Mui-checked": {
												color: "rgb(8 145 178)",
											},
										}}
									/>
								</div>
							)}
						</div>
					))}
			</div>
			<a
				href="https://www.pexels.com"
				className="flex items-center justify-end gap-2 text-sm opacity-80 mb-4"
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
