import { Response } from "express";
import { ZodError } from "zod";

class ResponseUtil {
    static successResponse(res: Response, statusCode: number, data = {}, message: string = ""
    ) {
        res.status(statusCode).json({
            status: statusCode,
            data,
            success: true,
            message
        })
    }


    static errorResponse(res: Response, statusCode: number, message: string, error?: any
    ) {
        res.status(statusCode).json({
            status: statusCode,
            success: false,
            message,
            error
        })
    }


    static handleError(res: Response, error: any) {
        if (error instanceof ZodError) {
            const errorMessage: any = error.errors.map((e) => ({
                field: e.path.join("."),
                message: e.message
            }));
            return ResponseUtil.errorResponse(res, 400, errorMessage)
        } else {
            return ResponseUtil.errorResponse(res,
                500,
                error.message || "Internal server error",
                error)

        }
    }
}


export default ResponseUtil;