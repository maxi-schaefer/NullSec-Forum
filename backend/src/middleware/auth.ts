import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET!;
if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as { sub: string; };
        const user = await UserModel.findById(payload.sub);

        if(!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = {
            _id: user._id.toString()
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export function authorize(...roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserModel.findById(req.user?._id);
        if(!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    }
}