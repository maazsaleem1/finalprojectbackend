import { Request, Response, NextFunction } from "express";

import AuthConfig from "../config/auth";

export const checkBearer = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const bearerToken = AuthConfig.BEARER_TOKEN
    const tokenHeader = req.headers["auth-token"] as String | undefined

    if (tokenHeader === bearerToken) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized Request" })
    }
}