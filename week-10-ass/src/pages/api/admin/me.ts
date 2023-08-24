import type { NextApiRequest, NextApiResponse } from 'next'
import { AdminModel } from '@/db/index'
import { connectDB } from '@/db/connect'
import { validateToken } from '@/auth/session'


type MeResponse = MeSuccessResponse | MeFailureResponse

type MeFailureResponse = {
    error_message: string
}

type MeSuccessResponse = {
    username: string
}

type MeRequest = {
    user: string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MeResponse>
) {
    await connectDB();
    const request: MeRequest = req.body;
    const userValue = validateToken(req.headers.cookie);
    if (!userValue) {
        return res.status(401).json({ error_message: "Auth token is incorrect" })
    }
    const admin = await AdminModel.findOne({ username: userValue?.username });
    console.log(admin);
    if (!admin) {
        res.status(403).json({ error_message: "Admin doesnt exist" })
        return
    }
    res.json({
        username: admin.username
    })
}
