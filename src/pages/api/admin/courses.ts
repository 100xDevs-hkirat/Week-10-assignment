import {Course} from '../../../lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '@/lib/dbConnect'; 

connectToDB();

type Data = {
    message?: string;
    courseId?: number;
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>){
        if(req.method === 'GET') {
            const courses = await Course.find({});
            res.json({ courses });
        }else{
            const course = new Course(req.body);
            await course.save();
            res.json({ message: 'Course created successfully', courseId: course.id });
        }
}