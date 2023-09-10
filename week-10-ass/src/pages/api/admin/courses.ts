// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { validateToken } from '@/auth/session';
import { Course, CourseModel } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next'

interface CoursesListResponse {
    courses: Course[]
}

interface CourseAddResponse{
    message : string,
    courseId : string
}

interface AuthError {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CoursesListResponse | CourseAddResponse | AuthError>
) {
    if (req.method === 'GET') {
        const cookieHeader = req.headers.cookie;
        const admin = validateToken(cookieHeader);
        if (!admin) return res.status(401).json({ message: "please login" });
        const courses: Course[] = await CourseModel.find({});
        res.json({ courses });
    }
    else if (req.method === 'POST') {
        const course = new CourseModel(req.body);
        await course.save();
        res.json({ message: 'Course created successfully', courseId: course.id });
    }
    else {
        res.status(405);
    }
}
