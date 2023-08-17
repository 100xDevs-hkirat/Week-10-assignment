import { NextApiRequest, NextApiResponse } from "next";
import adminAuth from "./adminAuth";
import { Course, dbConnect } from "@/lib/db";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if(req.method != 'GET') {
        return res.status(400).json({ message: 'Its a Get request' });
    }
    try {
        await dbConnect();
        await adminAuth(req, res, async () => {
            const courses = await Course.find({});
            return res.json({ courses });
        })
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error });
    }
}