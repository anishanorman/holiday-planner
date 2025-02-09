import cors from "cors";
import express from "express";
import accommodationsRouter from "./routes/accommodations";
import airlinesRouter from "./routes/airlines";
import flightsRouter from "./routes/flights";
import holidaysRouter from "./routes/holidays";
import pexelsRouter from "./routes/pexels";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/holidays", holidaysRouter);
app.use("/api/pexels", pexelsRouter);
app.use("/api/airlines", airlinesRouter);
app.use("/api/flights", flightsRouter);
app.use("/api/accommodations", accommodationsRouter);

export { app };
