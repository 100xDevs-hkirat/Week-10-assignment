import { NextApiRequest, NextApiResponse } from "next";
import adminAuth from "../adminAuth";
import { Course, dbConnect } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    if (req.method == 'GET') {
        try {
            await adminAuth(req, res, async () => {
                const courseId = req.query.courseId;
                const course = await Course.findById(courseId);
                return res.json({ course });
            })
        } catch (error) {
            return res.status(500).json({ message: 'Server Error', error });
        }
    }
    if (req.method == 'PUT') {
        try {
            await adminAuth(req, res, async () => {
                const course = await Course.findByIdAndUpdate(req.query.courseId, req.body, { new: true });
                if (course) {
                    res.json({ message: 'Course updated successfully' });
                } else {
                    res.status(404).json({ message: 'Course not found' });
                }
            })
        } catch (error) {
            return res.status(500).json({ message: 'Server Error', error });
        }
    }

}