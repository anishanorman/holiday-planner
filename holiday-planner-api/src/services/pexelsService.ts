import { createClient, ErrorResponse, PhotosWithTotalResults } from "pexels";

const client = createClient(process.env.PEXELS_API_KEY || "");

const isErrorResponse = (
	response: PhotosWithTotalResults | ErrorResponse
): response is ErrorResponse => {
	return "error" in response;
};

export const searchPhotos = async (query: string) => {
	try {
		const response = await client.photos.search({
			query,
			orientation: "landscape",
			per_page: 6,
		});

		if (isErrorResponse(response)) {
			console.error(`Pexels API Error: ${response.error}`);
			return null;
		}

		const result = response.photos.map((photo) => ({
			photographer: photo.photographer,
			photographerUrl: photo.photographer_url,
			src: photo.src.medium,
			alt: photo.alt,
		}));

		return result;
	} catch (error) {
		console.error(`Unexpected error: ${error}`);
		throw new Error("Failed to fetch photos from Pexels API");
	}
};
