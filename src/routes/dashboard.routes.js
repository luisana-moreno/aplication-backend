import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controllers.js";

const router = Router();

router.get("/", getDashboard);

export default router;