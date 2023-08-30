import type { NextApiRequest, NextApiResponse } from 'next'
import {Course} from '../../../../lib/db';
import connectToDB from '@/lib/dbConnect'; 
connectToDB();
type Course = {
  title:string;
  description:string;
  image:string;
  price:number
}
type Data = {
    message?: string;
    course?: Course;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {courseId} = req.query;
    const course = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully',course });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
}