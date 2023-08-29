import mongoose from "mongoose";
import {Admin} from '@/utils/model'
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/utils/db';
import {Course} from '@/utils/model'
import type {NextApiRequest,NextApiResponse} from 'next';
import authenticateJwt from '@/middlewares/auth';
import { courseState } from "@/store/atoms/course";


const SECRET:any=process.env.SECRET;

connectToDatabase();

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    authenticateJwt(req,res);
    if(req.method==="PUT"){
        const course = await Course.findByIdAndUpdate(req.query.courseid, req.body, { new: true });
        if (course) {
        return res.json({ message: 'Course updated successfully' });
        } else {
        return res.status(404).json({ message: 'Course not found' });
        }
    }else{
        const courseId = req.query.courseid;
        const course = await Course.findById(courseId);
        res.json({ course:course });
    }

};
