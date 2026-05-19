import express from "express";
import { getAnalytics, getDues } from "../controllers/analytics.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getAnalytics);
router.get("/dues", isAuthenticated, getDues);

export default router;
