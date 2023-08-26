// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { validateToken } from '@/auth/session';
import { Course, CourseModel } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next'

interface CoursesResponse {
    courses : Course[]
}

interface AuthError{
    message : string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CoursesResponse | AuthError>
) {
    const cookieHeader = req.headers.cookie;
    const admin = validateToken(cookieHeader);
    if (!admin) return res.status(401).json({message : "please login"});
    const courses : Course[] = await CourseModel.find({});
    res.json({ courses });
}
