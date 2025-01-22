export const searchAirlines = async (query: string) => {
    console.log("query: ", query)
    const response = await fetch(
        `http://localhost:5000/api/airlines/search?query=${query}`
    );
    if (!response.ok) {
        throw new Error("An error occurred while fetching airlines");
    }
    console.log(await response.json())
    return await response.json() || [];
}