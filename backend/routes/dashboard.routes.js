import express from "express";
import {
  getDashboardSummary,
  getPendingBreakdown,
} from "../controllers/dashboard.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/summary", isAuthenticated, getDashboardSummary);
router.get("/pending-breakdown", isAuthenticated, getPendingBreakdown);

export default router;
