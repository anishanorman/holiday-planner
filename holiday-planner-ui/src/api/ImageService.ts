export const getImages = async (query: string) => {
    const response = await fetch(
        `http://localhost:5000/api/pexels/search?query=${query}`
    );
    if (!response.ok) {
        throw new Error("An error occurred while fetching images");
    }
    return await response.json();
}