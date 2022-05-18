import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function verifyAuthToken(req: Request, res: Response, next: NextFunction) {
    try{
        const authorizationHeader = req.headers.authorization;
        if(authorizationHeader) {
            const token = authorizationHeader.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_SECRET!)
            next()
        } else {
            res.status(401).json("Missing Authorization")
        }
    } catch (e) {
        res.status(401).json("Unauthorized "+e);
    }
}