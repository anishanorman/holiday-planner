import { Alert, Checkbox } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "../../api/ImageService";
import { Image } from "../../utils/types";
import { Spinner } from "../Spinner";

interface ImageSelectionProps {
	query: string;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	selectedImage: Image;
}

export const ImageSelection = ({
	query,
	setFieldValue,
	selectedImage,
}: ImageSelectionProps) => {
	const { isLoading, data, error } = useQuery({
		queryKey: ["images", query],
		queryFn: () => getImages(query),
		enabled: !!query,
	});

	if (isLoading) {
		return <Spinner className="my-24" />;
	}

	if (error) {
		return (
			<Alert severity="error" className="my-6">
				Sorry, something went wrong. Please try again later.
			</Alert>
		);
	}

	if (data && data.length === 0) {
		return (
			<Alert severity="info" className="my-6">
				No images found. Please try another search query.
			</Alert>
		);
	}

	return (
		<>
			{data.map((image: Image) => (
				<div
					key={image.src}
					className="box-border relative hover:scale-[103%] cursor-pointer transition-transform"
				>
					<img
						className={`w-48 ${
							selectedImage.src === image.src && "outline outline-cyan-600"
						}`}
						src={image.src}
						alt={image.alt}
						onClick={() => setFieldValue("selectedImage", image)}
						draggable="false"
					/>
					{selectedImage.src === image.src && (
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
		</>
	);
};
