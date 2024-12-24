import { Router } from "express";
import { mockHolidaysData } from "./mockHolidaysData";

const router = Router();

router.get("/", (_, res) => {
    res.send(mockHolidaysData);
})

export default router;
