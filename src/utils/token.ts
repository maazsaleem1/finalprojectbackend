import jwt from "jsonwebtoken";

import AuthConfig from "../config/auth";

import { jwtPayload } from "../interface/auth";


export const generateToken = (payload: jwtPayload) => {
    const token = jwt.sign(payload, AuthConfig.JWT_SECRET as string, {
        expiresIn: AuthConfig.EXPIRES_IN,
    });
    return token;
}



