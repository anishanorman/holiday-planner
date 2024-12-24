import cors from "cors";
import express from "express";
import holidaysRouter from "./routes/holidays";

const app = express();
const PORT = 5000;

app.use(cors());

app.use("/api/holidays", holidaysRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
