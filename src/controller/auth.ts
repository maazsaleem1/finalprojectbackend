import { Request, Response } from "express";
import UserModel from "../models/user";
import AuthConfig from "../config/auth";
import { CustomRequest } from "../interface/auth";
import { hash, compareSync } from "bcrypt";
import ResponseUtil from "../utils/response/response_utils";
import { generateToken } from "../utils/token";

import {
    signupSchema,
    loginSchema,
    createProfileSchema,
} from "../validator/auth_validator";
import { AUTH_CONSTANTS } from "../constants/auth_constants";
import { STATUS_CODES } from "../constants/status_condes";
import helper from "../helper";

export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password, fullName } = await signupSchema.parseAsync(req.body);
        const userExist = await UserModel.findOne({
            email: email,
        });

        if (userExist) {
            return ResponseUtil.errorResponse(
                res,
                STATUS_CODES.BAD_REQUEST,
                AUTH_CONSTANTS.USER_ALREADY_EXISTS
            )
        }
        const hashPassword = await hash(password, String(AuthConfig.SALT))
        const user = await UserModel.create({
            email: email,
            password: hashPassword,
            fullName : fullName
        });
        
        const token = generateToken({
            email: email,
            id: String(user._id),
            role: 'user'
        });
        return ResponseUtil.successResponse(res, STATUS_CODES.SUCCESS, { user, token }, AUTH_CONSTANTS.INCOMPLETE_PROFILE
);

    } catch (e: any) {
        ResponseUtil.handleError(res, e)
    }
}


export const login = async (req: Request, res: Response) => {
    try {


        const { email, password } = loginSchema.parse(req.body)

        const user = await UserModel.findOne({ email });

        if (!user) {
            return ResponseUtil.errorResponse(
                res,
                STATUS_CODES.BAD_REQUEST,
                AUTH_CONSTANTS.USER_NOT_FOUND
            )
        }

        const hashPass = compareSync(password, String(user.password))

        if (!hashPass) {
            return ResponseUtil.errorResponse(
                res, STATUS_CODES.BAD_REQUEST,
                AUTH_CONSTANTS.PASSWORD_MISMATCH
            )
        }

        const token = generateToken({
            email: email,
            id: String(user._id),
            role: 'user'
        });

        return ResponseUtil.successResponse(res,
            STATUS_CODES.SUCCESS,
            { user, token },
            AUTH_CONSTANTS.LOGGED_IN
        )


    }
    catch (e) {
        ResponseUtil.handleError(res, e);
    }
}

export const createProfile = async (req: CustomRequest, res: Response) => {

    try {
        const userId = req.userId;
        const { ...rest } = createProfileSchema.parse(req.body);


        const user = await UserModel.findByIdAndUpdate(
            userId,
            {
                ...rest
            },
            {
                new: true,
            }
        );

        const token = generateToken({
            email: req?.email as string,
            id: userId as string,
            role: req?.role as string
        });
        
        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            { user, token },
            AUTH_CONSTANTS.LOGGED_IN
        );
    }
    catch (e) {
        ResponseUtil.handleError(res, e);
    }
}

export const getProfile = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;

        const user = await UserModel
            .findById(userId)
            .select("-password -createdAt -updatedAt");
        if (!user) {
            return ResponseUtil.errorResponse(
                res,
                STATUS_CODES.NOT_FOUND,
                AUTH_CONSTANTS.USER_NOT_FOUND
            )
        }
        return ResponseUtil.successResponse(
            res,
            STATUS_CODES.SUCCESS,
            user,
            AUTH_CONSTANTS.DATA_FETCHED
        );
    } catch (e) {
        ResponseUtil.handleError(res, e);
    }
}