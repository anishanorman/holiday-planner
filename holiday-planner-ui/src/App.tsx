import { useEffect, useState } from "react";

function App() {
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		const fetchMessage = async () => {
			try {
				const response = await fetch("http://localhost:5000", {
					method: "GET",
				});
				const data = await response.text();
				setMessage(data);
			} catch (error) {
				console.error("Error fetching message:", error);
				setMessage("Error fetching data");
			}
		};

		fetchMessage();
	}, []);

	return (
		<>
			<h1>Holiday Planner</h1>
			<p>{message || "Loading..."}</p>
		</>
	);
}

export default App;
