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
    const { username, password } = req.body;

    const callback = (admin: any) => {
        if (admin) {
            res.status(403).json({ message: 'Admin already exists' });
        } else {
            const obj = { username: username, password: password };
            const newAdmin = new Admin(obj);
            newAdmin.save();

            const token = sign(
                { username, role: 'admin' },
                SECRET,
                {
                    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 // 30 days

                });

            const serialised = serialize("courseraJWT", token, {
                httpOnly: true,

                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });

            res.setHeader("Set-Cookie", serialised);
            res.json({ message: 'Admin created successfully' });
        }
    };

    await Admin.findOne({ username }).then(callback);
}
