import { Admin, dbConnect } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import adminAuth from "./adminAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    try {
        await adminAuth(req, res, async () => {
            const admin = await Admin.findOne({ username: req.headers.user });
            if (!admin) {
                return res.status(403).json({ msg: "Admin doesnt exist", isAuth: false })
                return
            }
            res.json({
                username: admin.username,
                isAuth: true
            })
        })
    } catch (error) {
        return res.status(500).json({ error: 'Server Error', isAuth: false });
    }
}