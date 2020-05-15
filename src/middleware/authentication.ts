import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export class Authentication {
    public auth(req: Request, res: Response, next: NextFunction) {
        const token = req.header("token");
        if (!token) return res.status(401).json({ message: "Auth Error" });

        try {
            const decoded = jwt.verify(token, "randomString");
            // req.user = decoded.user;
            return next();
        } catch (e) {
            console.error(e);
            return res.status(500).send({ message: "Invalid Token" });
        }
    }
}
