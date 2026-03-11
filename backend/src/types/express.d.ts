import { Types } from 'mongoose';

export interface AuthUser {
    _id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser
        }
    }
}