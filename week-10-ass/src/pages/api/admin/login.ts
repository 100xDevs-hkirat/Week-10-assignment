import type { NextApiRequest, NextApiResponse } from 'next'
import { AdminModel } from '@/db/index';
import { connectDB } from '@/db/connect';
// interface LoginRequest {
//     username : string
//     password : string
// }

interface LoginResponse {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LoginResponse>
) {
    await connectDB();
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password)
        return res.status(401).json({ message: 'username and password required' });
    const admin = await AdminModel.findOne({ username, password });
    if (admin) {
        res.json({ message: 'Logged in successfully' });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }

}