// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken';
import {Admin} from '../../../lib/db';

const SECRET = process.env.SECRET || "";
interface JwtPayload {
    username?: string;
  }

type Data = {
    msg?: string,
    username?: JwtPayload | string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { cookies } = req;
    const token = cookies.courseraJWT;
    let user;

    if (!token) {
        return res.status(403).json({ msg: "cookie token not found" });
    } else {
        user = verify(token, SECRET) as JwtPayload;

        const admin = await Admin.findOne({ username: user.username });
        if (!admin) {
            res.status(403).json({msg: "Admin doesn't exist"})
            return
        }
        res.json({
            username: admin.username
        })
    }
}
