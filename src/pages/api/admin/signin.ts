// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Admin } from '../../../lib/db';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import connectToDB from '@/lib/dbConnect';

connectToDB();

type Data = {
    message?: string;
}
const SECRET = process.env.SECRET;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { username, password } = req.headers;
    console.log("username =", username)
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
        res.status(403).json({ message: 'Invalid username or password' });
    } else {

        const token = sign(
            { username, role: 'admin' },
            SECRET,
            {
                expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 // 30 days

            }
        );

        const serialised = serialize("courseraJWT", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });

        res.setHeader("Set-Cookie", serialised);

        res.json({ message: 'Logged in successfully' });
    }

}
