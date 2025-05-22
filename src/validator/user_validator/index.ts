import mongoose from "mongoose";
import { z } from "zod";

export const createActivitySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
    dueDate: z.coerce.date().optional(),
});

// Schema for updating an activity
export const updateActivitySchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    category: z.string().min(1, "Category is required").optional(),
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
    dueDate: z.coerce.date().optional(),
});