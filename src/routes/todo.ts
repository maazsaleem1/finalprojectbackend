import express from "express";

import { checkAuth } from "../midlleware/check_auth";
import { createActivity, deleteActivity, getActivities, getActivitiesByCategory, getActivitiesByStatus, getActivityById, getUpcomingActivities, updateActivity } from "../controller/todo";

const router = express.Router();

router.post("/", checkAuth, createActivity);
router.get("/", checkAuth, getActivities);
router.get("/:id", checkAuth, getActivityById);
router.put("/:id", checkAuth, updateActivity);
router.delete("/:id", checkAuth, deleteActivity);
router.get("/status/:status", checkAuth, getActivitiesByStatus);
router.get("/category/:category", checkAuth, getActivitiesByCategory);
router.get("/upcoming", checkAuth, getUpcomingActivities);

export default router;