import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import AuthConfig from "../config/auth";
import { CustomRequest, jwtPayload } from "../interface/auth";


export const checkAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers["authorization"];
    if(!tokenHeader){
        return res.status(401).json({
            message: "Unauthorized Request"
        })
    }

    const token = tokenHeader && tokenHeader.split(" ")[1];

    jwt.verify(String(token), String(AuthConfig.JWT_SECRET), (err, decoded)=>{
        if (err){
            console.log( AuthConfig.JWT_SECRET, err);
            return res.status(401).json({message:"Invalid Token"})
        }
        const decodedPayload = decoded as jwtPayload ;
        req.userId = decodedPayload.id;
        req.email = decodedPayload.email;
        req.role = decodedPayload.role;
        next();
    });

}
