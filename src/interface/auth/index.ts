import { Request } from "express";

export interface CustomRequest extends Request {
    userId?: string,
    email?: string,
    role?: string,
}


export interface jwtPayload {
    id: string;
    email: string;
    role: string;
}