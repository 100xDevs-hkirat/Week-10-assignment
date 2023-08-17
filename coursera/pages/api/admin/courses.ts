import { NextApiRequest, NextApiResponse } from "next";
import adminAuth from "./adminAuth";
import { Course, dbConnect } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    if (req.method == 'GET') {
        try {
            await adminAuth(req, res, async () => {
                const courses = await Course.find({});
                return res.json({ courses });
            })
        } catch (error) {
            return res.status(500).json({ message: 'Server Error', error });
        }

    } if (req.method == 'POST') {
        try {
            await adminAuth(req, res, async () => {
                const course = new Course(req.body);
                await course.save();
                res.json({ message: 'Course created successfully', courseId: course.id });
            })

        } catch (error) {
            return res.status(500).json({ message: 'Server Error', error });
        }
    }
}