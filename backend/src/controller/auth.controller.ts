import { Request, Response } from "express";
import { getSelf, login, register } from "../services/auth.service";
import { signToken } from "../utils/jwt";

export async function registerHandler(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await register(username, password);

        const token = signToken({ sub: user._id.toString() });

        return res.status(201).json({ token, user });
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export async function loginHandler(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await login(username, password);

        const token = signToken({ sub: user._id.toString() });

        return res.json({ token, user });
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export async function meHandler(req: Request, res: Response) {
    try {
        const user = await getSelf(req.user?._id as string);
        return res.json({ user });
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}