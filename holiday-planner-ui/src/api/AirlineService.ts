export const searchAirlines = async (query: string) => {
    const response = await fetch(
        `http://localhost:5000/api/airlines/search?query=${query}`
    );
    if (!response.ok) {
        throw new Error("An error occurred while fetching airlines");
    }
    return await response.json() || [];
}