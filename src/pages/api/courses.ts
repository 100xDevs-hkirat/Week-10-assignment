import mongoose from "mongoose";
import {Admin} from '@/utils/model'
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/utils/db';
import {Course} from '@/utils/model'
import type {NextApiRequest,NextApiResponse} from 'next';
import authenticateJwt from '@/middlewares/auth';


const SECRET:any=process.env.SECRET;

connectToDatabase();

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    authenticateJwt(req,res);
    if(req.method==="POST"){
            const course = new Course(req.body);
            await course.save();
            res.json({ message: 'Course created successfully', courseId: course._id });
         
    }else{
        const courses = await Course.find();
        console.log(courses);
        res.json({ courses:courses });
    }

};
