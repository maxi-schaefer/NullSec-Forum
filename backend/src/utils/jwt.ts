import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: { sub: string }) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}