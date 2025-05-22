import { Response } from "express";
import { CustomRequest } from "../interface/auth";
import ResponseUtil from "../utils/response/response_utils";
import { createActivitySchema, updateActivitySchema } from "../validator/user_validator";
import ActivityModel from "../models/activity";
import { STATUS_CODES } from "../constants/status_condes";
import { ACTIVITY_CONSTANTS } from "../constants/auth_constants";

export const createActivity = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const validatedData = createActivitySchema.parse(req.body);

        const activity = await ActivityModel.create({
            userId,
            ...validatedData
        });

        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            activity,
            ACTIVITY_CONSTANTS.CREATED
        );
    } catch (e) {
        ResponseUtil.handleError(res, e);
    }
};

export const getActivities = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { status, category } = req.query;

        const filter: any = { userId, isDeleted: false };

        if (status) filter.status = status;
        if (category) filter.category = category;

        const activities = await ActivityModel.find(filter).sort({ dueDate: 1 });

        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            activities,
            ACTIVITY_CONSTANTS.FETCHED
        );
    } catch (e) {
        ResponseUtil.handleError(res, e);
    }
};


export const getActivityById = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const activity = await ActivityModel.findOne({
            _id: id,
            userId,
            isDeleted: false
        });

        if (!activity) {
            return ResponseUtil.errorResponse(
                res,
                STATUS_CODES.NOT_FOUND,
                ACTIVITY_CONSTANTS.NOT_FOUND
            );
        }

        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            activity,
            ACTIVITY_CONSTANTS.FETCHED
        );
    } catch (e) {
        ResponseUtil.handleError(res, e);
    }
};


export const updateActivity = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const validatedData = updateActivitySchema.parse(req.body);

        const activity = await ActivityModel.findOneAndUpdate(
            {
                _id: id,
                userId,
                isDeleted: false
            },
            validatedData,
            { new: true }
        );

        if (!activity) {
            return ResponseUtil.errorResponse(
                res,
                STATUS_CODES.NOT_FOUND,
                ACTIVITY_CONSTANTS.NOT_FOUND
            );
        }

        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            activity,
            ACTIVITY_CONSTANTS.UPDATED
        );
    } catch (e) {
        ResponseUtil.handleError(res, e);
    }
};


export const deleteActivity = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const activity = await ActivityModel.findOneAndUpdate(
            {
                _id: id,
                userId,
                isDeleted: false
            },
            { isDeleted: true },
            { new: true }
        );

        if (!activity) {
            return ResponseUtil.errorResponse(
                res,
                STATUS_CODES.NOT_FOUND,
                ACTIVITY_CONSTANTS.NOT_FOUND
            );
        }

        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            {},
            ACTIVITY_CONSTANTS.DELETED
        );
    } catch (e) {
        ResponseUtil.handleError(res, e);
    }
};

export const getActivitiesByStatus = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { status } = req.params;

        const activities = await ActivityModel.find({
            userId,
            status,
            isDeleted: false
        }).sort({ dueDate: 1 });

        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            activities,
            ACTIVITY_CONSTANTS.FETCHED
        );
    } catch (e) {
        ResponseUtil.handleError(res, e);
    }
};


export const getActivitiesByCategory = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { category } = req.params;

        const activities = await ActivityModel.find({
            userId,
            category,
            isDeleted: false
        }).sort({ dueDate: 1 });

        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            activities,
            ACTIVITY_CONSTANTS.FETCHED
        );
    } catch (e) {
        ResponseUtil.handleError(res, e);
    }
};

/**
 * Get upcoming activities (due in the next 7 days)
 */
export const getUpcomingActivities = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const activities = await ActivityModel.find({
            userId,
            dueDate: {
                $gte: today,
                $lte: nextWeek
            },
            isDeleted: false
        }).sort({ dueDate: 1 });

        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            activities,
            ACTIVITY_CONSTANTS.FETCHED
        );
    } catch (e) {
        ResponseUtil.handleError(res, e);
    }
};